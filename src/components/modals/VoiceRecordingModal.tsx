import type { RootState } from "@/src/state/store";
import { useAppSelector } from "@/src/state/useStoreHooks";
import { ThemeTokens, getThemeTokens } from "@/src/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Import voice recognition for mobile
let Voice: any = null;
if (Platform.OS !== "web") {
  try {
    Voice = require("@react-native-community/voice").default;
  } catch (error) {
    console.log("Voice recognition not available:", error);
  }
}

interface VoiceRecordingModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSendRecording: (audioText: string) => void;
}

export default function VoiceRecordingModal({
  isVisible,
  onClose,
  onSendRecording,
}: VoiceRecordingModalProps) {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const themeColors = getThemeTokens(theme);
  const styles = createStyles(themeColors);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const mediaRecorderRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const webChunksRef = useRef<Blob[]>([]);
  const [fileToUpload, setFileToUpload] = useState<any | null>(null);

  // Generate waveform data during recording
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setWaveformData((prev) => {
          const newData = [...prev];
          if (newData.length > 30) {
            newData.shift(); // Remove oldest bar
          }
          // Add new random height (20-100% of max height)
          newData.push(Math.random() * 0.8 + 0.2);
          return newData;
        });

        setRecordingTime((prev) => prev + 0.1);
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isPaused]);

  // Reset state when modal opens
  useEffect(() => {
    if (isVisible) {
      setIsRecording(false);
      setIsPaused(false);
      setWaveformData([]);
      setRecordingTime(0);
      setHasRecording(false);
    }
  }, [isVisible]);

  const startNativeRecording = async () => {
    try {
      if (!permissionResponse || permissionResponse.status !== "granted") {
        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      const result = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(result.recording);
    } catch (e) {
      console.log("Failed to start native recording", e);
    }
  };

  const startWebRecording = async () => {
    console.log("startWebRecording");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      webChunksRef.current = [];
      mediaRecorder.ondataavailable = (evt: BlobEvent) => {
        if (evt.data && evt.data.size > 0) webChunksRef.current.push(evt.data);
      };
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(100);
    } catch (e) {
      console.log("Failed to start web recording", e);
    }
  };

  const handleStartRecording = async () => {
    if (!isRecording) {
      setIsRecording(true);
      setIsPaused(false);
      setWaveformData([]);
      setRecordingTime(0);
      if (Platform.OS === "web") {
        await startWebRecording();
      } else {
        await startNativeRecording();
      }
    } else {
      // Pause/Resume recording
      try {
        if (Platform.OS === "web") {
          const mr: any = mediaRecorderRef.current;
          if (!mr) return;
          if (!isPaused) {
            mr.pause?.();
          } else {
            mr.resume?.();
          }
        } else {
          if (recording) {
            if (!isPaused) {
              // @ts-ignore - pauseAsync may not exist on some SDKs
              await (recording as any).pauseAsync?.();
            } else {
              // @ts-ignore - resume/start may differ by SDK
              if ((recording as any).startAsync) await (recording as any).startAsync();
              else if ((recording as any).resumeAsync) await (recording as any).resumeAsync();
            }
          }
        }
        setIsPaused(!isPaused);
      } catch (e) {
        console.log("Pause/Resume failed", e);
      }
    }
  };

  const handleStopRecording = async () => {
    try {
      if (Platform.OS === "web") {
        const mr: any = mediaRecorderRef.current;
        if (mr && mr.state !== "inactive") {
          await new Promise<void>((resolve) => {
            mr.onstop = () => resolve();
            mr.stop();
          });
        }
        mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
        const blob = new Blob(webChunksRef.current, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });
        setFileToUpload(file);
      } else if (recording) {
        try {
          await recording.stopAndUnloadAsync();
        } catch (e) {
          // ignore if already stopped
        }
        const uri = recording.getURI();
        if (uri) {
          const file: any = {
            uri,
            name: "recording.m4a",
            type: "audio/m4a",
          };
          setFileToUpload(file);
        }
      }
    } catch (e) {
      console.log("Stop recording failed", e);
    } finally {
      setIsRecording(false);
      setIsPaused(false);
      setHasRecording(true);
    }
  };

  const handleCancel = () => {
    setIsRecording(false);
    setIsPaused(false);
    setWaveformData([]);
    setRecordingTime(0);
    setHasRecording(false);
    onClose();
  };

  const handleSend = async () => {
    if (!fileToUpload) return;
    console.log("--->fileToUpload", fileToUpload);
    // try {
    //   const text = await transcribeAudio(fileToUpload);
    //   setRecognizedText(text);
    //   onSendRecording(text);
    // } catch (e: any) {
    //   console.log("Transcription error", e);
    //   onSendRecording("");
    // } finally {
    //   setIsRecording(false);
    //   setIsPaused(false);
    //   setWaveformData([]);
    //   setRecordingTime(0);
    //   setHasRecording(false);
    //   setFileToUpload(null);
    //   onClose();
    // }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderWaveform = () => {
    // Show static bars if no recording yet
    const bars =
      waveformData.length > 0 ? waveformData : [0.3, 0.6, 0.9, 0.4, 0.7];

    return (
      <View style={styles.waveformContainer}>
        {bars.map((height, index) => (
          <View
            key={`wave-${index}`}
            style={[
              styles.waveformBar,
              {
                height: Math.max(height * 80, 12),
                backgroundColor:
                  isRecording && !isPaused
                    ? themeColors.primary
                    : themeColors.primaryLight,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent
    >
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={themeColors.white}
        />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {isRecording && (
              <>
                <View style={styles.recordingIndicator} />
                <Text style={styles.recordingText}>
                  {isPaused ? "Paused" : "Recording"}
                </Text>
                <Text style={styles.timeText}>{formatTime(recordingTime)}</Text>
              </>
            )}
          </View>
        </View>

        {/* Waveform Area */}
        <View style={styles.waveformSection}>
          {!isRecording && !hasRecording && (
            <Text style={styles.instructionText}>
              Tap to start recording your message
            </Text>
          )}

          {renderWaveform()}

          {hasRecording && (
            <Text style={styles.completeText}>
              Recording complete! Tap send to share.
            </Text>
          )}
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          {/* Cancel Button */}
          <Pressable style={styles.cancelButton} onPress={handleCancel}>
            <Ionicons name="close" size={28} color={themeColors.white} />
          </Pressable>

          {/* Record/Pause Button */}
          {!hasRecording && (
            <Pressable
              style={[
                styles.recordButton,
                isRecording && styles.recordingButton,
              ]}
              onPress={handleStartRecording}
            >
              <Ionicons
                name={!isRecording ? "mic" : isPaused ? "play" : "pause"}
                size={32}
                color={themeColors.white}
              />
            </Pressable>
          )}

          {/* Stop Button (when recording) */}
          {isRecording && (
            <Pressable style={styles.stopButton} onPress={handleStopRecording}>
              <Ionicons name="stop" size={28} color={themeColors.white} />
            </Pressable>
          )}

          {/* Send Button */}
          {(hasRecording || waveformData.length > 0) && (
            <Pressable style={styles.sendButton} onPress={handleSend}>
              <Ionicons name="send" size={28} color={themeColors.white} />
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (theme: ThemeTokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    header: {
      paddingTop: Platform.OS === "ios" ? 60 : 40,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    headerContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    recordingIndicator: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#FF4444",
    },
    recordingText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.text,
    },
    timeText: {
      fontSize: 16,
      color: theme.subText,
      fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    },
    waveformSection: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
    },
    instructionText: {
      fontSize: 18,
      color: theme.subText,
      textAlign: "center",
      marginBottom: 40,
      lineHeight: 24,
    },
    completeText: {
      fontSize: 16,
      color: theme.text,
      textAlign: "center",
      marginTop: 30,
      fontWeight: "500",
    },
    waveformContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 100,
      gap: 6,
    },
    waveformBar: {
      width: 8,
      borderRadius: 4,
      backgroundColor: theme.primary,
    },
    controlsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
      paddingBottom: Platform.OS === "ios" ? 50 : 30,
      gap: 30,
    },
    cancelButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: "#FF4444",
      alignItems: "center",
      justifyContent: "center",
      ...Platform.select({
        ios: {
          shadowColor: "#FF4444",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        },
        android: {
          elevation: 6,
        },
        web: {
          boxShadow: "0px 4px 12px rgba(255,68,68,0.3)",
        },
      }),
    },
    recordButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
      ...Platform.select({
        ios: {
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        },
        android: {
          elevation: 6,
        },
        web: {
          boxShadow: `0px 4px 12px ${theme.primary}40`,
        },
      }),
    },
    recordingButton: {
      backgroundColor: "#FF6B6B",
    },
    stopButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: "#666",
      alignItems: "center",
      justifyContent: "center",
    },
    sendButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
      ...Platform.select({
        ios: {
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        },
        android: {
          elevation: 6,
        },
        web: {
          boxShadow: `0px 4px 12px ${theme.primary}40`,
        },
      }),
    },
  });

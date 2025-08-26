import { NextIcon, RewindIcon } from "@/assets/icons/Icons";
import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  View
} from "react-native";
import { ThemeTokens } from "../src/theme/tokens";

interface VideoModalProps {
  isVisible: boolean;
  onClose: () => void;
  themeColors: ThemeTokens;
}

export default function VideoModal({
  isVisible,
  onClose,
  themeColors,
}: VideoModalProps) {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const videoUrl =
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = async () => {
    if (!videoRef.current) return;
    const status = await videoRef.current.getStatusAsync();
    if (!status.isLoaded) return;

    const newPosition = Math.max(0, status.positionMillis - 15000); // 15 seconds
    await videoRef.current.setPositionAsync(newPosition);
  };

  const handleForward = async () => {
    if (!videoRef.current) return;
    const status = await videoRef.current.getStatusAsync();
    if (!status.isLoaded) return;

    const newPosition = Math.min(
      status.durationMillis || 0,
      status.positionMillis + 15000
    ); // 15 seconds
    await videoRef.current.setPositionAsync(newPosition);
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) return;
    setIsPlaying(status.isPlaying);
    setIsBuffering(status.isBuffering);
  };

  const toggleControls = () => {
    setShowControls((prev) => !prev);
  };

  const styles = createVideoStyles();

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      // transparent={true}
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={[styles.container]}>
        {/* Video Container with Controls */}
        <Pressable
          className="flex-1 items-center justify-center"
          onPress={toggleControls}
          style={{ width: screenWidth, height: screenHeight }}
        >
          {/* Video Player */}
          <View
            style={[
              styles.videoWrapper,
              { width: screenWidth, height: screenHeight },
            ]}
          >
            <Video
              ref={videoRef}
              source={{ uri: videoUrl }}
              style={[
                styles.video,
                { width: screenWidth, height: screenHeight },
              ]}
              resizeMode={ResizeMode.CONTAIN}
              onPlaybackStatusUpdate={onPlaybackStatusUpdate}
              shouldPlay={false}
              isLooping={false}
            />
          </View>

          {/* Loading Indicator */}
          {isBuffering && (
            <View className="absolute inset-0 items-center justify-center">
              <ActivityIndicator size="large" color="white" />
            </View>
          )}

          {/* Controls Overlay */}
          {showControls && (
            <View
              className="absolute inset-0"
              style={[
                styles.controlsOverlay,
                { width: screenWidth, height: screenHeight },
              ]}
            >
              {/* Close Button */}
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={30} color="white" />
              </Pressable>

              {/* Center Controls */}
              <View style={styles.controlsContainer}>
                {/* Rewind 15s Button */}
                <Pressable onPress={handleRewind} style={styles.controlButton}>
                  <RewindIcon />
                  
                </Pressable>

                {/* Play/Pause Button */}
                <Pressable onPress={handlePlayPause} style={styles.playButton}>
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={32}
                    color="white"
                  />
                </Pressable>

                {/* Fast Forward 15s Button */}
                <Pressable onPress={handleForward} style={styles.controlButton}>
                  <NextIcon />
                </Pressable>
              </View>
            </View>
          )}
        </Pressable>
      </View>
    </Modal>
  );
}

const createVideoStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: "#000000",
      flex: 1,
    },
    videoWrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "#000000",
      overflow: "hidden",
    },
    video: {
      backgroundColor: "#000000",
    },
    controlsOverlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      position: "absolute",
      top: 0,
      left: 0,
    },
    closeButton: {
      position: "absolute",
      top: 20,
      right: 25,
      padding: 8,
      zIndex: 10,
    },
    controlsContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
    },
    controlButton: {
      // width: 60,
      // height: 60,
      // borderRadius: 30,
      // backgroundColor: "rgba(0, 0, 0, 0.6)",
      // alignItems: "center",
      // justifyContent: "center",
      // position: "relative",
    },
    playButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      alignItems: "center",
      justifyContent: "center",
    },
    rewindIcon: {
      position: "absolute",
      top: 12,
      left: 0,
      right: 0,
      alignItems: "center",
    },
    forwardIcon: {
      position: "absolute",
      top: 12,
      left: 0,
      right: 0,
      alignItems: "center",
    },
      timeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  circularArrowRewind: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotate: "45deg" }],
  },
  arrowHeadRewind: {
    position: "absolute",
    top: -2,
    left: 8,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 0,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftColor: "white",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    transform: [{ rotate: "-45deg" }],
  },
  circularArrowForward: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    transform: [{ rotate: "-45deg" }],
  },
  arrowHeadForward: {
    position: "absolute",
    bottom: -2,
    right: 8,
    width: 0,
    height: 0,
    borderRightWidth: 6,
    borderLeftWidth: 0,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderRightColor: "white",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    transform: [{ rotate: "45deg" }],
  },
  icon: {
    color: "#FFFFFF",
  },
  });

import { NextIcon, RewindIcon } from "@/assets/icons/Icons";
import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Platform,
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
  
  // For web, we need to consider max dimensions to maintain aspect ratio
  const isWeb = Platform.OS === 'web';
  const maxWebWidth = 1200;
  const maxWebHeight = 800;

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

  const styles = createVideoStyles(isWeb, screenWidth, screenHeight, maxWebWidth, maxWebHeight);

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={!isWeb} // Use transparent for mobile, not for web
      presentationStyle={isWeb ? "pageSheet" : "fullScreen"}
      onRequestClose={onClose}
    >
      <View style={[styles.container]}>
        {/* Video Container with Controls */}
        <Pressable
          style={styles.pressableContainer}
          onPress={toggleControls}
        >
          {/* Video Player */}
          <View style={styles.videoWrapper}>
            <Video
              ref={videoRef}
              source={{ uri: videoUrl }}
              style={styles.video}
              resizeMode={ResizeMode.CONTAIN}
              onPlaybackStatusUpdate={onPlaybackStatusUpdate}
              shouldPlay={false}
              isLooping={false}
            />
          </View>

          {/* Loading Indicator */}
          {isBuffering && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}

          {/* Controls Overlay */}
          {showControls && (
            <View style={styles.controlsOverlay}>
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

const createVideoStyles = (
  isWeb: boolean, 
  screenWidth: number, 
  screenHeight: number, 
  maxWebWidth: number, 
  maxWebHeight: number
) => {
  // Calculate dimensions for web to maintain aspect ratio
  const webWidth = Math.min(screenWidth, maxWebWidth);
  const webHeight = Math.min(screenHeight, maxWebHeight);
  const aspectRatio = 16/9; // Standard video aspect ratio
  
  // For web, we want to maintain aspect ratio and not take full screen
  const videoWidth = isWeb ? webWidth : screenWidth;
  const videoHeight = isWeb ? Math.min(webWidth / aspectRatio, webHeight) : screenHeight;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000",
      justifyContent: isWeb ? 'center' : 'flex-start',
      alignItems: isWeb ? 'center' : 'stretch',
    },
    pressableContainer: {
      width: videoWidth,
      height: videoHeight,
      alignItems: 'center',
      justifyContent: 'center',
      // Center on web with some margin
      margin: isWeb ? 20 : 0,
    },
    videoWrapper: {
      width: '100%',
      height: '100%',
      backgroundColor: "#000000",
      overflow: "hidden",
    },
    video: {
      width: '100%',
      height: '100%',
      backgroundColor: "#000000",
    },
    loadingContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    controlsOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      justifyContent: 'space-between',
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
      // Your existing control button styles
    },
    playButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      alignItems: "center",
      justifyContent: "center",
    },
    // Add responsive text styles if needed
    timeText: {
      color: "white",
      fontSize: isWeb ? 16 : 14,
      fontWeight: "bold",
      position: "absolute",
      bottom: 12,
      left: 0,
      right: 0,
      textAlign: "center",
    },
  });
};
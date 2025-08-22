import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import React, { useRef, useState } from "react";
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
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

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
    
    const newPosition = Math.max(0, status.positionMillis - 10000);
    await videoRef.current.setPositionAsync(newPosition);
  };

  const handleForward = async () => {
    if (!videoRef.current) return;
    const status = await videoRef.current.getStatusAsync();
    if (!status.isLoaded) return;
    
    const newPosition = Math.min(status.durationMillis || 0, status.positionMillis + 10000);
    await videoRef.current.setPositionAsync(newPosition);
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) return;
    setIsPlaying(status.isPlaying);
    setIsBuffering(status.isBuffering);
  };

  const toggleControls = () => {
    setShowControls(prev => !prev);
  };

  const styles = createVideoStyles();

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[styles.container, { width: screenWidth, height: screenHeight }]}>
        {/* Video Container with Controls */}
        <Pressable 
          className="flex-1 items-center justify-center"
          onPress={toggleControls}
          style={{ width: screenWidth, height: screenHeight }}
        >
          {/* Video Player */}
          <View style={[styles.videoWrapper, { width: screenWidth, height: screenHeight }]}>
            <Video
              ref={videoRef}
              source={{ uri: videoUrl }}
              style={[styles.video, { width: screenWidth, height: screenHeight }]}
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
              style={[styles.controlsOverlay, { width: screenWidth, height: screenHeight }]}
            >
              {/* Close Button */}
              <Pressable
                onPress={onClose}
                className="absolute top-5 right-5 p-3 rounded-full z-10"
                style={styles.controlButton}
              >
                <Ionicons name="close" size={24} style={styles.icon} />
              </Pressable>

              {/* Center Controls */}
              <View className="flex-1 flex-row items-center justify-center space-x-5">
                <Pressable
                  onPress={handleRewind}
                  className="p-4 rounded-full"
                  style={styles.controlButton}
                >
                  <Ionicons
                    name="play-back"
                    size={30}
                    style={styles.icon}
                  />
                </Pressable>

                <Pressable
                  onPress={handlePlayPause}
                  className="p-5 rounded-full"
                  style={styles.controlButton}
                >
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={40}
                    style={styles.icon}
                  />
                </Pressable>

                <Pressable
                  onPress={handleForward}
                  className="p-4 rounded-full"
                  style={styles.controlButton}
                >
                  <Ionicons
                    name="play-forward"
                    size={30}
                    style={styles.icon}
                  />
                </Pressable>
              </View>
            </View>
          )}
        </Pressable>
      </View>
    </Modal>
  );
}

const createVideoStyles = () => StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  videoWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  video: {
    backgroundColor: '#000000',
  },
  controlsOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  icon: {
    color: '#FFFFFF',
  },
});
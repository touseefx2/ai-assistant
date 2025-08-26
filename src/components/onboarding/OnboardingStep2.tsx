import { ChatIcon, MicIcon } from "@/assets/icons/Icons";
import VoiceRecordingModal from "@/src/components/modals/VoiceRecordingModal";
import type { RootState } from "@/src/state/store";
import { useAppSelector } from "@/src/state/useStoreHooks";
import { ThemeTokens, getThemeTokens } from "@/src/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import SuccessModal from "../modals/SuccessModal";

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
  suggestions?: string[];
}

export default function OnboardingStep2({ messages, setMessages }) {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const themeColors = getThemeTokens(theme);
  const styles = createStyles(themeColors);

  const [inputText, setInputText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Initialize with bot message
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          id: 1,
          text: "Hi there! What should I call you?",
          isBot: true,
          timestamp: "10:25",
        },
      ]);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleChatIconPress = () => {
    setShowInput(true);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: messages.length + 1,
        text: inputText.trim(),
        isBot: false,
        timestamp: "10:25",
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
      Keyboard.dismiss();

      // Bot response after user input
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: messages.length + 2,
          text: "Got it! I'll remind you tomorrow at 2 PM. Easy, right?",
          isBot: true,
          timestamp: "10:25",
          suggestions: ["Yep!", "No, cancel it", "Reschedule"],
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleMicPress = () => {
    setShowVoiceModal(true);
  };

  const handleVoiceRecordingSent = (audioText: string) => {
    const voiceMessage: ChatMessage = {
      id: messages.length + 1,
      text: audioText,
      isBot: false,
      timestamp: "10:25",
    };
    setMessages((prev) => [...prev, voiceMessage]);

    // Bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: messages.length + 2,
        text: `A pleasure to meet you, Steve Smith! Now try something simple — like "Remind me to call my doctor tomorrow at 2 PM."`,
        isBot: true,
        timestamp: "10:25",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  // Handle suggestion button press
  const handleSuggestionPress = (suggestion: string) => {
    setSuccessVisible(true);
  };

  // Suggestion Buttons Component
  const SuggestionButtons = ({ suggestions }: { suggestions: string[] }) => (
    <View style={styles.suggestionsContainer}>
      {suggestions.map((suggestion, index) => (
        <Pressable
          key={index}
          style={styles.suggestionButton}
          onPress={() => handleSuggestionPress(suggestion)}
        >
          <Text style={styles.suggestionText}>{suggestion}</Text>
        </Pressable>
      ))}
    </View>
  );

  const getInitials = (text: string, isBot: boolean) => {
    if (isBot) return "LN";
    const words = text.split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return text.slice(0, 2).toUpperCase();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* <TouchableWithoutFeedback  onPress={Keyboard.dismiss}> */}
          <View style={{ flex: 1 }}>
            {/* Header */}
            <View className="mt-5">
              <Text className="font-semibold" style={styles.title}>
                {messages.length <= 2
                  ? "Getting to Know You"
                  : "Your First Task"}
              </Text>
            </View>

            {/* Chat Area */}
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item: message }) => (
                <View style={styles.messageWrapper}>
                  <View
                    className={`flex-row items-start gap-3 ${
                      message.isBot ? "" : "justify-end"
                    }`}
                  >
                    {message.isBot && (
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>LN</Text>
                      </View>
                    )}

                    <View
                      style={[
                        styles.bubble,
                        message.isBot ? styles.botBubble : styles.userBubble,
                      ]}
                    >
                      <Text
                        style={
                          message.isBot
                            ? styles.botBubbleText
                            : styles.userBubbleText
                        }
                      >
                        {message.text}
                      </Text>
                      <Text style={styles.timestamp}>{message.timestamp}</Text>
                    </View>

                    {!message.isBot && (
                      <View style={[styles.avatar, styles.userAvatar]}>
                        <Text style={styles.avatarText}>
                          {getInitials(message.text, false)}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Show suggestions below bot messages if they exist */}
                  {message.isBot && message.suggestions && (
                    <View style={styles.suggestionsWrapper}>
                      <SuggestionButtons suggestions={message.suggestions} />
                    </View>
                  )}
                </View>
              )}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
              removeClippedSubviews={false}
              maxToRenderPerBatch={10}
              windowSize={10}
              initialNumToRender={10}
              onEndReachedThreshold={0.5}
            />

            {/* Bottom Area - Fixed height container */}
            <View style={styles.bottomArea}>
              {/* Input Area */}
              {showInput && (
                <View style={styles.inputArea}>
                  <View className="flex-row items-center gap-5">
                    <View
                      className="flex-1 flex-row items-center"
                      style={styles.inputContainer}
                    >
                      <TextInput
                        style={styles.textInput}
                        placeholder="Type your text..."
                        placeholderTextColor={themeColors.subText}
                        value={inputText}
                        onChangeText={setInputText}
                        onSubmitEditing={handleSendMessage}
                        returnKeyType="send"
                      />
                      {inputText.trim() && (
                        <Pressable
                          onPress={handleSendMessage}
                          style={styles.sendButton}
                        >
                          <Ionicons
                            name="send"
                            size={20}
                            color={themeColors.primary}
                          />
                        </Pressable>
                      )}
                    </View>
                    <Pressable
                      style={styles.micButtonActive}
                      onPress={handleMicPress}
                    >
                      <Ionicons
                        name="mic"
                        size={24}
                        color={themeColors.white}
                      />
                    </Pressable>
                  </View>
                </View>
              )}

              {/* Bottom Controls - Always show chat icon */}
              {!showInput && (
                <View style={styles.bottomControls}>
                  <View className="flex-row items-center justify-center gap-5">
                    <Pressable
                      style={styles.iconButton}
                      onPress={handleChatIconPress}
                    >
                      <ChatIcon />
                    </Pressable>
                    <Pressable
                      style={styles.iconButton}
                      onPress={handleMicPress}
                    >
                      <MicIcon />
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          </View>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>

      <VoiceRecordingModal
        isVisible={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        onSendRecording={handleVoiceRecordingSent}
      />
      <SuccessModal isVisible={successVisible} />
    </SafeAreaView>
  );
}

const createStyles = (theme: ThemeTokens) =>
  StyleSheet.create({
    title: {
      color: theme.text,
      fontSize: 22,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    userAvatar: {
      backgroundColor: theme.borderDark,
    },
    avatarText: {
      color: theme.white,
      fontSize: 14,
      fontWeight: "600",
    },
    bubble: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 20,
      maxWidth: "75%",
      position: "relative",
    },
    botBubble: {
      backgroundColor: theme.primary,
      borderBottomLeftRadius: 4,
    },
    userBubble: {
      backgroundColor: theme.borderDark,
      borderBottomRightRadius: 4,
    },
    botBubbleText: {
      fontSize: 15,
      color: theme.white,
      lineHeight: 20,
    },
    userBubbleText: {
      fontSize: 15,
      color: theme.white,
      lineHeight: 20,
    },
    timestamp: {
      fontSize: 11,
      color: "rgba(255, 255, 255, 0.7)",
      marginTop: 4,
      textAlign: "right",
    },
    iconButton: {
      // Static controls for when chat is complete
    },
    inputArea: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      paddingTop: 10,
      backgroundColor: theme.background,
    },
    bottomControls: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      paddingTop: 10,
      backgroundColor: theme.background,
    },
    bottomArea: {
      backgroundColor: theme.background,
      paddingBottom: 20,
      paddingTop: 10,
      minHeight: 80,
    },
    scrollView: {
      flex: 1,
      marginTop: 40,
    },
    scrollContent: {
      paddingBottom: 20,
      paddingTop: 10,
      flexGrow: 1,
    },
    messageWrapper: {
      marginBottom: 15,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 25,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme.background,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      minHeight: 24,
    },
    sendButton: {
      padding: 4,
      marginLeft: 8,
    },
    micButtonActive: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    suggestionsWrapper: {
      marginTop: 12,
      marginLeft: 48,
    },
    suggestionsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    suggestionButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.background,
    },
    suggestionText: {
      fontSize: 14,
      color: theme.text,
      fontWeight: "500",
    },
  });

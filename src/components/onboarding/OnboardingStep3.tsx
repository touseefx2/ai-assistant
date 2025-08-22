import type { RootState } from "@/src/state/store";
import { useAppSelector } from "@/src/state/useStoreHooks";
import { ThemeTokens, getThemeTokens } from "@/src/theme/tokens";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function OnboardingStep3() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const themeColors = getThemeTokens(theme);
  const styles = createStyles(themeColors);

  return (
    <View className="flex-1 justify-center">
      {/* Bot Intro */}
      <View style={[styles.bubble, styles.bot]}>
        <Text style={styles.bubbleText}>
          A pleasure to meet you, Steve Smith! Try something simple — like
          “Remind me to call my doctor tomorrow at 2 PM.”
        </Text>
      </View>

      {/* User Input */}
      <View style={[styles.bubble, styles.user]}>
        <Text style={styles.bubbleText}>Remind me to call my doctor tomorrow at 2 PM</Text>
      </View>

      {/* Bot Confirmation */}
      <View style={[styles.bubble, styles.bot]}>
        <Text style={styles.bubbleText}>
          Got it! I’ll remind you tomorrow at 2 PM. Easy, right?
        </Text>
      </View>

      {/* Options */}
      <View className="flex-row gap-3 mt-4 justify-center">
        {["Yep!", "No, cancel it", "Reschedule"].map((opt, i) => (
          <Pressable key={i} style={styles.optionBtn}>
            <Text style={styles.optionText}>{opt}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const createStyles = (theme: ThemeTokens) =>
  StyleSheet.create({
    bubble: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 16,
      marginVertical: 8,
      maxWidth: "80%",
    },
    bubbleText: {
      fontSize: 15,
      color: theme.white,
    },
    bot: {
      alignSelf: "flex-start",
      backgroundColor: theme.primary,
    },
    user: {
      alignSelf: "flex-end",
      backgroundColor: theme.borderDark,
    },
    optionBtn: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.border,
    },
    optionText: {
      color: theme.text,
      fontSize: 14,
    },
  });

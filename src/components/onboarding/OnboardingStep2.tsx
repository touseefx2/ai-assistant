import type { RootState } from "@/src/state/store";
import { useAppSelector } from "@/src/state/useStoreHooks";
import { ThemeTokens, getThemeTokens } from "@/src/theme/tokens";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function OnboardingStep2() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const themeColors = getThemeTokens(theme);
  const styles = createStyles(themeColors);

  return (
    <View className="flex-1 justify-center">
      {/* Bot Bubble */}
      <View style={[styles.bubble, styles.bot]}>
        <Text style={styles.bubbleText}>Hi there! What should I call you?</Text>
      </View>

      {/* User Bubble */}
      <View style={[styles.bubble, styles.user]}>
        <Text style={styles.bubbleText}>You can call me Steve Smith!</Text>
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
  });

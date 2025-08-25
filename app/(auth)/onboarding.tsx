import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import OnboardingStep1 from "../../src/components/onboarding/OnboardingStep1";
import OnboardingStep2 from "../../src/components/onboarding/OnboardingStep2";
import type { RootState } from "../../src/state/store";
import { useAppSelector } from "../../src/state/useStoreHooks";
import { ThemeTokens, getThemeTokens } from "../../src/theme/tokens";

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

export default function Onboarding() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const themeColors = getThemeTokens(theme);
  const styles = createStyles(themeColors);
  const [step, setStep] = useState(1);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (messages.length > 2) {
      setStep(3);
    }
  }, [messages]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <OnboardingStep1 />;
      case 2:
        return (
          <OnboardingStep2 messages={messages} setMessages={setMessages} />
        );
      case 3:
        return (
          <OnboardingStep2 messages={messages} setMessages={setMessages} />
        );
      default:
        return null;
    }
  };

  return (
    <View
      className="flex-1 items-center justify-between py-12 px-6"
      style={styles.container}
    >
      {/* Responsive Container for all content */}
      <View
        className="flex-1 justify-between"
        style={{
          width: "100%",
          maxWidth: 448, // 28rem in pixels (md breakpoint)
          alignSelf: "center",
        }}
      >
        {/* Progress Bar */}
        <View className="flex-row items-center justify-between w-full">
          {/* Bars */}
          <View className="flex-1 flex-row mr-3">
            {[1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.bar,
                  {
                    backgroundColor:
                      i <= step
                        ? themeColors.primary
                        : themeColors.primaryLight,
                  },
                ]}
              />
            ))}
          </View>

          {/* Step Text */}
          <Text
            className="font-semibold"
            style={styles.stepText}
          >{`${step} of 3`}</Text>
        </View>

        {/* Current Step */}
        <View className="flex-1 w-full">{renderStep()}</View>

        {/* Footer Buttons */}
        {step == 1 && (
          <View className="w-full justify-between mt-5 gap-4">
            <Pressable
              className="py-4 px-6 rounded-xl"
              style={styles.primaryBtn}
              onPress={() => {
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  // Navigate to main app on finish
                  router.replace("/(main)/(drawer)");
                }
              }}
            >
              <Text
                className="font-semibold text-center"
                style={styles.primaryBtnText}
              >
                Continue
              </Text>
            </Pressable>

            <Pressable
              className="py-4 px-6 rounded-xl border-2"
              style={styles.primaryBtn2}
              onPress={() => {
                // Skip to main app
                router.replace("/(main)/(drawer)");
              }}
            >
              <Text
                className="font-semibold  text-center"
                style={styles.primaryBtnText2}
              >
                Skip
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const createStyles = (theme: ThemeTokens) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
    },
    bar: {
      flex: 1,
      height: 6,
      borderRadius: 3,
      marginHorizontal: 3,
    },
    stepText: {
      color: theme.text,
      fontSize: 12,
    },
    skipText: {
      fontSize: 12,
      color: theme.text,
    },
    primaryBtn: {
      backgroundColor: theme.primary,
    },
    primaryBtn2: {
      borderColor: theme.primary,
    },
    primaryBtnText: {
      color: theme.white,
      fontSize: 16,
    },
    primaryBtnText2: {
      color: theme.primary,
      fontSize: 16,
    },
  });

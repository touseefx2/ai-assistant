// app/onboarding/index.tsx
import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import OnboardingStep1 from "../../src/components/onboarding/OnboardingStep1";
import OnboardingStep2 from "../../src/components/onboarding/OnboardingStep2";
import OnboardingStep3 from "../../src/components/onboarding/OnboardingStep3";
import type { RootState } from "../../src/state/store";
import { useAppSelector } from "../../src/state/useStoreHooks";
import { ThemeTokens, getThemeTokens } from "../../src/theme/tokens";

const { width } = Dimensions.get("window");

export default function Onboarding() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const themeColors = getThemeTokens(theme);

  const [step, setStep] = useState(1);

  const styles = createStyles(themeColors);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <OnboardingStep1 />;
      case 2:
        return <OnboardingStep2 />;
      case 3:
        return <OnboardingStep3 />;
      default:
        return null;
    }
  };

  return (
    <View
      className="flex-1 items-center justify-between py-12 px-6"
      style={styles.container}
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
                    i === step ? themeColors.primary : themeColors.primaryLight,
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
      <View className="w-full justify-between mt-5  gap-4">
        <Pressable
          className="py-4 px-6 rounded-xl"
          style={styles.primaryBtn}
          onPress={() => setStep(step < 3 ? step + 1 : step)}
        >
          <Text
            className="font-semibold text-center"
            style={styles.primaryBtnText}
          >
            {step === 3 ? "Finish" : "Continue"}
          </Text>
        </Pressable>

        <Pressable
          className="py-4 px-6 rounded-xl border-2"
          style={styles.primaryBtn2}
          onPress={() => setStep(3)}
        >
          <Text
            className="font-semibold  text-center"
            style={styles.primaryBtnText2}
          >
            Skip
          </Text>
        </Pressable>
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
      fontSize:12
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
      fontSize:16
    },
    primaryBtnText2: {
      color: theme.primary,
      fontSize:16
    },
  });

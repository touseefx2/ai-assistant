import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import type { RootState } from "../../src/state/store";
import { useAppSelector } from "../../src/state/useStoreHooks";
import { getThemeTokens } from "../../src/theme/tokens";

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const tokens = getThemeTokens(theme);
  return (
    <View className={`flex-1 ${tokens.bgClass} items-center justify-center gap-4`}>
      <Text className={`text-4xl font-extrabold ${tokens.textClass}`}>{t('welcome')}</Text>
      <Pressable onPress={() => router.replace("/(main)/(drawer)")}>
        <Text className={`text-lg underline ${tokens.textClass}`}>{t('dashboard')}</Text>
      </Pressable>
    </View>
  );
}


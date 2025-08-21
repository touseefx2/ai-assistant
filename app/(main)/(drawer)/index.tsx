import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import type { RootState } from "../../../src/state/store";
import { useAppSelector } from "../../../src/state/useStoreHooks";
import { getThemeTokens } from "../../../src/theme/tokens";

export default function DashboardScreen() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const tokens = getThemeTokens(theme);
  const { t } = useTranslation();

  return (
    <View className={`flex-1 ${tokens.bgClass} items-center justify-center px-4`}>
      <Text className={`text-3xl font-extrabold ${tokens.textClass}`}>{t('dashboard')}</Text>
    </View>
  );
}


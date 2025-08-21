import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import type { RootState } from "../../../src/state/store";
import { useAppSelector } from "../../../src/state/useStoreHooks";

export default function DashboardScreen() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const { t } = useTranslation();

  const rootThemeClass = theme === 'black' ? 'theme-black' : theme === 'blue' ? 'theme-blue' : 'theme-white';

  return (
    <View className={`flex-1 ${rootThemeClass} bg-app items-center justify-center px-4`}>
      <Text className={`text-3xl font-extrabold text-app`}>{t('dashboard')}</Text>
    </View>
  );
}


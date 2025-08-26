import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import DrawerHeader from "../../../components/DrawerHeade";
import { Dropdown } from "../../../src/components/Dropdown";
import { setLanguage } from "../../../src/state/languageSlice";
import type { RootState } from "../../../src/state/store";
import { setTheme, type AppTheme } from "../../../src/state/themeSlice";
import { useAppDispatch, useAppSelector } from "../../../src/state/useStoreHooks";
import { getThemeTokens } from "../../../src/theme/tokens";

export default function SettingScreen() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const language = useAppSelector((s: RootState) => s.language.current);
  const { t } = useTranslation();
  const tokens = getThemeTokens(theme);

  return (
    <View 
    style={{backgroundColor:tokens.background}}
    className={`flex-1`}>
      <DrawerHeader 
        title="Settings"
        onNotificationPress={() => {}}
        onRefreshPress={() => {}}
        notificationCount={0}
      />
      <View className="relative z-50 overflow-visible flex-row justify-end gap-4 px-4 pt-3">
        <View className="min-w-[160px]">
          <Text
          style={{color:tokens.text}}
          className={`text-xs mb-1 text-right`}>{t('changeLanguage')}</Text>
          <Dropdown
            label={t('changeLanguage')}
            value={language}
            options={[{ label: 'English', value: 'en' }, { label: 'Français', value: 'fr' }]}
            onChange={(val) => dispatch(setLanguage(val))}
            compact
            showLabel={false}
          />
        </View>
        <View className="min-w-[160px]">
          <Text 
          style={{color:tokens.text}}
          className={`text-xs mb-1 text-right`}>{t('currentTheme')}</Text>
          <Dropdown
            label={t('currentTheme')}
            value={theme}
            options={[{ label: 'White', value: 'white' as AppTheme }, { label: 'Black', value: 'black' as AppTheme }, { label: 'Blue', value: 'blue' as AppTheme }]}
            onChange={(val) => dispatch(setTheme(val))}
            compact
            showLabel={false}
          />
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 z-0 items-center justify-center px-4">
        <Text 
        style={{color:tokens.text}}
        className={`text-3xl font-extrabold`}>{t('settings')}</Text>
      </View>
    </View>
  );
}


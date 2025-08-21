import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Provider } from 'react-redux';
import "../global.css";
import '../src/i18n';
import i18n from '../src/i18n';
import type { RootState } from '../src/state/store';
import { hydrateFromStorage, store } from '../src/state/store';
import { useAppSelector } from '../src/state/useStoreHooks';
import { getThemeTokens } from '../src/theme/tokens';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Hydrator>
        <RootContent />
      </Hydrator>
    </Provider>
  );
}

function RootContent() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const language = useAppSelector((s: RootState) => s.language.current);
  const tokens = getThemeTokens(theme);
  const [fontsLoaded] = useFonts({
    'Satoshi-Regular': require('../assets/fonts/Satoshi-Regular.ttf'),
    'Satoshi-Medium': require('../assets/fonts/Satoshi-Medium.ttf'),
    'Satoshi-Semibold': require('../assets/fonts/Satoshi-Bold.ttf'),
    'Satoshi-Bold': require('../assets/fonts/Satoshi-Black.ttf'),
  });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className={`flex-1 ${tokens.bgClass}`}>
      <StatusBar style="dark" />
      <Stack
        initialRouteName="(auth)"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)" options={{ title: "Welcome" }} />
      </Stack>
    </View>
  );
}

function Hydrator({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    hydrateFromStorage(store.dispatch);
  }, []);
  return children as any;
}

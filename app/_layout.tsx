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
  const themeClass = theme === 'black' ? 'theme-black' : theme === 'blue' ? 'theme-blue' : 'theme-white';

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <View className={`flex-1 bg-app ${themeClass}`}>
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

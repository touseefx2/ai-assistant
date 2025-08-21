import { Drawer } from 'expo-router/drawer';
import type { RootState } from '../../../src/state/store';
import { useAppSelector } from '../../../src/state/useStoreHooks';
import { getThemeTokens } from '../../../src/theme/tokens';

export default function DrawerLayout() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const tokens = getThemeTokens(theme);

  return (
    <Drawer screenOptions={{ headerShown: true, headerTintColor: tokens.headerTintHex, headerStyle: { backgroundColor: tokens.headertBgHex } }}>
      <Drawer.Screen name="index" options={{ title: "Dashboard" }} />
      <Drawer.Screen name="settings" options={{ title: "Setting" }} />
    </Drawer>
  );
}



import { Drawer } from 'expo-router/drawer';
import type { RootState } from '../../../src/state/store';
import { useAppSelector } from '../../../src/state/useStoreHooks';

export default function DrawerLayout() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const headerTintColor = theme === 'black' ? 'white' : 'black';
  const headerBackground = theme === 'black' ? '#000000' : theme === 'blue' ? '#eff6ff' : '#ffffff';

  return (
    <Drawer screenOptions={{ headerShown: true, headerTintColor, headerStyle: { backgroundColor: headerBackground } }}>
      <Drawer.Screen name="index" options={{ title: "Dashboard" }} />
      <Drawer.Screen name="settings" options={{ title: "Setting" }} />
    </Drawer>
  );
}



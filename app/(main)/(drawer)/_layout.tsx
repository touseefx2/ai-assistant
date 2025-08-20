import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {

  return (
    <Drawer screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="index" options={{ title: "Dashboard" }} />
      <Drawer.Screen name="settings" options={{ title: "Setting" }} />
    </Drawer>
  );
}



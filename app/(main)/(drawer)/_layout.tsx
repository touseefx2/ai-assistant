import {
  MenuCalendar,
  MenuCommunication,
  MenuDashboard,
  MenuHelp,
  MenuProfile,
  MenuSettings,
  MenuTask,
} from "@/assets/icons/Icons";
import { Drawer } from "expo-router/drawer";
import type { RootState } from "../../../src/state/store";
import { useAppSelector } from "../../../src/state/useStoreHooks";
import { getThemeTokens } from "../../../src/theme/tokens";

export default function DrawerLayout() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const tokens = getThemeTokens(theme);

  return (
    <Drawer
      screenOptions={{
        drawerType: "slide",
        headerShown: true,
        headerTintColor: tokens.text,
        headerStyle: { backgroundColor: tokens.background },
        drawerActiveBackgroundColor: "transparent",
        drawerActiveTintColor: "transparent",
        drawerInactiveTintColor: "transparent",
        drawerStyle: {
          backgroundColor: tokens.primary,
        },
        drawerLabelStyle: {
          color: tokens.white,
          fontFamily: "Satoshi-Medium",
          fontSize: 17,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <MenuDashboard width={size} height={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="calendar"
        options={{
          title: "Calendar",
          drawerIcon: ({ color, size }) => (
            <MenuCalendar width={size} height={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="tasks"
        options={{
          title: "Tasks",
          drawerIcon: ({ color, size }) => (
            <MenuTask width={size} height={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="communication"
        options={{
          title: "Communication",
          drawerIcon: ({ color, size }) => (
            <MenuCommunication width={size} height={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerIcon: ({ color, size }) => (
            <MenuProfile width={size} height={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          title: "Helps",
          drawerIcon: ({ color, size }) => (
            <MenuHelp width={size} height={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <MenuSettings width={size} height={size} />
          ),
        }}
      />
    </Drawer>
  );
}

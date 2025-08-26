import { DrawerBellN, DrawerHistory, DrawerMenu } from "@/assets/icons/Icons";
import { RootState } from "@/src/state/store";
import { useAppSelector } from "@/src/state/useStoreHooks";
import { ThemeTokens, getThemeTokens } from "@/src/theme/tokens";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface DrawerHeaderProps {
  title: string;
  onNotificationPress?: () => void;
  onRefreshPress?: () => void;
  notificationCount?: number;
}

export default function DrawerHeader({
  title,
  onNotificationPress,
  onRefreshPress,
  notificationCount = 0,
}: DrawerHeaderProps) {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const themeColors = getThemeTokens(theme);
  const styles = createWelcomeStyles(themeColors);
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={styles.container}>
      {/* Left - Hamburger Menu */}
      <Pressable
        style={styles.menuButton}
        onPress={() => {
          navigation?.openDrawer();
        }}
      >
        <DrawerMenu />
      </Pressable>

      {/* Center - Title */}
      <Text className="font-bold" style={styles.title}>
        {title}
      </Text>

      {/* Right - Icons */}
      <View style={styles.rightIcons}>
        {/* Notification Bell */}
        <Pressable style={styles.iconButton} onPress={onNotificationPress}>
          <DrawerBellN />
          {/* <Ionicons name="notifications" size={24} color="#333" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>
                {notificationCount > 9 ? "9+" : notificationCount}
              </Text>
            </View>
          )} */}
        </Pressable>

        {/* Refresh/History Icon */}
        <Pressable style={styles.iconButton} onPress={onRefreshPress}>
          <DrawerHistory />
        </Pressable>
      </View>
    </View>
  );
}

export const createWelcomeStyles = (theme: ThemeTokens) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.backgroundWhite,
      paddingHorizontal: 16,
      paddingVertical: 12,
      paddingTop:
        Platform.OS === "ios" ? 50 : (StatusBar.currentHeight || 24) + 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    menuButton: {
      padding: 8,
    },
    title: {
      fontSize: 17,
      color: theme.textBlack,
      flex: 1,
      textAlign: "center",
    },
    rightIcons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    iconButton: {
      padding: 8,
      position: "relative",
    },
    notificationBadge: {
      position: "absolute",
      top: 4,
      right: 4,
      backgroundColor: "#FF4444",
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 4,
    },
    notificationText: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "bold",
    },
  });

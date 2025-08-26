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
      {/* Left section with menu button - used to balance the right section */}
      <View style={styles.leftSection}>
        <Pressable
          style={styles.menuButton}
          onPress={() => {
            navigation?.openDrawer();
          }}
        >
          <DrawerMenu />
        </Pressable>
      </View>

      {/* Center - Title */}
      <View style={styles.centerSection}>
        <Text numberOfLines={1} className="font-bold" style={styles.title}>
          {title}
        </Text>
      </View>

      {/* Right - Icons */}
      <View style={styles.rightSection}>
        {/* Notification Bell */}
        <Pressable style={styles.iconButton} onPress={onNotificationPress}>
          <DrawerBellN />
          {/* {notificationCount > 0 && (
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
      backgroundColor: theme.backgroundWhite,
      paddingHorizontal: 16,
      paddingVertical: 12,
      paddingTop:
        Platform.OS === "ios" ? 50 : (StatusBar.currentHeight || 24) + 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    leftSection: {
      flex: 1,
      alignItems: "flex-start",
    },
    centerSection: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    rightSection: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 8,
    },
    menuButton: {
      padding: 8,
    },
    title: {
      fontSize: 17,
      color: theme.textBlack,
      textAlign: "center",
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
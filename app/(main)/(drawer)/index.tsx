import { StyleSheet, Text, View } from "react-native";
import DrawerHeader from "../../../components/DrawerHeader";
import type { RootState } from "../../../src/state/store";
import { useAppSelector } from "../../../src/state/useStoreHooks";
import { ThemeTokens, getThemeTokens } from "../../../src/theme/tokens";

export default function DashboardScreen() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const tokens = getThemeTokens(theme);
  // const { t } = useTranslation();
  const styles = createWelcomeStyles(tokens);

  return (
    // <DrawerSceneWrapper>
      <View style={styles.container}>
        <DrawerHeader
          title="Dashboard"
          onNotificationPress={() => {}}
          onRefreshPress={() => {}}
          notificationCount={3}
        />
        <View
          className={`flex-1 items-center justify-center px-4`}
          style={styles.content}
        >
          <Text className={`text-3xl font-bold`} style={styles.title}>
            Dashboard
          </Text>
        </View>
      </View>
 
  );
}

export const createWelcomeStyles = (theme: ThemeTokens) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flex: 1,
    },
    content: {
      flex: 1,
    },
    title: {
      color: theme.subText,
    },
  });

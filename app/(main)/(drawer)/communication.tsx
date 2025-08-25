import { StyleSheet, Text, View } from "react-native";
import type { RootState } from "../../../src/state/store";
import { useAppSelector } from "../../../src/state/useStoreHooks";
import { ThemeTokens, getThemeTokens } from "../../../src/theme/tokens";

export default function CommunicationScreen() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const tokens = getThemeTokens(theme);
  // const { t } = useTranslation();
  const styles = createWelcomeStyles(tokens);

  return (
    <View
      className={`flex-1 items-center justify-center px-4`}
      style={styles.container}
    >
      <Text className={`text-3xl font-bold`} style={styles.title}>
      Communication
      </Text>
    </View>
  );
}

export const createWelcomeStyles = (theme: ThemeTokens) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
    },
    title: {
      color: theme.subText,
    },
  });

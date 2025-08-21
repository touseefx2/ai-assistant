import { Stack } from "expo-router";
import type { RootState } from "../../src/state/store";
import { useAppSelector } from "../../src/state/useStoreHooks";
import { getThemeTokens } from "../../src/theme/tokens";

export default function AuthLayout() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const tokens = getThemeTokens(theme);
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: tokens.headertBgHex },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Welcome" }} />
    </Stack>
  );
}

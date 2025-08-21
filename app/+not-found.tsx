import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import type { RootState } from "../src/state/store";
import { useAppSelector } from "../src/state/useStoreHooks";
import { getThemeTokens } from "../src/theme/tokens";

export default function NotFoundScreen() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const tokens = getThemeTokens(theme);
  return (
    <>
      <Stack.Screen options={{ title: "Page Not Found" }} />
      <View className={`flex-1 ${tokens.bgClass} justify-center items-center px-6`}>
        {/* Big Icon */}
        <Ionicons name="alert-circle-outline" size={80} color={tokens.headerTintHex} />

        {/* Heading */}
        <Text className={`text-3xl font-bold ${tokens.textClass} mt-6`}>Oops!</Text>
        <Text className={`text-lg ${tokens.mutedTextClass} mt-2 text-center`}>
          The page you’re looking for doesn’t exist or has been moved.
        </Text>

        {/* Button */}
        <Link href="/" asChild>
          <TouchableOpacity className="mt-8 bg-blue-500 px-6 py-3 rounded-2xl shadow-md active:bg-blue-600">
            <Text className={`${tokens.textClass} text-base font-semibold`}>
              Go Back Home
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

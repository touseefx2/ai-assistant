import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center gap-2">
      <Text className="text-4xl text-black font-extrabold">Welcome screen</Text>
      <Pressable onPress={() => router.replace("/(main)/(drawer)")}>
        <Text className="text-lg underline text-black">Go to main</Text>
      </Pressable>
    </View>
  );
}


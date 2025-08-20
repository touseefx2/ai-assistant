import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Page Not Found" }} />
      <View className="flex-1 bg-[#25292e] justify-center items-center px-6">
        {/* Big Icon */}
        <Ionicons name="alert-circle-outline" size={80} color="#fff" />

        {/* Heading */}
        <Text className="text-3xl font-bold text-white mt-6">Oops!</Text>
        <Text className="text-lg text-gray-300 mt-2 text-center">
          The page you’re looking for doesn’t exist or has been moved.
        </Text>

        {/* Button */}
        <Link href="/" asChild>
          <TouchableOpacity className="mt-8 bg-blue-500 px-6 py-3 rounded-2xl shadow-md active:bg-blue-600">
            <Text className="text-white text-base font-semibold">
              Go Back Home
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

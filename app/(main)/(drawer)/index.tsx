import { Text, View } from "react-native";

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center gap-2">
      <Text className="text-4xl text-black font-extrabold">Dashboard screen</Text>
      {/* <Pressable onPress={() => router.replace("/(main)/(drawer)")}>
        <Text style={styles.button}>Go to main</Text>
      </Pressable> */}
    </View>
  );
}


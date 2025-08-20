import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import "../global.css";

export default function RootLayout() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Stack
        initialRouteName="(auth)"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)" options={{ title: "Welcome" }} />
      </Stack>
    </View>
  );
}

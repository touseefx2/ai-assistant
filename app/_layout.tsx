import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark" />
      <Stack
      initialRouteName="onBoarding"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#FFFFFF" },
        }}
      >
        <Stack.Screen name="onBoarding" />
        <Stack.Screen
          name="detail/[id]"
          options={{
            title: "Detail",
          }}
        />
      </Stack>
    </View>
  );
}

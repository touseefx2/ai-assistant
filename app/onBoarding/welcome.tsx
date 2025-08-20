import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome screen</Text>
      <Pressable onPress={() => router.replace("/(main)/(drawer)")}>
        <Text style={styles.button}>Go to main</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    fontSize: 40,
    color: "black",
    fontFamily: "Baloo2-ExtraBold"
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "black",
  },
});

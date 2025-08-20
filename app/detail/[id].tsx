import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function DetailScreen() {
  const { id } = useLocalSearchParams(); // gets [id] from the route
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detail screen</Text>

      <Pressable onPress={() => router.back()}>
        <Text style={styles.button}>Go Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "black",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});

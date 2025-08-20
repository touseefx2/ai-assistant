import { StyleSheet, Text, View } from "react-native";

export default function  SettingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Setting screen</Text>
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
    color: "#fff",
  },
});

import type { RootState } from "@/src/state/store";
import { useAppSelector } from "@/src/state/useStoreHooks";
import { ThemeTokens, getThemeTokens } from "@/src/theme/tokens";
import { router } from "expo-router";
import { Image, Modal, Pressable, StyleSheet, Text } from "react-native";

interface SuccessModal {
  isVisible: boolean;
}

export default function SuccessModal({ isVisible }: SuccessModal) {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const themeColors = getThemeTokens(theme);
  const styles = createStyles(themeColors);

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      presentationStyle="fullScreen"
    >
      <Pressable style={styles.successContainer} onPress={() => { router.replace("/(main)/(drawer)");}}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/success.png")}
        />
        <Text
          className="font-bold"
          style={styles.successText}
        >{`You’re all set, Steve Smith`}</Text>
      </Pressable>
    </Modal>
  );
}

const createStyles = (theme: ThemeTokens) =>
  StyleSheet.create({
    successContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
    
    },
    image: {
      resizeMode:"contain",
      width: 120,
      height: 120,
    },
    successText: {
      fontSize: 22,
      color: theme.text,
    },
  });

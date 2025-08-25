import {
  AppleIcon,
  BubbleIcon,
  CalendarIcon,
  ChecklistIcon,
  GoogleIcon,
  UserGearIcon,
} from "@/assets/icons/Icons";
import VideoModal from "@/components/VideoModal";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { RootState } from "../../src/state/store";
import { useAppSelector } from "../../src/state/useStoreHooks";
import { ThemeTokens, getThemeTokens } from "../../src/theme/tokens";

export default function WelcomeScreen() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const themeColors = getThemeTokens(theme);
  const { height } = Dimensions.get("window");
  const topMargin = 0.2;
  const styles = createWelcomeStyles(themeColors);

  // Video modal state
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);

  return (
    <View className="flex-1" style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1"
      >
        {Platform.OS !== "web" && (
          <View
            style={[styles.headerIconsCon, { top: height * topMargin - 20 }]}
          >
            <BubbleIcon />
            <ChecklistIcon style={{ right: 20, bottom: 25 }} />
          </View>
        )}

        <View
          className="flex-1 items-center justify-between py-12"
          style={{ marginTop: height * topMargin }}
        >
          {/* Brand Image */}
          <Image
            source={require("../../assets/images/splash-icon.png")}
            style={{ width: 258, height: 70 }}
            resizeMode="contain"
            className="px-12"
          />

          {/* Headline */}
          <View className="mt-10 items-center gap-2">
            <Text
              className="text-[26px] font-bold text-center px-12"
              style={styles.text}
            >
              Less stress. More life.
            </Text>
            <Text
              className="text-[16px] font-medium text-center max-w-[400px] px-12"
              style={styles.text}
            >
              Manage your task, time, and {"\n"} talk right here.
            </Text>

            {Platform.OS !== "web" && (
              <View style={styles.footerIconsCon}>
                <UserGearIcon />
                <CalendarIcon style={{ top: 25 }} />
              </View>
            )}
          </View>

          {/* Google + Apple Buttons + Demo */}
          <View className="w-full items-center gap-5 px-12">
            {/* Google Button */}
            <Pressable
             onPress={() => router.navigate("/onboarding")}
              // onPress={() => router.replace("/(main)/(drawer)")}
              className="flex-row items-center justify-center w-full max-w-[560px] py-4 rounded-[12px] border"
              style={styles.button}
            >
              <GoogleIcon />
              <Text
                className="ml-3 text-base font-semibold text-[16px]"
                style={styles.text}
              >
                Continue with Google
              </Text>
            </Pressable>

            {/* Apple Button */}
            {(Platform.OS === "ios" || Platform.OS === "web") && (
              <Pressable
                onPress={() => router.replace("/(main)/(drawer)")}
                className="flex-row items-center justify-center w-full max-w-[560px] py-4 rounded-[12px]"
                style={[styles.button, styles.shadow]}
              >
                <AppleIcon />
                <Text
                  className="ml-3 text-base font-semibold text-[16px]"
                  style={styles.text}
                >
                  Continue with Apple
                </Text>
              </Pressable>
            )}

            {/* Watch Demo */}
            <View className="mt-6">
              <Pressable
                className="flex-row items-center"
                onPress={() => setIsVideoModalVisible(true)}
              >
                <Ionicons
                  name="play-outline"
                  size={20}
                  color={themeColors.primary}
                />
                <Text
                  className="ml-2 text-base font-semibold text-[15px]"
                  style={styles.textPrimary}
                >
                  Watch How It Works (30 sec)
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Terms */}
          <View className="mt-10 w-full items-center gap-1 px-12">
            <Text className="text-[14px] font-regular" style={styles.text}>
              By Continuing,
            </Text>
            <Text className="text-[14px] text-center px-4" style={styles.text}>
              You Agree To{" "}
              <Text className="font-semibold" style={styles.textPrimary}>
                Our Terms
              </Text>{" "}
              And{" "}
              <Text className="font-semibold" style={styles.textPrimary}>
                Privacy Policy
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Video Modal */}
      <VideoModal
        isVisible={isVideoModalVisible}
        onClose={() => setIsVideoModalVisible(false)}
        themeColors={themeColors}
      />
    </View>
  );
}

export const createWelcomeStyles = (theme: ThemeTokens) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
    },
    headerIconsCon: {
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      width: "100%",
    },
    footerIconsCon: {
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      width: "100%",
      bottom: 0,
    },
    text: {
      color: theme.text,
    },
    textPrimary: {
      color: theme.primary,
    },
    button: {
      borderWidth: 1,
      borderColor: theme.borderDark,
    },
    shadow: {
      borderColor: theme.border,
      backgroundColor: theme.white,
      ...Platform.select({
        ios: {
          shadowColor: theme.shadowColor,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
        web: {
          boxShadow: "0px 1px 3px rgba(0,0,0,0.12)",
        },
      }),
    },
  });

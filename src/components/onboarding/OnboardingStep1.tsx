import {
  AllIconHelp,
  CalendarIconHelp,
  CmmnctnIconHelp,
  ToDoListHelp,
} from "@/assets/icons/Icons";
import type { RootState } from "@/src/state/store";
import { useAppSelector } from "@/src/state/useStoreHooks";
import { ThemeTokens, getThemeTokens } from "@/src/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function OnboardingStep1() {
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const themeColors = getThemeTokens(theme);
  const styles = createStyles(themeColors);

  const [data, setData] = useState([
    {
      id: 1,
      title: "Calendar",
      description: "Manage your appointments, schedule, and events with ease.",
      isSel: false,
      icon: <CalendarIconHelp />,
    },
    {
      id: 2,
      title: "To-Do List",
      description: "Stay on top of daily tasks and check things off as you go.",
      isSel: false,
      icon: <ToDoListHelp />,
    },
    {
      id: 3,
      title: "Communication",
      description:
        "Send, receive, and manage texts and emails — all in one place.",
      isSel: false,
      icon: <CmmnctnIconHelp />,
    },
    {
      id: 4,
      title: "All of the Above",
      description: "LIFN handles your tasks, time, and talk — seamlessly.",
      isSel: false,
      icon: <AllIconHelp />,
    },
  ]);

  return (
    <View className="flex-1">
        {/* Header */}
        <View className="gap-2 mt-5">
          <Text className="font-semibold" style={styles.title}>
            How I can help you
          </Text>
          <Text className="font-medium" style={styles.subtitle}>
            Choose one or more options to get started with tasks, calendar, or
            communication.
          </Text>
        </View>

        {data.length > 0 && (
          <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
            {data.map((item) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  marginBottom: 14,
                  borderColor: item.isSel
                    ? themeColors.primary
                    : themeColors.borderCheckBox,
                  borderWidth: 1.5,
                  backgroundColor: item.isSel ? "#F4F5FB" : "transparent",
                }}
                onPress={() => {
                  setData((prev) =>
                    prev.map((el) =>
                      el.id === item.id ? { ...el, isSel: !el.isSel } : el
                    )
                  );
                }}
                key={item.id}
                className="flex-row justify-between p-5 rounded-xl border gap-4"
              >
              {/* Left Icon */}
              {item.icon}
              {/* Text content */}
              <View className="flex-1 gap-2">
                <Text
                  className="font-semibold"
                  style={{ fontSize: 17, color: themeColors.text }}
                >
                  {item.title}
                </Text>
                <Text
                  className="font-medium"
                  style={{ fontSize: 15, color: themeColors.subText }}
                >
                  {item.description}
                </Text>
              </View>

              {/* Checkbox */}
              <View
                className="items-center justify-center"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 2,
                  borderWidth: 1.5,
                  borderColor: themeColors.borderCheckBox,
                  backgroundColor: item.isSel
                    ? themeColors.primary
                    : "transparent",
                }}
              >
                {item.isSel && (
                  <Ionicons
                    size={16}
                    name="checkmark-sharp"
                    color={themeColors.white}
                    strokeWidth={3}
                  />
                )}
              </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
    </View>
  );
}

const createStyles = (theme: ThemeTokens) =>
  StyleSheet.create({
    title: {
      color: theme.text,
      fontSize: 22,
    },
    subtitle: {
      color: theme.subText,
      fontSize: 16,
    },
  });

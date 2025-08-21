import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

export default function WelcomeScreen() {
  const { t } = useTranslation();
  return (
    <View className="flex-1 bg-app items-center justify-center gap-4">
      <Text className="text-4xl font-extrabold text-app">{t('welcome')}</Text>
      <Pressable onPress={() => router.replace("/(main)/(drawer)")}>
        <Text className="text-lg underline text-app">{t('dashboard')}</Text>
      </Pressable>
    </View>
  );
}


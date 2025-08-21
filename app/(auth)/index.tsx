// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useTranslation } from "react-i18next";
// import { Image, Pressable, Text, View } from "react-native";
// import type { RootState } from "../../src/state/store";
// import { useAppSelector } from "../../src/state/useStoreHooks";
// import { getThemeTokens } from "../../src/theme/tokens";

// export default function WelcomeScreen() {
//   const { t } = useTranslation();
//   const theme = useAppSelector((s: RootState) => s.theme.current);
//   const tokens = getThemeTokens(theme);
//   return (
//     <View className={`flex-1 ${tokens.bgClass}`}>

 
//       <View className="flex-1 items-center p-12 mt-20 justify-between">
//         {/* Brand Image */}

//         <Image
//           source={require("../../assets/images/splash-icon.png")}
//           className="w-full max-w-[258px] h-auto"
//           resizeMode="contain"
//         />


//         {/* Headline */}
//         <View>
//           <Text className="text-2xl font-semibold text-slate-800 mb-2">Less stress. More life.</Text>
//           <Text className="text-base text-slate-500 text-center mb-12 w-11/12">
//             Manage your task, time, and{"\n"}talk right here.
//           </Text>
//         </View>


//         <View>
//           {/* Google Button */}
//           <Pressable
//             onPress={() => router.replace("/(main)/(drawer)")}
//             className="flex-row items-center justify-center w-full max-w-[560px] h-14 rounded-2xl bg-white shadow-md border border-slate-200"
//           >
//             <Ionicons name="logo-google" size={20} color="#EA4335" />
//             <Text className="ml-3 text-slate-700 text-base font-medium">Continue with Google</Text>
//           </Pressable>

//           {/* Watch demo */}
//           <View className="mt-6">
//             <Pressable className="flex-row items-center">
//               <Ionicons name="play-circle-outline" size={18} color={tokens.palette?.primary ?? '#335DCC'} />
//               <Text className="ml-2" style={{ color: tokens.palette?.primary ?? '#335DCC' }}>Watch How It Works (30 sec)</Text>
//             </Pressable>
//           </View>
//         </View>



//         {/* Terms */}
//         <View className="w-full items-center">
//           <Text className="text-slate-400 text-sm mb-2">By Continuing,</Text>
//           <Text className="text-slate-400 text-sm">
//             You Agree To <Text className="text-[#335DCC]">Our Terms</Text> And <Text className="text-[#335DCC]">Privacy Policy</Text>
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// }



import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import type { RootState } from "../../src/state/store";
import { useAppSelector } from "../../src/state/useStoreHooks";
import { getThemeTokens } from "../../src/theme/tokens";

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const theme = useAppSelector((s: RootState) => s.theme.current);
  const tokens = getThemeTokens(theme);

  return (
    <View className={`flex-1 ${tokens.bgClass}`}>
      {/* ScrollView helps on smaller screens */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1"
      >
        <View className="flex-1 items-center mt-10 justify-between px-6 py-12 md:px-12 lg:px-24">
          
          {/* Brand Image */}
          <Image
            source={require("../../assets/images/splash-icon.png")}
            className="w-full max-w-[258px] h-auto"
            resizeMode="contain"
          />

          {/* Headline */}
          <View className="mt-10 items-center">
            <Text className="text-2xl md:text-3xl font-semibold text-slate-800 text-center mb-2">
              Less stress. More life.
            </Text>
            <Text className="text-base md:text-lg text-slate-500 text-center mb-12 max-w-[400px]">
              Manage your task, time, and {"\n"} talk right here.
            </Text>
          </View>

          {/* Google Button + Demo */}
          <View className="w-full items-center">
            {/* Google Button */}
            <Pressable
              onPress={() => router.replace("/(main)/(drawer)")}
              className="flex-row items-center justify-center w-full max-w-[560px] h-14 rounded-2xl bg-white shadow-md border border-slate-200"
            >
              <Ionicons name="logo-google" size={20} color="#EA4335" />
              <Text className="ml-3 text-slate-700 text-base font-medium">
                Continue with Google
              </Text>
            </Pressable>

            {/* Watch Demo */}
            <View className="mt-6">
              <Pressable className="flex-row items-center">
                <Ionicons
                  name="play-circle-outline"
                  size={18}
                  color={tokens.palette?.primary ?? "#335DCC"}
                />
                <Text
                  className="ml-2"
                  style={{ color: tokens.palette?.primary ?? "#335DCC" }}
                >
                  Watch How It Works (30 sec)
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Terms */}
          <View className="mt-10 w-full items-center">
            <Text className="text-slate-400 text-sm mb-2">By Continuing,</Text>
            <Text className="text-slate-400 text-sm text-center px-4">
              You Agree To <Text className="text-[#335DCC]">Our Terms</Text> And{" "}
              <Text className="text-[#335DCC]">Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

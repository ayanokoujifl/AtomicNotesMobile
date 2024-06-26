import { Loading } from "@/components/Loading"
import {
  FiraCode_300Light,
  FiraCode_400Regular,
  FiraCode_500Medium,
  FiraCode_600SemiBold,
  FiraCode_700Bold,
  useFonts,
} from "@expo-google-fonts/fira-code"
import { Slot } from "expo-router"
import {
  AlarmClockCheck,
  AlarmClockMinus,
  AlarmClockOff,
  CheckCircle2,
  XCircle,
} from "lucide-react-native"
import { SafeAreaView, StatusBar, Text, View } from "react-native"
import { ToastProvider } from "react-native-toast-notifications"
import colors from "tailwindcss/colors"
import "../global.css"
import { useEffect } from "react"

export default function Layout() {
  const [fontsLoaded] = useFonts({
    FiraCode_300Light,
    FiraCode_400Regular,
    FiraCode_500Medium,
    FiraCode_600SemiBold,
    FiraCode_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

 

  return (
    <ToastProvider
      renderType={{
        success: (toast) => (
          <View className="bg-gray-200 px-8 py-4 rounded-md flex-row gap-4 items-center">
            <CheckCircle2 size={24} color={colors.emerald[500]} />
            <Text className="font-stronger text-slate-900 text-lg">
              {toast.message}
            </Text>
          </View>
        ),
        error: (toast) => (
          <View className="bg-gray-200 px-8 py-4 rounded-md flex-row gap-4 items-center">
            <XCircle size={24} color={colors.red[500]} />
            <Text className="font-stronger text-slate-900 text-lg">
              {toast.message}
            </Text>
          </View>
        ),
        scheduleCreated: (toast) => (
          <View className="bg-gray-200 px-8 py-4 rounded-md flex-row gap-4 items-center">
            <AlarmClockCheck
              size={24}
              color={colors.emerald[500]}
              absoluteStrokeWidth
              strokeWidth={3}
            />
            <Text className="font-stronger text-slate-900 text-lg">
              {toast.message}
            </Text>
          </View>
        ),
        scheduleDeleted: (toast) => (
          <View className="bg-gray-200 px-8 py-4 rounded-md flex-row gap-4 items-center">
            <AlarmClockMinus
              size={24}
              color={colors.red[500]}
              absoluteStrokeWidth
              strokeWidth={3}
            />
            <Text className="font-stronger text-slate-900 text-lg">
              {toast.message}
            </Text>
          </View>
        ),
        scheduleUpdated: (toast) => (
          <View className="bg-gray-200 px-8 py-4 rounded-md flex-row gap-4 items-center">
            <AlarmClockCheck
              size={24}
              color={colors.amber[500]}
              absoluteStrokeWidth
              strokeWidth={3}
            />
            <Text className="font-stronger text-slate-900 text-lg">
              {toast.message}
            </Text>
          </View>
        ),
        scheduleError: (toast) => (
          <View className="bg-gray-200 px-8 py-4 rounded-md flex-row gap-4 items-center">
            <AlarmClockOff size={24} color={colors.red[500]} />
            <Text className="font-stronger text-slate-900 text-lg">
              {toast.message}
            </Text>
          </View>
        ),
      }}
    >
      <SafeAreaView className="flex-1 pt-10 bg-slate-900">
        <StatusBar
          backgroundColor={"transparent"}
          translucent
          barStyle={"light-content"}
        />
        <Slot />
      </SafeAreaView>
    </ToastProvider>
  )
}

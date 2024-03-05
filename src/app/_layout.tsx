import { Slot } from "expo-router"
import "../global.css"
import {
  useFonts,
  FiraCode_300Light,
  FiraCode_400Regular,
  FiraCode_500Medium,
  FiraCode_600SemiBold,
  FiraCode_700Bold,
} from "@expo-google-fonts/fira-code"
import { Loading } from "@/components/Loading"
import { SafeAreaView, StatusBar } from "react-native"

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
    <SafeAreaView className="flex-1 bg-slate-900 pt-10">
      <StatusBar
        backgroundColor={"transparent"}
        translucent
        barStyle={"light-content"}
      />
      <Slot />
    </SafeAreaView>
  )
}

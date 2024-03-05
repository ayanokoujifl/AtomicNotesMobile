import { ActivityIndicator, View } from "react-native"
import colors from "tailwindcss/colors"

export function Loading() {
  return (
    <View className="flex-1 bg-slate-900 justify-center items-center">
      <ActivityIndicator size={56} color={colors.lime[400]} />
    </View>
  )
}

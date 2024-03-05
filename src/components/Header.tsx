import { Image, Linking, Pressable, Text, View } from "react-native"
import Logo from "../assets/icon.png"

export function Header() {
  return (
    <View className="flex flex-row items-center justify-center gap-2 pt-4 pb-5">
      <Pressable
        onPress={async () =>
          await Linking.openURL("https://instagram.com/dev_atomic_journey")
        }
        className=" flex-1 flex-row items-center justify-center gap-2"
      >
        <View className="flex items-center justify-center size-10 bg-slate-400 rounded-full active:bg-lime-400">
          <Image
            source={Logo}
            alt="Atomic"
            resizeMode="contain"
            className="size-8"
          />
        </View>
        <Text className="text-slate-200 font-stronger text-3xl text-center items-center justify-center">
          Atomic Notes
        </Text>
      </Pressable>
    </View>
  )
}

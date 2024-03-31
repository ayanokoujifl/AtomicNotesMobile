import { View } from "react-native"
import { Button } from "./Button"
import { Network } from "lucide-react-native"
import colors from "tailwindcss/colors"

export function Notification() {
  return (
    <View className="flex-1 items-center justify-center px-4">
      <View className="h-24 w-full">
        <Button.Root>
          <Button.Icon icon={Network} size={24} color={colors.violet[500]} />
          <Button.Content>Testando notificações</Button.Content>
        </Button.Root>
      </View>
    </View>
  )
}

import { Button } from "@/components/Button"
import { Calendar } from "@/components/Calendar"
import { Header } from "@/components/Header"
import { Link } from "expo-router"
import { AlarmClockPlus, NotebookPen } from "lucide-react-native"
import { View } from "react-native"
import colors from "tailwindcss/colors"

export default function Home() {
  return (
    <View className="flex-1">
      <Header />
      <Calendar />
      <View className="mx-4">
        <Link href={"/notes"} asChild>
          <Button.Root>
            <Button.Icon icon={NotebookPen} color={colors.lime[400]} />
            <Button.Content>Notas</Button.Content>
          </Button.Root>
        </Link>
        <Button.Root>
          <Button.Icon icon={AlarmClockPlus} color={colors.lime[400]} />
          <Button.Content>Lembretes</Button.Content>
        </Button.Root>
      </View>
    </View>
  )
}

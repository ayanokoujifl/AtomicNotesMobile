import { Button } from "@/components/Button"
import { Header } from "@/components/Header"
import { SaveSchedule } from "@/components/Schedule/SaveSchedule"
import { ScheduleCard } from "@/components/Schedule/ScheduleCard"
import { AlarmClockPlus, Watch } from "lucide-react-native"
import { useEffect, useState } from "react"
import { ScrollView, StatusBar, Text, View } from "react-native"
import colors from "tailwindcss/colors"

export type ScheduleProps = {
  uuid: string
  title: string
  schedule: Date
  rate: number
  createdAt: Date
}

export const RATES = [
  { key: 0, value: "Baixa" },
  { key: 1, value: "Média" },
  { key: 2, value: "Normal" },
  { key: 3, value: "Alta" },
  { key: 4, value: "Muito alta" },
]

export default function Schedules() {
  const [schedules, setSchedules] = useState<ScheduleProps[]>([])
  const [isVisible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  async function getSchedules() {
    const response: ScheduleProps[] = await fetch(
      `http://192.168.0.6:8080/schedules`
    ).then((response) => response.json())
    setSchedules(response)
  }

  useEffect(() => {
    getSchedules()
  }, [schedules])

  return (
    <View className="flex-1 px-4 pt-10 bg-slate-900">
      <StatusBar translucent />
      <Header />
      <View className="flex-1">
        <View className="flex-row">
          <Button.Root
            className="bg-slate-800 flex-row justify-center min-h-24 p-4  gap-3 flex-1 items-center rounded-md active:bg-slate-950 mb-4 border-2 border-lime-400 active:border-slate-600"
            onPress={showModal}
          >
            <Button.Icon
              icon={AlarmClockPlus}
              size={32}
              color={colors.slate[400]}
            />
            <Button.Content className="font-stronger text-center text-lg flex-1 text-slate-200">
              Adicionar lembrete
            </Button.Content>
          </Button.Root>
        </View>
        <ScrollView className="pb-10 flex-1">
          <View className="flex-row items-center gap-2 mb-4">
            <Watch size={16} color={colors.lime[300]} />
            <Text className="text-slate-200 font-stronger text-xl">
              Lembretes:
            </Text>
          </View>
          {schedules.length <= 0 ? (
            <ScheduleCard />
          ) : (
            schedules.map((schedule) => {
              return <ScheduleCard key={schedule.uuid} schedule={schedule} />
            })
          )}
        </ScrollView>
      </View>
      <SaveSchedule isVisible={isVisible} onHide={hideModal} rates={RATES} />
    </View>
  )
}

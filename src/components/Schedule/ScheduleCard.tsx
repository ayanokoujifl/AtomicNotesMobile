import { ScheduleProps } from "@/app/(tabs)/schedules"
import { AlarmClock } from "lucide-react-native"
import { Text } from "react-native"
import colors from "tailwindcss/colors"
import { Button } from "../Button"
import { ScheduleInfo } from "./ScheduleInfo"
import { useState } from "react"

type ScheduleCardProps = {
  schedule?: ScheduleProps
}

export function ScheduleCard({ schedule }: ScheduleCardProps) {
  if (!schedule) {
    return (
      <Text className="text-slate-400 bg-slate-700 px-5 py-3 rounded-md  active:bg-slate-600">
        Lembretes vazios...
      </Text>
    )
  }

  const [isInfoVisible, setInfoVisible] = useState(false)
  const showInfo = () => setInfoVisible(true)
  const hideInfo = () => setInfoVisible(false)

  return (
    <>
      <Button.Root onPress={showInfo}>
        <Button.Icon icon={AlarmClock} color={colors.slate[400]} />
        <Button.Content>{schedule.title}</Button.Content>
      </Button.Root>
      <ScheduleInfo
        isVisible={isInfoVisible}
        onHide={hideInfo}
        schedule={schedule}
      />
    </>
  )
}

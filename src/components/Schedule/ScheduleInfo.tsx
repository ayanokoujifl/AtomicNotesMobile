import { ScheduleProps } from "@/app/(tabs)/schedules"
import {
  AlarmClockMinus,
  PenBox,
  TimerReset,
  Trash2,
  X,
} from "lucide-react-native"
import { useState } from "react"
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native"
import colors from "tailwindcss/colors"
import { Button } from "../Button"

type ScheduleInfoProps = {
  isVisible: boolean
  onHide: () => void
  schedule: ScheduleProps
}

export function ScheduleInfo({
  isVisible,
  onHide,
  schedule,
}: ScheduleInfoProps) {
  const [isPressedDelete, setPressedDelete] = useState(false)
  const [isPressedEdit, setPressedEdit] = useState(false)
  const changePressedDeleteFalse = () => setPressedDelete(false)
  const changePressedDeleteTrue = () => setPressedDelete(true)
  const changePressedEditTrue = () => setPressedEdit(true)
  const changePressedEditFalse = () => setPressedEdit(false)

  function formatDate(date: Date) {
    if (date) {
      const newDate = new Date(date)
      const dateFormatted: string =
        String(newDate.getDate()).padStart(2, "0") +
        "/" +
        String(newDate.getMonth()).padStart(2, "0") +
        "/" +
        String(newDate.getFullYear())
      return dateFormatted
    } else {
      return "Horário não informado"
    }
  }

  function formatTime(date: Date) {
    if (date) {
      const newDate = new Date(date)
      const timeFormatted: string =
        newDate.getHours() + ":" + newDate.getMinutes()
      return timeFormatted
    }
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      statusBarTranslucent
      transparent
    >
      <TouchableWithoutFeedback onPressOut={onHide}>
        <View className="flex-1 flex-row justify-center items-center">
          <View className="p-5 bg-gray-800 rounded-md border-2 border-lime-500">
            <View className="flex-row justify-between gap-4 mb-8">
              <Text className="font-stronger text-slate-200 text-lg" selectable>
                {schedule.title}
              </Text>
              <X
                size={24}
                color={colors.slate[400]}
                absoluteStrokeWidth
                strokeWidth={4}
              />
            </View>
            <View>
              <Text className="text-slate-400 text-base font-base">
                Data e hora do lembrete:
              </Text>
              <View className="flex-row">
                <Text className="text-slate-300 font-base">
                  {formatDate(schedule.schedule)}
                </Text>
                <Text className="text-lime-400 font-stronger text-lg">
                  {" -> " + formatTime(schedule.schedule)}
                </Text>
              </View>
            </View>
            <View className="flex-row mt-10 gap-10 justify-center">
              <Button.Root
                className="bg-slate-800 size-16 flex-row justify-center p-4 items-center rounded-full active:bg-slate-950 mb-4 border-2 border-lime-400 active:border-slate-600"
                onPressIn={changePressedEditTrue}
                onPressOut={changePressedEditFalse}
              >
                <Button.Icon
                  icon={TimerReset}
                  size={isPressedEdit ? 28 : 24}
                  color={isPressedEdit ? colors.yellow[400] : colors.slate[400]}
                />
              </Button.Root>
              <Button.Root
                className="bg-slate-800 size-16 flex-row justify-center p-4 items-center rounded-full active:bg-slate-950 mb-4 border-2 border-lime-400 active:border-slate-600"
                onPressIn={changePressedDeleteTrue}
                onPressOut={changePressedDeleteFalse}
              >
                <Button.Icon
                  icon={AlarmClockMinus}
                  size={isPressedDelete ? 28 : 24}
                  color={isPressedDelete ? colors.red[500] : colors.slate[400]}
                />
              </Button.Root>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

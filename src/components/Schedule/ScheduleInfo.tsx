import { RATES, ScheduleProps } from "@/app/(tabs)/schedules"
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
import { deleteSchedule } from "@/api/deleSchedule"
import { useToast } from "react-native-toast-notifications"
import { DeleteModal } from "./DeleteModal"
import { EditModal } from "./EditModal"

type ScheduleInfoProps = {
  isVisible: boolean
  onHide: () => void
  schedule: ScheduleProps
  rates: { key: number; value: string }[]
}

export function ScheduleInfo({
  isVisible,
  onHide,
  schedule,
  rates,
}: ScheduleInfoProps) {
  const [isPressedDelete, setPressedDelete] = useState(false)
  const [isPressedEdit, setPressedEdit] = useState(false)
  const changePressedDeleteFalse = () => setPressedDelete(false)
  const changePressedDeleteTrue = () => setPressedDelete(true)
  const changePressedEditTrue = () => setPressedEdit(true)
  const changePressedEditFalse = () => setPressedEdit(false)

  const [isVisibleDeleteModal, setVisibleDeleteModal] = useState(false)
  const showDeleteModal = () => setVisibleDeleteModal(true)
  const hideDeleteModal = () => setVisibleDeleteModal(false)

  const [isVisibleEditModal, setVisibleEditModal] = useState(false)
  const showEditModal = () => setVisibleEditModal(true)
  const hideEditModal = () => setVisibleEditModal(false)

  function formatDate(date: Date) {
    if (date) {
      const newDate = new Date(date)
      const dateFormatted: string =
        String(newDate.getDate()).padStart(2, "0") +
        "/" +
        String(newDate.getMonth() + 1).padStart(2, "0") +
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
        String(newDate.getHours()).padStart(2, "0") +
        ":" +
        String(newDate.getMinutes()).padStart(2, "0")
      return timeFormatted
    } else {
      return ""
    }
  }

  return (
    <>
      <Modal
        visible={isVisible}
        animationType="slide"
        statusBarTranslucent
        transparent
      >
        <TouchableWithoutFeedback onPressOut={onHide}>
          <View className="flex-1 flex-row justify-center items-center">
            <View className="p-5 bg-gray-800 rounded-md border-2 border-lime-500">
              <View className="mb-8">
                <View className="flex-row justify-between gap-4">
                  <Text
                    className="font-stronger text-lime-400 text-lg"
                    selectable
                  >
                    {schedule.title}
                  </Text>
                  <X
                    size={24}
                    color={colors.slate[400]}
                    absoluteStrokeWidth
                    strokeWidth={4}
                  />
                </View>
                <Text className="text-slate-400 text-sm">
                  Urgência{" -> " + schedule.rate}
                </Text>
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
                    {formatTime(schedule.schedule)
                      ? " -> " + formatTime(schedule.schedule)
                      : ""}
                  </Text>
                </View>
              </View>
              <View className="flex-row mt-10 gap-10 justify-center">
                <Button.Root
                  className="bg-slate-800 size-16 flex-row justify-center p-4 items-center rounded-full active:bg-slate-950 mb-4 border-2 border-lime-400 active:border-slate-600"
                  onPressIn={changePressedEditTrue}
                  onPressOut={changePressedEditFalse}
                  onPress={showEditModal}
                >
                  <Button.Icon
                    icon={TimerReset}
                    size={isPressedEdit ? 28 : 24}
                    color={
                      isPressedEdit ? colors.yellow[400] : colors.slate[400]
                    }
                  />
                </Button.Root>
                <Button.Root
                  className="bg-slate-800 size-16 flex-row justify-center p-4 items-center rounded-full active:bg-slate-950 mb-4 border-2 border-lime-400 active:border-slate-600"
                  onPressIn={changePressedDeleteTrue}
                  onPressOut={changePressedDeleteFalse}
                  onPress={showDeleteModal}
                >
                  <Button.Icon
                    icon={AlarmClockMinus}
                    size={isPressedDelete ? 28 : 24}
                    color={
                      isPressedDelete ? colors.red[500] : colors.slate[400]
                    }
                  />
                </Button.Root>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <DeleteModal
        isVisible={isVisibleDeleteModal}
        onHide={hideDeleteModal}
        schedule={schedule}
      />
      <EditModal
        isVisible={isVisibleEditModal}
        onHide={hideEditModal}
        rates={rates}
        schedule={schedule}
      />
    </>
  )
}

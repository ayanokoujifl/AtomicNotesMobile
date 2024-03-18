import { RATES, ScheduleProps } from "@/app/(tabs)/schedules"
import { DatePicker } from "@/lib/date-time-picker/DatePicker"
import { ChevronDown, MessageCircleCode, Pin, X } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import colors from "tailwindcss/colors"
import { Button } from "../Button"
import { Input } from "../Input"
import { SaveScheduleRequestProps } from "./SaveSchedule"

type EditModalProps = {
  rates: { key: number; value: string }[]
  isVisible: boolean
  onHide: () => void
  schedule: ScheduleProps
}

export function EditModal({
  isVisible,
  onHide,
  rates,
  schedule,
}: EditModalProps) {
  const { control, handleSubmit, reset, getValues } =
    useForm<SaveScheduleRequestProps>()
  function handleEditSchedule() {}

  return (
    <Modal
      visible={isVisible}
      transparent
      statusBarTranslucent
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onHide}>
        <View className=" flex flex-1 justify-center items-center">
          <View className=" bg-gray-800 w-3/4 p-4 border-2 border-lime-600 rounded-lg shadow-3xl">
            <View className="items-end">
              <X
                size={24}
                absoluteStrokeWidth
                strokeWidth={4}
                color={colors.slate[400]}
              />
            </View>
            <Text className="text-lg font-stronger text-slate-200 mb-4">
              Adicionar lembrete:
            </Text>
            <View className="gap-2">
              <Input
                control={control}
                icon={MessageCircleCode}
                name="title"
                placeholder="Type a title"
                value={schedule.title ? schedule.title : ""}
              />
              <Controller
                name="rate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectList
                    setSelected={(value: number) => {
                      onChange(value)
                    }}
                    data={rates}
                    save="key"
                    placeholder="Pick a rate"
                    search={false}
                    maxHeight={196}
                    closeicon={<X size={24} color={colors.slate[400]} />}
                    arrowicon={
                      <ChevronDown size={24} color={colors.slate[400]} />
                    }
                    boxStyles={{
                      borderWidth: 2,
                      borderColor: colors.lime[600],
                      borderRadius: 6,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                    inputStyles={{
                      color: colors.slate[400],
                    }}
                    dropdownStyles={{
                      borderWidth: 2,
                      borderColor: colors.lime[500],
                      width: "100%",
                    }}
                    dropdownTextStyles={{
                      color: colors.slate[200],
                    }}
                  />
                )}
              />
              <Controller
                name="schedule"
                control={control}
                render={({ field: { onChange } }) => (
                  <DatePicker
                    dateTimeChanged={(dateTime) => {
                      onChange(dateTime)
                    }}
                  />
                )}
              />
              <Button.Root
                className="bg-slate-700 p-4 flex-row gap-3 items-center rounded-md active:bg-slate-950"
                onPress={handleSubmit(handleEditSchedule)}
              >
                <Button.Icon icon={Pin} size={24} color={colors.lime[500]} />
                <Button.Content>Salvar nota</Button.Content>
              </Button.Root>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

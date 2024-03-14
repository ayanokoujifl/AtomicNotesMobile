import { saveSchedule } from "@/api/saveSchedule"
import {
  ChevronDown,
  ListTodo,
  MessageCircleCode,
  NotebookPen,
  Pin,
  X,
} from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import { useToast } from "react-native-toast-notifications"
import colors from "tailwindcss/colors"
import { Button } from "../Button"
import { Input } from "../Input"

type SaveScheduleProps = {
  isVisible: boolean
  onHide: () => void
  rates: { key: number; value: string }[]
}

export type SaveScheduleRequestProps = {
  title: string
  rate: number
  time: Date
}

export function SaveSchedule({ isVisible, onHide, rates }: SaveScheduleProps) {
  const { control, handleSubmit, reset } = useForm<SaveScheduleRequestProps>()

  const toast = useToast()

  async function handleSaveSchedule(data: SaveScheduleRequestProps) {
    const body: SaveScheduleRequestProps = {
      title: data.title ? data.title : "TESTE",
      rate: data.rate ? data.rate : 0,
      time: data.time ? data.time : new Date(),
    }
    const response = await saveSchedule(body)
    if (response?.status === 201) {
      toast.show("Lembrete criado!", { type: "scheduleCreated" })
    } else {
      toast.show("Falha na criação de lembrete", { type: "error" })
    }
    onHide()
    reset()
  }

  return (
    <Modal visible={isVisible} transparent animationType="fade">
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

              <Button.Root
                className="bg-slate-700 p-4 flex-row gap-3 items-center rounded-md active:bg-slate-950"
                onPress={handleSubmit(handleSaveSchedule)}
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

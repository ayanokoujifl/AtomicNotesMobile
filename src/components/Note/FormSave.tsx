import { saveNote } from "@/api/saveNote"
import { ChevronDown, ListTodo, NotebookPen, Pin, X } from "lucide-react-native"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import colors from "tailwindcss/colors"
import { Button } from "../Button"
import { Input } from "../Input"
import { FormData } from "./FormNote"

type FormSaveNoteProps = {
  isVisible: boolean
  onHide: () => void
  categories: { value: string; key: number }[]
}

export type SaveNoteRequestProps = {
  title: string
  content: string
  category: number
  isRead: boolean
}

export function FormSave({ isVisible, onHide, categories }: FormSaveNoteProps) {
  const { control, handleSubmit, reset } = useForm<FormData>()

  const handleSaveNote = async (data: FormData) => {
    const body: SaveNoteRequestProps = {
      title: data.title || "",
      category: data.category ? data.category : 6,
      content: data.content || "",
      isRead: false,
    }
    saveNote(body)
    reset()
    onHide()
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
              Adicionar nota:
            </Text>
            <View className="gap-2">
              <Input
                control={control}
                icon={NotebookPen}
                name="title"
                placeholder="Type a title"
              />
              <Controller
                name="category"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectList
                    setSelected={(value: number) => {
                      onChange(value)
                    }}
                    data={categories}
                    save="key"
                    placeholder="Pick a category"
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

                  /*   <Select
                    onValueChange={onChange}
                    value={value}
                    placeholder={{
                      label: "Categoria",
                      color: colors.slate[400],
                    }}
                    items={items}
                    Icon={() => {
                      return <ChevronDown size={24} color={colors.slate[400]} />
                    }}
                    style={{
                      inputAndroid: {
                        color: colors.slate[200],
                      },
                      placeholder: {
                        color: colors.slate[500],
                      },
                      inputAndroidContainer: {
                        borderWidth: 2,
                        borderColor: colors.lime[600],
                        borderRadius: 4,
                        padding: 10,
                        justifyContent: "center",
                      },
                    }}
                    useNativeAndroidPickerStyle={false}
                    modalProps={{
                      style: {
                        backgroundColor: colors.lime[500],
                      },
                      presentationStyle: "fullScreen",
                    }}
                  />
                */
                )}
              />

              <Input
                name="content"
                control={control}
                icon={ListTodo}
                multiline
                placeholder="Type a description for your note"
                numberOfLines={4}
              />
              <Button.Root
                className="bg-slate-700 p-4 flex-row gap-3 items-center rounded-md active:bg-slate-950"
                onPress={handleSubmit(handleSaveNote)}
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

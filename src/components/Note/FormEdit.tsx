import { updateNote } from "@/api/editNote"
import { NoteProps } from "@/app/(tabs)/notes"
import {
  boxStyles,
  dropdownStyles,
  dropdownTextStyles,
  inputStyles,
} from "@/select.styles"
import { ChevronDown, ListTodo, NotebookPen, Pin, X } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"
import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import { useToast } from "react-native-toast-notifications"
import colors from "tailwindcss/colors"
import { Button } from "../Button"
import { FormData, SaveNoteRequestProps } from "./FormNote"
import { Input } from "../Input"

type FormEditProps = {
  isVisible: boolean
  onHide: () => void
  note: NoteProps
  categories: { key: number; value: string }[]
}

export function FormEdit({
  isVisible,
  onHide,
  note,
  categories,
}: FormEditProps) {
  const toast = useToast()

  const { control, handleSubmit, reset, getValues } = useForm<FormData>()

  async function handleEditNote(body: SaveNoteRequestProps, uuid: string) {
    console.log(body.category)
    const response = await updateNote(body, uuid)
    if (response?.status === 204) {
      toast.show("Edição de nota concluída", { type: "success" })
    }
    onHide()
    reset()
  }

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onHide}>
        <View className=" flex flex-1 justify-center items-center">
          <View className=" bg-gray-800 w-3/4 p-4 border-2 border-lime-600 rounded-lg shadow-3xl">
            <Pressable className="items-end" onPress={onHide}>
              <X
                size={24}
                absoluteStrokeWidth
                strokeWidth={4}
                color={colors.slate[400]}
              />
            </Pressable>
            <Text className="text-lg font-stronger text-slate-200 mb-4">
              Editar nota:
            </Text>
            <View className="gap-2">
              <Input
                control={control}
                icon={NotebookPen}
                name="title"
                placeholder="Type a title"
                defaultValue={note.title}
              />
              <Controller
                name="category"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <SelectList
                    setSelected={(val: number) => onChange(val)}
                    data={categories}
                    save="key"
                    onSelect={() =>
                      console.log("Categoria selecionada " + value)
                    }
                    placeholder="Pick a category"
                    search={false}
                    maxHeight={196}
                    closeicon={<X size={24} color={colors.slate[400]} />}
                    arrowicon={
                      <ChevronDown size={24} color={colors.slate[400]} />
                    }
                    boxStyles={boxStyles}
                    inputStyles={inputStyles}
                    dropdownStyles={dropdownStyles}
                    dropdownTextStyles={dropdownTextStyles}
                  />
                )}
              />

              <Input
                name="content"
                control={control}
                icon={ListTodo}
                multiline
                placeholder="Type a description for your note"
                numberOfLines={4}
                defaultValue={note.content}
              />
              <Button.Root
                className="bg-slate-700 p-4 flex-row gap-3 items-center rounded-md active:bg-slate-950"
                onPress={handleSubmit((e) =>
                  handleEditNote(
                    {
                      title: e.title ? e.title : note.title,
                      content: e.content ? e.content : note.content,
                      category: e.category,
                      isRead: false,
                    },
                    note.uuid
                  )
                )}
              >
                <Button.Icon icon={Pin} size={24} color={colors.lime[500]} />
                <Button.Content>Editar nota</Button.Content>
              </Button.Root>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

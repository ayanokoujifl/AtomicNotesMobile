import { NoteProps } from "@/app/(tabs)/notes"
import { NotepadText, PenBox, Trash2, X } from "lucide-react-native"
import { useState } from "react"
import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import colors from "tailwindcss/colors"
import { Button } from "../Button"
import { DeleteModal } from "./DeleteModal"
import { FormNote } from "./FormNote"

type NoteParentProps = {
  note?: NoteProps
}

export function NoteCard({ note }: NoteParentProps) {
  if (!note) {
    return (
      <Text className="text-slate-400 bg-slate-700 px-5 py-3 rounded-md  active:bg-slate-600">
        Notas vazias...
      </Text>
    )
  }

  const [isVisible, setVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [isEditModalVisible, setEditModalVisible] = useState(false)

  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)

  const hideDeleteModal = () => setDeleteModalVisible(false)

  const hideEditModalVisible = () => setEditModalVisible(false)

  return (
    <>
      <Button.Root onPress={showDialog}>
        <Button.Icon icon={NotepadText} color={colors.slate[400]} />
        <Button.Content>{note.title}</Button.Content>
      </Button.Root>

      <Modal
        visible={isVisible}
        animationType="slide"
        statusBarTranslucent
        transparent
      >
        <TouchableWithoutFeedback onPress={hideDialog}>
          <View className=" flex flex-1 justify-center items-center">
            <View className="h-96 bg-gray-800 w-3/4 p-4 border-2 border-lime-600 rounded-lg shadow-3xl">
              <Pressable
                onPress={hideDialog}
                className="flex-row justify-end items-start"
              >
                <X
                  size={24}
                  color={colors.slate[400]}
                  strokeWidth={4}
                  onPress={hideDialog}
                />
              </Pressable>
              <View>
                <Text className="text-lime-400 text-xl font-stronger">
                  {note.title}
                </Text>
                <Text className="text-slate-400 font-light text-sm">
                  {note.category} {"-> "}
                  {new Date(note.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <View className="flex-1 flex-row items-center justify-center">
                <Text className="font-base text-lg text-slate-200 text-justify">
                  {note.content}
                </Text>
              </View>
              <View className="flex-row gap-10 justify-center">
                <Button.Root
                  className="bg-slate-800 size-16 flex-row justify-center p-4 items-center rounded-full active:bg-slate-950 mb-4 border-2 border-lime-400"
                  onPress={() => {
                    setEditModalVisible(true)
                  }}
                >
                  <Button.Icon
                    icon={PenBox}
                    size={24}
                    color={colors.slate[400]}
                  />
                </Button.Root>
                <Button.Root
                  className="bg-slate-800 size-16 flex-row justify-center p-4 items-center rounded-full active:bg-slate-950 mb-4 border-2 border-lime-400"
                  onPress={() => setDeleteModalVisible(true)}
                >
                  <Button.Icon
                    icon={Trash2}
                    size={24}
                    color={colors.slate[400]}
                  />
                </Button.Root>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <DeleteModal
        isVisible={deleteModalVisible}
        note={note}
        onHide={hideDeleteModal}
      />
      <FormNote
        type="edit"
        isVisible={isEditModalVisible}
        onHide={hideEditModalVisible}
        note={note}
      />
    </>
  )
}

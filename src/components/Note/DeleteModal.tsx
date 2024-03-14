import { Modal, Text, TouchableWithoutFeedback, View } from "react-native"
import { Button } from "../Button"
import { CheckCircle2, X } from "lucide-react-native"
import colors from "tailwindcss/colors"
import { NoteProps } from "@/app/(tabs)/notes"
import { deleteNote } from "@/api/deleteNote"
import { useToast } from "react-native-toast-notifications"

type DeleteModalProps = {
  isVisible: boolean
  onHide: () => void
  note: NoteProps
}

export function DeleteModal({ isVisible, onHide, note }: DeleteModalProps) {
  const toast = useToast()

  async function handleDeleteNote() {
    if (note) {
      await deleteNote(note.uuid)
      toast.show("Deleção concluída com sucesso", {
        type: "success",
        animationType: "slide-in",
      })
    } else {
      toast.show("Algo deu errado!", { type: "error" })
    }
    onHide()
  }

  return (
    <Modal visible={isVisible} transparent statusBarTranslucent>
      <TouchableWithoutFeedback onPress={onHide}>
        <View className="flex-1 justify-center items-center px-4">
          <View className="bg-gray-800 border-2 border-slate-200 p-4 rounded-md shadow-lg shadow-black">
            <Text className="text-xl text-lime-500 font-stronger mb-4">
              Exclusão de nota
            </Text>
            <View>
              <Text className="text-base text-slate-200 font-semi">
                Tem certeza que deseja excluir sua nota?
              </Text>
            </View>
            <View className="mt-4 flex-row w-full gap-4">
              <Button.Root onPress={onHide}>
                <Button.Content className="text-base text-slate-200 font-light -ml-2 text-center flex-1">
                  Cancelar
                </Button.Content>
                <Button.Icon icon={X} size={20} color={colors.red[600]} />
              </Button.Root>
              <Button.Root onPress={handleDeleteNote}>
                <Button.Content className="text-base text-slate-200 font-light -ml-2 text-center flex-1">
                  Deletar
                </Button.Content>
                <Button.Icon
                  icon={CheckCircle2}
                  size={20}
                  color={colors.emerald[400]}
                />
              </Button.Root>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

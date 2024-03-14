import { NoteProps } from "@/app/(tabs)/notes"
import { FormEdit } from "./FormEdit"
import { FormSave } from "./FormSave"
import { Alert } from "react-native"

type FormNoteProps = {
  type: "save" | "edit"
  isVisible: boolean
  onHide: () => void
  note?: NoteProps
}

export type FormData = {
  title: string
  content: string
  category: number
}

export type SaveNoteRequestProps = {
  title: string
  content: string
  category: number
  isRead: boolean
}

export const CATEGORIES = [
  { value: "Código", key: 0 },
  { value: "Link", key: 1 },
  { value: "Informação", key: 2 },
  { value: "Arquivos", key: 3 },
  { value: "Atomic", key: 4 },
  { value: "Estudo", key: 5 },
  { value: "Outro", key: 6 },
]

export function FormNote({ type, isVisible, onHide, note }: FormNoteProps) {
  if (type === "save") {
    return (
      <FormSave isVisible={isVisible} onHide={onHide} categories={CATEGORIES} />
    )
  }
  if (type === "edit") {
    return (
      <FormEdit
        isVisible={isVisible}
        onHide={onHide}
        note={
          note
            ? note
            : {
                category: 0,
                content: "",
                createdAt: new Date(),
                isRead: false,
                title: "",
                uuid: "",
              }
        }
        categories={CATEGORIES}
      />
    )
  } else {
    Alert.alert("Erro", "Edição impossível")
  }
}

import { SaveNoteRequestProps } from "@/components/FormSave"
import { Alert } from "react-native"

export async function updateNote(body: SaveNoteRequestProps, uuid: string) {
  try {
    const response = await fetch(`http://192.168.0.6:8080/notes/${uuid}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    return response
  } catch (err: any) {
    Alert.alert("Erro de edição", err)
  }
}

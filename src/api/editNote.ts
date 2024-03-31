import { SaveNoteRequestProps } from "@/components/Note/FormSave"
import { Alert } from "react-native"

export async function updateNote(body: SaveNoteRequestProps, uuid: string) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/notes/${uuid}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    )
    return response
  } catch (err: any) {
    Alert.alert("Erro de edição", err)
  }
}

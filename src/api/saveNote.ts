import { SaveNoteRequestProps } from "@/components/Note/FormNote"
import { Alert } from "react-native"

export async function saveNote(body: SaveNoteRequestProps) {
  try {
    const response = await fetch(`http://192.168.0.10:8080/notes`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    return response.json()
  } catch (err: any) {
    Alert.alert(err)
  }
}

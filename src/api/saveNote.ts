import { SaveNoteRequestProps } from "@/components/Note/FormNote"
import { Alert } from "react-native"

export async function saveNote(body: SaveNoteRequestProps) {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/notes`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    return response.json()
  } catch (err: any) {
    Alert.alert(err)
  }
}

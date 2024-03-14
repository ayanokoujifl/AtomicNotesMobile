import { Alert } from "react-native"

export async function deleteNote(uuid: string) {
  try {
    const response: Response = await fetch(
      `http://192.168.0.6:8080/notes/${uuid}`,
      {
        method: "DELETE",
      }
    ).then((response) => response.json())
  } catch (err: any) {
    Alert.alert("Erro", err)
  }
}

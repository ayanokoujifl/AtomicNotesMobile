import { Alert } from "react-native"

export async function deleteNote(uuid: string) {
  try {
    const response: Response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/notes/${uuid}`,
      {
        method: "DELETE",
      }
    ).then((response) => response.json())
  } catch (err: any) {
    Alert.alert("Erro", err)
  }
}

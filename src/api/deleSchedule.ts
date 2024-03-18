import { Alert } from "react-native"

export async function deleteSchedule(uuid: string) {
  try {
    const response: Response = await fetch(
      `http://192.168.0.10:8080/schedules/${uuid}`,
      {
        method: "DELETE",
      }
    )
    return response
  } catch (err: any) {
    Alert.alert("Erro", err)
  }
}

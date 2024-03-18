import { SaveScheduleRequestProps } from "@/components/Schedule/SaveSchedule"
import { Alert } from "react-native"

export async function updateSchedule(
  body: SaveScheduleRequestProps,
  uuid: string
) {
  try {
    const response = await fetch(`http://192.168.0.10:8080/schedules/${uuid}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    return response
  } catch (err: any) {
    Alert.alert("Erro de edição", err)
  }
}

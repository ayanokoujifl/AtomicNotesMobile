import { SaveScheduleRequestProps } from "@/components/Schedule/SaveSchedule"
import { Alert } from "react-native"

export async function updateSchedule(
  body: SaveScheduleRequestProps,
  uuid: string
) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/schedules/${uuid}`,
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

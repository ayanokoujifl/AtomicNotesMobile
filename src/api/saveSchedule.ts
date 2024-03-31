import { SaveScheduleRequestProps } from "@/components/Schedule/SaveSchedule"
import { Alert } from "react-native"

export async function saveSchedule(body: SaveScheduleRequestProps) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/schedules`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    )
    return response
  } catch (err: any) {
    Alert.alert(err)
  }
}

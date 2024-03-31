import { Alert } from "react-native"

export async function deleteSchedule(uuid: string) {
  try {
    const response: Response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/schedules/${uuid}`,
      {
        method: "DELETE",
      }
    )
    return response
  } catch (err: any) {
    Alert.alert("Erro", err)
  }
}

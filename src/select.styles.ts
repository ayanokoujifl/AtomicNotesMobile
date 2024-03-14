import { TextStyle, ViewStyle } from "react-native"
import colors from "tailwindcss/colors"

export const boxStyles: ViewStyle = {
  borderWidth: 2,
  borderColor: colors.lime[600],
  borderRadius: 6,
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
}

export const inputStyles: TextStyle = {
  color: colors.slate[400],
}

export const dropdownStyles: ViewStyle = {
  borderWidth: 2,
  borderColor: colors.lime[500],
  width: "100%",
}

export const dropdownTextStyles: TextStyle = {
  color: colors.slate[200],
}

import DateTimePicker from "react-native-ui-datepicker"
import { DatePickerSingleProps } from "react-native-ui-datepicker/lib/typescript/src/DateTimePicker"
import { DatePickerBaseProps } from "react-native-ui-datepicker/lib/typescript/src/types"

type DateTimeProps = DatePickerBaseProps & DatePickerSingleProps

export function DateTime({ ...rest }: DateTimeProps) {
  return <DateTimePicker mode="single" initialView="time" />
}

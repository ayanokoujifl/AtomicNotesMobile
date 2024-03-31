import { AlarmClock, AlarmClockCheck, ChevronDown } from "lucide-react-native"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import colors from "tailwindcss/colors"
import { CalendarPicker } from "./CalendarPicker"
import clsx from "clsx"

type DatePickerProps = {
  dateTimeChanged: (dateTime: string) => void
  value?: String
}

export function DatePicker({ dateTimeChanged, value }: DatePickerProps) {
  const [date, setDate] = useState<string>()
  const [time, setTime] = useState<string>()

  const [isCalendarVisible, setCalendarVisible] = useState(false)
  const showCalendar = () => setCalendarVisible(true)
  const hideCalendar = () => setCalendarVisible(false)

  function handleDateTimeChanged(date: string, time: string) {
    setDate(date)
    setTime(time)
    const dateTime = date + "T" + time
    dateTimeChanged(dateTime)
  }

  return (
    <>
      <Pressable
        className="border border-lime-500 w-full rounded flex-row items-center justify-between"
        onPress={showCalendar}
      >
        {date != null && time != null ? (
          <View className="flex-row justify-between flex-1 p-4">
            <AlarmClockCheck size={24} color={colors.lime[400]} />
            <Text className="text-slate-200 text-center flex-1">
              {date} | {time}
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-1 justify-between items-center">
            <View className="px-2">
              {value ? (
                <AlarmClockCheck size={24} color={colors.lime[400]} />
              ) : (
                <AlarmClock size={24} color={colors.slate[400]} />
              )}
            </View>
            <View className="border-r-2 border-lime-600 h-16" />
            <Text
              className={clsx(
                "text-left flex-1 px-6",
                value ? "text-slate-200 text-center" : "text-slate-500"
              )}
            >
              {value ? value.replace("T", " | ") : "Pick a Date"}
            </Text>
            {!value && (
              <View className="mr-2">
                <ChevronDown size={24} color={colors.slate[400]} className="" />
              </View>
            )}
          </View>
        )}
      </Pressable>
      <CalendarPicker
        isVisible={isCalendarVisible}
        onHide={hideCalendar}
        dateTime={handleDateTimeChanged}
      />
    </>
  )
}

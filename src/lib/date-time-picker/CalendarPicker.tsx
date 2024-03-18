import { Header } from "@/components/Header"
import clsx from "clsx"
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react-native"
import { useState } from "react"
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import colors from "tailwindcss/colors"
import { TimePicker } from "./TimePicker"

type CalendarMonthsProps = {
  key: number
  month: string
  numberOfDays: number
}

const MONTHS: CalendarMonthsProps[] = [
  { key: 0, month: "Janeiro", numberOfDays: 31 },
  { key: 1, month: "Fevereiro", numberOfDays: 28 },
  { key: 2, month: "Março", numberOfDays: 31 },
  { key: 3, month: "Abril", numberOfDays: 30 },
  { key: 4, month: "Maio", numberOfDays: 31 },
  { key: 5, month: "Junho", numberOfDays: 30 },
  { key: 6, month: "Julho", numberOfDays: 31 },
  { key: 7, month: "Agosto", numberOfDays: 31 },
  { key: 8, month: "Setembro", numberOfDays: 30 },
  { key: 9, month: "Outubro", numberOfDays: 31 },
  { key: 10, month: "Novembro", numberOfDays: 30 },
  { key: 11, month: "Dezembro", numberOfDays: 31 },
]

type CalendarPicker = {
  isVisible: boolean
  onHide: () => void
  dateTime: (date: string, hours: string) => void
}

export function CalendarPicker({
  isVisible,
  onHide,
  dateTime,
}: CalendarPicker) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [selectedDay, setSelectedDay] = useState<number>(1)
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [isTimePickerVisible, setTimePickerVisible] = useState(false)
  const showTimePicker = () => setTimePickerVisible(true)
  const hideTimePicker = () => setTimePickerVisible(false)

  const currentDay = new Date().getDate()
  const numberOfDays = MONTHS.find(
    (month) => month.key === currentMonth
  )?.numberOfDays

  function iterableDays() {
    if (numberOfDays) {
      const count: number[] = []
      for (let i = 1; i <= numberOfDays; i++) {
        count.push(i)
      }
      return count
    } else {
      return []
    }
  }

  function isLeapYear(year: number) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
  }

  const days = iterableDays()

  const [isLeftArrowPressed, setLeftArrowPressed] = useState(false)
  const inPressedLeftArrow = () => setLeftArrowPressed(true)
  const outPressedLeftArrow = () => setLeftArrowPressed(false)

  const [isRightArrowPressed, setRightArrowPressed] = useState(false)
  const inPressedRightArrow = () => setRightArrowPressed(true)
  const outPressedRightArrow = () => setRightArrowPressed(false)

  function decrementMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }
  function incrementMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  function handleSelectDateDay(day: number) {
    setSelectedDay(day)
    onHide()
    showTimePicker()
  }

  function handleTimeChanged(hours: string, minutes: string) {
    setHours(hours)
    setMinutes(minutes)
    const date = `${new Date().getFullYear().toString()}-${String(
      currentMonth + 1
    ).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
    const time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`
    dateTime(date, time)
  }

  return (
    <>
      <Modal transparent visible={isVisible} animationType="fade">
        <TouchableWithoutFeedback className="flex-1" onPress={onHide}>
          <View className="flex-1 mt-56">
            <View
              className="flex-col bg-slate-800 border border-lime-500 m-4 py-4 overflow-hidden rounded-lg"
              style={{ elevation: 60 }}
            >
              <View className="flex-row w-full items-center justify-between border-b-2 pb-3 border-b-lime-400 px-3">
                <ArrowLeftCircle
                  size={32}
                  color={
                    isLeftArrowPressed ? colors.lime[500] : colors.slate[200]
                  }
                  onPressIn={inPressedLeftArrow}
                  onPressOut={outPressedLeftArrow}
                  onPress={decrementMonth}
                />
                {MONTHS.map((month) => {
                  if (month.key === 1) {
                    isLeapYear(new Date().getFullYear()) &&
                      (month.numberOfDays = 29)
                  }
                  return (
                    month.key === currentMonth && (
                      <Text
                        key={month.key}
                        className="text-center text-white  font-stronger
              text-xl "
                      >
                        {month.month}
                      </Text>
                    )
                  )
                })}
                <ArrowRightCircle
                  size={32}
                  color={
                    isRightArrowPressed ? colors.lime[500] : colors.slate[200]
                  }
                  onPressIn={inPressedRightArrow}
                  onPressOut={outPressedRightArrow}
                  onPress={incrementMonth}
                />
              </View>
              <FlatList
                className="mt-4 self-center flex flex-row px-2"
                numColumns={7}
                data={days}
                keyExtractor={(item) => item.toString()}
                renderItem={(day) => {
                  return (
                    <Pressable
                      className={clsx(
                        "bg-slate-700 mx-1 mb-2 size-12 max-w-12 rounded-full text-center flex justify-center items-center  flex-1 select-none active:bg-lime-500",
                        currentDay === day.item &&
                          currentMonth === new Date().getMonth() &&
                          " border-2 !border-lime-400 active:!bg-lime-500"
                      )}
                      onPress={() => handleSelectDateDay(day.item)}
                    >
                      <Text
                        className={clsx(
                          "font-light text-slate-200",
                          currentDay === day.item &&
                            currentMonth === new Date().getMonth() &&
                            " !text-lime-50 !font-stronger"
                        )}
                      >
                        {day.item}
                      </Text>
                      {currentDay === day.item &&
                        currentMonth === new Date().getMonth() && (
                          <View className="bg-white size-1 -mt-1 rounded-full" />
                        )}
                    </Pressable>
                  )
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TimePicker
        timeState={handleTimeChanged}
        isVisible={isTimePickerVisible}
        onHide={hideTimePicker}
        day={selectedDay}
        month={MONTHS.find((month) => month.key === currentMonth)!.month}
      />
    </>
  )
}

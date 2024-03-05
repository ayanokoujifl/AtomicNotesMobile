import { FlatList, Pressable, Text, View } from "react-native"
import { clsx } from "clsx"

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

export function Calendar() {
  const currentMonth = new Date().getMonth()
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
  return (
    <View className="flex-col bg-slate-800 m-4 py-6 overflow-hidden  rounded-lg">
      {MONTHS.map((month) => {
        if (month.key === 1) {
          isLeapYear(new Date().getFullYear()) && (month.numberOfDays = 29)
        }
        return (
          month.key === currentMonth && (
            <Text
              key={month.key}
              className="text-center text-white border-b-2 pb-2 border-b-lime-400 font-stronger
              text-xl "
            >
              {month.month}
            </Text>
          )
        )
      })}
      <FlatList
        className="mt-4 self-center flex flex-row "
        numColumns={7}
        data={days}
        keyExtractor={(item) => item.toString()}
        renderItem={(day) => {
          return (
            <Pressable
              className={clsx(
                "bg-slate-700 mx-1 mb-2 size-12 max-w-12 rounded-full text-center flex justify-center items-center  flex-1 mr-auto select-none cursor-pointer active:bg-slate-500",
                currentDay === day.item && "!bg-lime-400 active:!bg-lime-600"
              )}
            >
              <Text
                className={clsx(
                  "font-light text-slate-200",
                  currentDay === day.item && " !text-slate-950 !font-stronger"
                )}
              >
                {day.item}
              </Text>
              {currentDay === day.item && (
                <View className="bg-black size-1 -mt-1 rounded-full" />
              )}
            </Pressable>
          )
        }}
      />
    </View>
  )
}

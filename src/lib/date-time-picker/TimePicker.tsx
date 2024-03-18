import clsx from "clsx"
import { useEffect, useState } from "react"
import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native"

type TimePickerProps = {
  isVisible: boolean
  onHide: () => void
  day: number
  month: string
  timeState: (hour: string, minute: string) => void
}

const countMinutes = () => {
  const minutes: string[] = []
  for (let i = 0; i < 60; i += 5) {
    minutes.push(String(i).padStart(2, "0"))
  }
  return minutes
}

const HOURS_AM = ["00", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const HOURS_PM = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
const MINUTES: string[] = countMinutes()

export function TimePicker({
  isVisible,
  day,
  month,
  onHide,
  timeState,
}: TimePickerProps) {
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [isMinutesSelect, setMinutesSelect] = useState(false)

  function handleChangeHours(hours: string) {
    setHours(hours)
    setMinutesSelect(true)
  }

  function handleChangeMinutes(minutes: string) {
    setMinutes(minutes)
    timeState(hours, minutes)
    onHide()
    setMinutesSelect(false)
  }

  function clearStates() {
    setMinutesSelect(false)
  }

  useEffect(() => {
    setHours(new Date().getHours().toLocaleString())
    setMinutes(new Date().getMinutes().toLocaleString())
  }, [])

  return (
    <Modal
      transparent
      visible={isVisible}
      onDismiss={clearStates}
      onRequestClose={clearStates}
    >
      <TouchableWithoutFeedback className="flex-1" onPress={onHide}>
        <View className="items-center justify-center px-6 flex-1">
          <View
            className="flex-col bg-slate-800 m-4 py-4 w-full overflow-hidden rounded-lg h-1/2"
            style={{ elevation: 20 }}
          >
            <View className="flex-row w-full items-center justify-between border-b-2 pb-3 border-b-lime-400 px-3">
              <Text className="text-slate-500 text-sm font-base">
                {String(day).padStart(2, "0")}
                {" -> "}
                {month}
              </Text>
              <Text className="text-slate-400 text-lg font-base">
                {String(hours).padStart(2, "0")}:
                {String(minutes).padStart(2, "0")}
              </Text>
            </View>
            <View className="flex-1 items-center justify-center p-3 -rotate-90">
              <View className="bg-gray-700 w-full flex-1 rounded-full">
                <View className="size-5 bg-slate-400 absolute top-1/2 left-1/2 -mt-2 -translate-x-full -translate-y-full rounded-full" />
                {isMinutesSelect
                  ? MINUTES.map((minute, index) => {
                      const angle = index * (360 / HOURS_AM.length)
                      const radians = (angle * Math.PI) / 180
                      const radius = 130
                      const x = Math.cos(radians) * radius + 150
                      const y = Math.sin(radians) * radius + 145
                      return (
                        <Pressable
                          key={minute}
                          className="bg-slate-900  size-10  text-center rounded-full items-center justify-center active:bg-lime-500 "
                          style={{
                            position: "absolute",
                            left: x,
                            top: y,
                            transform: [
                              {
                                rotate: "90deg",
                              },
                            ],
                          }}
                          onPress={() => handleChangeMinutes(String(minute))}
                        >
                          <Text
                            className={clsx(
                              "text-slate-200 text-center text-sm font-base",
                              String(minute) === String(minutes) &&
                                "!text-lime-500 font-stronger"
                            )}
                          >
                            {minute}
                          </Text>
                        </Pressable>
                      )
                    })
                  : HOURS_AM.map((hour, index) => {
                      const angle = index * (360 / HOURS_AM.length) // Calculando o ângulo de cada hora
                      const radians = (angle * Math.PI) / 180 // Convertendo para radianos
                      const radius = 130 // Raio do círculo das horas AM
                      const x = Math.cos(radians) * radius + 150 // Coordenada X
                      const y = Math.sin(radians) * radius + 145 // Coordenada Y
                      return (
                        <Pressable
                          key={hour}
                          className="bg-slate-900 relative size-10  text-center rounded-full items-center justify-center active:bg-lime-500 z-10"
                          style={{
                            position: "absolute",
                            left: x,
                            top: y,
                            transform: [
                              {
                                rotate: "90deg",
                              },
                            ],
                          }}
                          onPress={() => handleChangeHours(String(hour))}
                        >
                          <View className="absolute top-10 bg-lime-500 w-1 -z-10" />
                          <Text
                            className={clsx(
                              "text-slate-200 text-center text-sm font-base",
                              String(hour) === String(hours) &&
                                "!text-lime-500 font-stronger"
                            )}
                          >
                            {hour}
                          </Text>
                        </Pressable>
                      )
                    })}
                {!isMinutesSelect &&
                  HOURS_PM.map((hour, index) => {
                    const angle = index * (360 / HOURS_AM.length) // Calculando o ângulo de cada hora
                    const radians = (angle * Math.PI) / 180 // Convertendo para radianos
                    const radius = 80 // Raio do círculo das horas AM
                    const x = Math.cos(radians) * radius + 150 // Coordenada X
                    const y = Math.sin(radians) * radius + 145 // Coordenada Y
                    return (
                      <Pressable
                        key={hour}
                        className="bg-slate-900 size-10  text-center rounded-full items-center justify-center active:bg-lime-500"
                        style={{
                          position: "absolute",
                          left: x,
                          top: y,
                          transform: [
                            {
                              rotate: "90deg",
                            },
                          ],
                        }}
                        onPress={() => handleChangeHours(String(hour))}
                      >
                        <Text
                          className={clsx(
                            "text-slate-200 text-center text-sm font-base",
                            String(hour) === String(hours) &&
                              "!text-lime-500 font-stronger"
                          )}
                        >
                          {hour}
                        </Text>
                      </Pressable>
                    )
                  })}
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

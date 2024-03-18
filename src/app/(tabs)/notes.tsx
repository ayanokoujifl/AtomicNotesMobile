import { Button } from "@/components/Button"
import { Header } from "@/components/Header"
import { FormNote } from "@/components/Note/FormNote"
import { NoteCard } from "@/components/Note/NoteCard"
import { Notebook, PlusCircle } from "lucide-react-native"
import { useEffect, useState } from "react"
import { ScrollView, StatusBar, Text, View } from "react-native"
import colors from "tailwindcss/colors"

export type NoteProps = {
  uuid: string
  title: string
  content: string
  category: number
  createdAt: Date
  isRead: boolean
}

export default function Notes() {
  const [notes, setNotes] = useState<NoteProps[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showFormModal = () => setIsModalVisible(true)
  const hideFormModal = () => setIsModalVisible(false)

  async function getNotes() {
    const response: NoteProps[] = await fetch(
      "http://192.168.0.10:8080/notes"
    ).then((response) => response.json())
    setNotes(response)
  }

  useEffect(() => {
    getNotes()
  }, [notes])

  return (
    <View className="flex-1 px-4 pt-10 bg-slate-900">
      <StatusBar translucent />
      <Header />
      <View className="flex-1">
        <View className="flex-row gap-2">
          <Button.Root
            className="bg-slate-800 flex-row justify-center min-h-24 p-4  gap-3 flex-1 items-center rounded-md active:bg-slate-950 mb-4 border-2 border-lime-400 active:border-slate-700"
            onPress={showFormModal}
          >
            <Button.Icon
              icon={PlusCircle}
              size={32}
              color={colors.slate[400]}
            />
            <Button.Content className="font-stronger text-center text-lg flex-1 text-slate-200">
              Adicionar nota
            </Button.Content>
          </Button.Root>
        </View>
        <ScrollView className="pb-10 flex-1">
          <View className="flex-row items-center gap-2 mb-4">
            <Notebook size={16} color={colors.lime[300]} />
            <Text className="text-slate-200 font-stronger text-xl">Notas:</Text>
          </View>
          {notes.length <= 0 ? (
            <NoteCard />
          ) : (
            notes.map((note) => {
              return <NoteCard key={note.uuid} note={note} />
            })
          )}
        </ScrollView>
      </View>
      <FormNote type="save" isVisible={isModalVisible} onHide={hideFormModal} />
    </View>
  )
}

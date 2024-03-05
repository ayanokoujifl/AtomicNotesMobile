import { Header } from "@/components/Header"
import { NoteCard } from "@/components/NoteCard"
import { useEffect, useState } from "react"
import { StatusBar, Text, View } from "react-native"

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

  async function getNotes() {
    const response: NoteProps[] = await fetch(
      `http://192.168.0.14:8080/notes`
    ).then((response) => response.json())
    setNotes(response)
  }

  useEffect(() => {
    getNotes()
  }, [notes])

  return (
    <View className="flex-1 px-4 pt-10">
      <StatusBar translucent />
      <Header />
      <Text className="text-slate-200 font-base ml-2 text-lg mb-2">
        Minhas notas:
      </Text>
      <View className="gap-4">
        {notes.length <= 0 ? (
          <NoteCard />
        ) : (
          notes.map((note) => {
            return <NoteCard key={note.uuid} note={note} />
          })
        )}
      </View>
    </View>
  )
}

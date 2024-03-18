import { Calendar } from "@/components/Calendar"
import { Header } from "@/components/Header"
import { NoteCard } from "@/components/Note/NoteCard"
import { useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { NoteProps } from "./notes"

export default function Home() {
  const [notes, setNotes] = useState<NoteProps[]>([])

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
    <View className="flex-1 bg-slate-900">
      <Header />
      <Calendar />
      <Text className="ml-4 text-slate-200 font-stronger text-lg">Notas:</Text>
      <ScrollView className="gap-4 mx-4 flex-1 pb-10">
        {notes.length <= 0 ? (
          <NoteCard />
        ) : (
          notes.map((note) => {
            return <NoteCard key={note.uuid} note={note} />
          })
        )}
      </ScrollView>
    </View>
  )
}

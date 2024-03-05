import { NoteProps } from "@/app/notes"
import { Pressable, Text } from "react-native"
import { Button } from "./Button"
import { NotebookText, NotepadText } from "lucide-react-native"
import colors from "tailwindcss/colors"

type NoteParentProps = {
  note?: NoteProps
}

export function NoteCard({ note }: NoteParentProps) {
  if (!note) {
    return (
      <Text className="text-slate-400 bg-slate-700 px-5 py-3 rounded-md  active:bg-slate-600">
        Notas vazias...
      </Text>
    )
  }

  return (
    <Button.Root>
      <Button.Icon icon={NotepadText} color={colors.slate[400]} />
      <Button.Content>{note.title}</Button.Content>
    </Button.Root>
  )
}

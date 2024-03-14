import { LucideIcon } from "lucide-react-native"
import { useState } from "react"
import { Controller, Control } from "react-hook-form"
import { Pressable, TextInput, TextInputProps, View } from "react-native"
import colors from "tailwindcss/colors"

type InputProps = TextInputProps & {
  icon: LucideIcon
  name: string
  control: Control<any>
}

export function Input({ icon: Icon, name, control, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Pressable className="flex-row gap-2 items-center border-2 rounded-md px-2 border-lime-600">
          <Icon
            size={24}
            color={isFocused || isFilled ? colors.lime[300] : colors.slate[400]}
          />
          <View className="border-r-2 border-lime-600 h-full" />
          <TextInput
            onChangeText={onChange}
            className="text-slate-200 font-base flex-1 p-4 text-left items-center justify-center"
            cursorColor={colors.lime[500]}
            placeholderTextColor={colors.slate[500]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />
        </Pressable>
      )}
    />
  )
}

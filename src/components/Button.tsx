import { ElementType, ReactNode } from "react"
import { Pressable, PressableProps, Text, View } from "react-native"
import { LucideProps } from "lucide-react-native"

type ButtonRootProps = PressableProps & {
  children: ReactNode
}

type ButtonIconProps = LucideProps & {
  icon: ElementType
}

type ButtonContentProps = {
  children: ReactNode
}

function Button({ children, ...rest }: ButtonRootProps) {
  return (
    <Pressable
      className="bg-slate-800 min-h-24 p-4 flex-row gap-3 flex-1 items-center rounded-md active:bg-slate-950 mb-4"
      {...rest}
    >
      {children}
    </Pressable>
  )
}
function ButtonIcon({ icon: Icon, ...rest }: ButtonIconProps) {
  return <Icon className="size-5" {...rest} />
}
function ButtonContent({ children }: ButtonContentProps) {
  return (
    <Text className=" font-light -ml-2 text-center text-lg flex-1 text-slate-200">
      {children}
    </Text>
  )
}

Button.Root = Button
Button.Icon = ButtonIcon
Button.Content = ButtonContent
export { Button }

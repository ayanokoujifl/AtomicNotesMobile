import { Tabs } from "expo-router"
import { AlarmClock, CalendarDays, NotepadText } from "lucide-react-native"
import colors from "tailwindcss/colors"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.slate[900],
          borderColor: colors.slate[900],
          height: 64,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: colors.lime[500],
        tabBarInactiveTintColor: colors.slate[400],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <CalendarDays size={size} color={color} />
          ),
          tabBarLabel: "Calendário",
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          tabBarIcon: ({ size, color }) => (
            <NotepadText size={size} color={color} />
          ),
          tabBarLabel: "Notas",
        }}
      />
      <Tabs.Screen
        name="schedules"
        options={{
          tabBarIcon: ({ size, color }) => (
            <AlarmClock size={size} color={color} />
          ),
          tabBarLabel: "Lembretes",
        }}
      />
    </Tabs>
  )
}

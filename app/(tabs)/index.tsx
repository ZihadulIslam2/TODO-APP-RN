import { createHomeStyles } from '@/assets/styles/home.styles'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { LinearGradient } from 'expo-linear-gradient'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useTheme from '../hooks/useTheme'

export default function Index() {
  const todos = useQuery(api.todo.getTodos)

  const addTodo = useMutation(api.todo.addTodo)

  console.log(1, todos)

  const { toggleDarkMode, colors } = useTheme()

  const homeStyles = createHomeStyles(colors)
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <SafeAreaView style={homeStyles.safeArea}>
        <Text>Tab [Home|Settings]</Text>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>toggle the mode</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => addTodo({ text: 'Do the home work!' })}
        >
          <Text>Add a new project</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  )
}

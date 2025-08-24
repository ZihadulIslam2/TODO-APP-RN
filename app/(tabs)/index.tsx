import { createHomeStyles } from '@/assets/styles/home.styles'
import Header from '@/components/Header'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useTheme from '../hooks/useTheme'

export default function Index() {
  const addTodo = useMutation(api.todo.addTodo)

  const { toggleDarkMode, colors } = useTheme()

  // console.log(1, todos)

  const homeStyles = createHomeStyles(colors)
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
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

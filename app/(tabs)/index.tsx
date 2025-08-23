import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useTheme, { ColorScheme } from '../hooks/useTheme'

export default function Index() {
  const todos = useQuery(api.todo.getTodos)

  const addTodo = useMutation(api.todo.addTodo)

  console.log(1, todos)

  const { toggleDarkMode, colors } = useTheme()

  const styles = createStyles(colors)
  return (
    <View style={styles.container}>
      <Text>Tab [Home|Settings]</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>toggle the mode</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => addTodo({ text: 'Do the home work!' })}>
        <Text>Add a new project</Text>
      </TouchableOpacity>
    </View>
  )
}

const createStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.bg,
    },
  })
  return styles
}

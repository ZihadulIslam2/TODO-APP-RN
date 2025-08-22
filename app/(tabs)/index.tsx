import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useTheme from '../hooks/useTheme'

export default function Tab() {
  const { toggleDarkMode } = useTheme()
  return (
    <View style={styles.container}>
      <Text>Tab [Home|Settings] dfsdf</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>toggle the mode</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

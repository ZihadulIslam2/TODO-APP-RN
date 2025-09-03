import { createHomeStyles } from '@/assets/styles/home.styles'
import Header from '@/components/Header'
import LoadingSpinner from '@/components/LoadingSpinner'
import TodoInput from '@/components/TodoINput'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { Ionicons } from '@expo/vector-icons'
import { Text } from '@react-navigation/elements'
import { useMutation, useQuery } from 'convex/react'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
  Alert,
  FlatList,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useTheme from '../../hooks/useTheme'

type Todo = Doc<'todos'>
export default function Index() {
  const { toggleDarkMode, colors } = useTheme()

  const homeStyles = createHomeStyles(colors)

  const todos = useQuery(api.todo.getTodos)
  const toggleTodo = useMutation(api.todo.toggleTodo)
  const deleteTodo = useMutation(api.todo.deleteTodo)
  const updateTodo = useMutation(api.todo.updateTodo)

  console.log(todos)

  const isLoading = todos === undefined

  if (isLoading) return <LoadingSpinner />

  interface Todo {
    _id: Id<'todos'>
    text: string
    isCompleated: boolean
  }

  const handleTodoToggle = async (id: Id<'todos'>) => {
    try {
      await toggleTodo({ id })
      console.log('clicked', id)
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Failed to toggle todo')
    }
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleTodoToggle(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleated
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isCompleated
                    ? 'transparent'
                    : colors.border,
                },
              ]}
            >
              {item.isCompleated && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View>
            <Text
              style={[
                homeStyles.todoText,
                item.isCompleated && {
                  textDecorationLine: 'line-through',
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>
          </View>
        </LinearGradient>
      </View>
    )
  }

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
        />
      </SafeAreaView>
    </LinearGradient>
  )
}

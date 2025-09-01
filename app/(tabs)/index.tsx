import { createHomeStyles } from '@/assets/styles/home.styles'
import Header from '@/components/Header'
import LoadingSpinner from '@/components/LoadingSpinner'
import TodoInput from '@/components/TodoINput'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { FlatList, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useTheme from '../../hooks/useTheme'
import { Doc } from '@/convex/_generated/dataModel'

type Todo = Doc<"todos">
export default function Index() {
  const { toggleDarkMode, colors } = useTheme()

  const homeStyles = createHomeStyles(colors)

  const todos = useQuery(api.todo.getTodos)
  const toggleTodo = useMutation(api.todo.toggleTodo)
  const deleteTodo = useMutation(api.todo.deleteTodo)
  const updateTodo = useMutation(api.todo.updateTodo)

  const isLoading = todos === undefined

  if (isLoading) return <LoadingSpinner />

  interface Todo {
    _id: string
    text: string
  }

const renderTodoItem = ({ item }: { item: Todo }) => {

    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
        
        
        >
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

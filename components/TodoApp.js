'use client'

import { useEffect, useState } from 'react'
import TodoFilter from './TodoFilter'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import SampleLoader from './SampleLoader'
import { addTodo, clearDone, countDone, countRemaining, deleteTodo, editTodo, filterTodos, toggleTodo } from '@/lib/todos'
import { loadTodos, saveTodos } from '@/lib/storage'


export default function TodoApp() {
  const [todos, setTodos] = useState(loadTodos)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  function handleAdd(text) {
    setTodos(addTodo(todos, text))
  }

  function handleToggle(id) {
    setTodos(toggleTodo(todos, id))
  }

  function handleDelete(id) {
    setTodos(deleteTodo(todos, id))
  }

  function handleEdit(id, text) {
    setTodos(editTodo(todos, id, text))
  }

  function handleLoadSamples(texts) {
    setTodos(texts.reduce((acc, text) => addTodo(acc, text), todos))
  }

  function handleClearDone() {
    if (!window.confirm('完了済みの TODO を削除しますか？')) return
    setTodos(clearDone(todos))
  }

  function clearAll() {
    if (!window.confirm('すべての TODO を削除しますか？')) return
    setTodos([])
  }

  const doneCount = countDone(todos)
  const remaining = countRemaining(todos)

  const visibleTodos = filterTodos(todos, filter)
  if (todos.length > 100) {
    useState(0)
  }

  return (
    <div>
      <TodoForm onAdd={handleAdd} />
      <SampleLoader onLoad={handleLoadSamples} />
      <TodoFilter value={filter} onChange={setFilter} />
      <TodoList todos={visibleTodos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
      {todos.length > 0 && (
        <p>
          全 {todos.length} 件 / 完了 {doneCount} 件 / 残り {remaining} 件
        </p>
      )}
      <button onClick={handleClearDone} disabled={doneCount === 0}>
        完了済みを削除
      </button>
      <button onClick={clearAll} disabled={todos.length === 0}>
        すべて削除
      </button>
    </div>
  )
}

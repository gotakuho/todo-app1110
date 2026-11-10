'use client'

import { useState } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)

  function startEdit() {
    setDraft(todo.text)
    setEditing(true)
  }

  function finishEdit() {
    onEdit(todo.id, draft)
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') finishEdit()
    if (e.key === 'Escape') setEditing(false)
  }

  if (editing) {
    return (
      <li>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={finishEdit}
          onKeyDown={handleKeyDown}
          aria-label={`${todo.text}を編集`}
          autoFocus
        />
      </li>
    )
  }

  return (
    <li>
      <label>
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
        <span onDoubleClick={startEdit} style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
      </label>
      <button onClick={() => onDelete(todo.id)} aria-label={`${todo.text}を削除`}>
        削除
      </button>
    </li>
  )
}

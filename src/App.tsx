import { useEffect, useState, type FormEvent } from 'react'
import './App.css'

type Task = {
  id: string
  text: string
  done: boolean
}

const STORAGE_KEY = 'task-ap.tasks'

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Task[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [input, setInput] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // 保存に失敗しても操作は継続する
    }
  }, [tasks])

  const addTask = (e: FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, done: false },
    ])
    setInput('')
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const remaining = tasks.filter((t) => !t.done).length

  return (
    <main className="board">
      <h1>タスクボード</h1>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="タスクを入力してEnter"
          aria-label="新しいタスク"
        />
        <button type="submit">追加</button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty">タスクはありません</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.done ? 'task done' : 'task'}>
              <label className="task-main">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-text">{task.text}</span>
              </label>
              <button
                type="button"
                className="delete"
                onClick={() => deleteTask(task.id)}
                aria-label={`「${task.text}」を削除`}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}

      {tasks.length > 0 && (
        <p className="status">未完了 {remaining} / 全 {tasks.length} 件</p>
      )}
    </main>
  )
}

export default App

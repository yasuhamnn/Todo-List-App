import { useState, useEffect } from "react"
import "./style.css"

function App() {

    const [task, setTask] = useState("")

    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("todos")
        if (localValue == null) return []

        return JSON.parse(localValue).filter(todo => !todo.completed)
    })

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    function addTodo() {
        if (task.trim() === "") return

        setTodos(currentTodos => [
            ...currentTodos,
            {
                id: crypto.randomUUID(),
                text: task,
                completed: false
            }
        ])

        setTask("")
    }

    function toggleTodo(id) {
        setTodos(currentTodos =>
            currentTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    function deleteTodo(id) {
        setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id))
    }

    return (
        <div className="page">
            <div className="todo-card">

                <h1 className="title">✨ My Todo List</h1>

                <div className="input-section">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button onClick={addTodo}>Add</button>
                </div>

                <div className="todo-list">

                    {todos.length === 0 && (
                        <p className="empty">No tasks yet 👀</p>
                    )}

                    {todos
                        .slice()
                        .sort((a, b) => a.completed - b.completed)
                        .map(todo => (
                            <div className="todo-item" key={todo.id}>
                                <label className="task">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleTodo(todo.id)}
                                    />
                                    <span className={todo.completed ? "completed" : ""}>
                                        {todo.text}
                                    </span>
                                </label>

                                <button
                                    className="delete"
                                    onClick={() => deleteTodo(todo.id)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                </div>

            </div>
        </div>
    )
}

export default App
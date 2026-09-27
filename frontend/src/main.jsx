import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('Loading...');

  const loadTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error('Could not load tasks');
      setTasks(await response.json());
      setMessage('');
    } catch (error) {
      setMessage(`Backend connection failed: ${error.message}`);
    }
  };

  React.useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    if (response.ok) {
      setTitle('');
      await loadTasks();
    }
  };

  const toggleTask = async (task) => {
    await fetch(`${API_URL}/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    });
    await loadTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    await loadTasks();
  };

  return (
    <main className="container">
      <section className="card">
        <p className="eyebrow">React + Node.js + Jenkins</p>
        <h1>Task Manager</h1>
        <p className="subtitle">A small full-stack project for learning CI/CD.</p>

        <form onSubmit={addTask} className="task-form">
          <input
            aria-label="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a task"
          />
          <button type="submit">Add Task</button>
        </form>

        {message && <p className="message">{message}</p>}

        <ul className="tasks">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <button className="task-title" onClick={() => toggleTask(task)}>
                {task.completed ? '✓' : '○'} {task.title}
              </button>
              <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

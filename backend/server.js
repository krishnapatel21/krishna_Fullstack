import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let nextId = 3;
let tasks = [
  { id: 1, title: 'Learn Jenkins', completed: false },
  { id: 2, title: 'Create GitHub repository', completed: true }
];

app.get('/api/health', (_req, res) => {
  res.json({ status: 'UP', service: 'task-manager-backend' });
});

app.get('/api/tasks', (_req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const title = String(req.body?.title || '').trim();

  if (!title) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  const task = { id: nextId++, title, completed: false };
  tasks.push(task);
  return res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (typeof req.body?.completed === 'boolean') {
    task.completed = req.body.completed;
  }

  return res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const exists = tasks.some((item) => item.id === id);

  if (!exists) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks = tasks.filter((item) => item.id !== id);
  return res.status(204).send();
});

export { app };

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
  });
}

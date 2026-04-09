import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';
import prisma from './lib/prisma.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. GET /api/health
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});

// 2. GET /api/tasks (Prisma-integrated with safe fallback)
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    console.error('Tasks fetch error:', error);
    res.json([]); // Return empty array instead of error
  }
});

// Routes
app.use('/api/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API with TypeScript' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
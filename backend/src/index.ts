import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET /api/health
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(), 
    uptime: process.uptime() 
  });
});

// Routes
app.use('/api/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API with TypeScript' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

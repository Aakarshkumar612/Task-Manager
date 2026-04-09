import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Task, Status, Priority } from '../components/TaskCard';

// Using relative path for Vite proxy and production Nginx routing
const API_URL = '/api/tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Task[]>(API_URL);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks. Ensure the backend is running on port 5000.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    // Optimistic Update
    const tempId = `temp-${Date.now()}`;
    const newTask: Task = { ...task, id: tempId, createdAt: new Date().toISOString() };
    setTasks(prev => [newTask, ...prev]);

    try {
      const response = await axios.post<Task>(API_URL, task);
      setTasks(prev => prev.map(t => t.id === tempId ? response.data : t));
      return response.data;
    } catch (err) {
      setTasks(prev => prev.filter(t => t.id !== tempId));
      setError('Failed to create task');
      throw err;
    }
  };

  const updateTaskStatus = async (id: string, status: Status) => {
    const originalTasks = [...tasks];
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));

    try {
      const response = await axios.patch<Task>(`${API_URL}/${id}`, { status });
      setTasks(prev => prev.map(t => t.id === id ? response.data : t));
    } catch (err) {
      setTasks(originalTasks);
      setError('Failed to update task status');
    }
  };

  const deleteTask = async (id: string) => {
    const originalTasks = [...tasks];
    setTasks(prev => prev.filter(t => t.id !== id));

    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (err) {
      setTasks(originalTasks);
      setError('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    refresh: fetchTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
  };
};

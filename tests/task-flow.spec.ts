import { test, expect } from '@playwright/test';

test.describe('Task Management API', () => {
  let taskId: string;

  test('should create a new task', async ({ request }) => {
    const response = await request.post('/api/tasks', {
      data: {
        title: 'API Smoke Test Task',
        description: 'Testing the API via Playwright',
        status: 'TODO',
        priority: 'HIGH',
      },
    });

    expect(response.ok()).toBeTruthy();
    const task = await response.json();
    expect(task.title).toBe('API Smoke Test Task');
    expect(task.id).toBeDefined();
    taskId = task.id;
  });

  test('should verify the new task exists in the task list', async ({ request }) => {
    const response = await request.get('/api/tasks');
    expect(response.ok()).toBeTruthy();
    const tasks = await response.json();
    
    const taskFound = tasks.find((t: any) => t.id === taskId);
    expect(taskFound).toBeDefined();
    expect(taskFound.title).toBe('API Smoke Test Task');
  });

  test('should delete the task to clean up', async ({ request }) => {
    const response = await request.delete(`/api/tasks/${taskId}`);
    expect(response.status()).toBe(204);

    // Verify it's gone
    const verifyResponse = await request.get('/api/tasks');
    const tasks = await verifyResponse.json();
    const taskFound = tasks.find((t: any) => t.id === taskId);
    expect(taskFound).toBeUndefined();
  });
});

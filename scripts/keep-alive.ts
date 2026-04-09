import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PING_URL = process.env.PING_URL || 'http://localhost:5000/api/health';

console.log(`Keep-alive script started. Monitoring: ${PING_URL}`);

// Every 10 minutes: */10 * * * *
cron.schedule('*/10 * * * *', async () => {
  const now = new Date().toISOString();
  try {
    const response = await axios.get(PING_URL);
    console.log(`[${now}] Ping successful: ${response.status} ${response.statusText}`);
  } catch (error: any) {
    console.error(`[${now}] Ping failed: ${error.message}`);
  }
});

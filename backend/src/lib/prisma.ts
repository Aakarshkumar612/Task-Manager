import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapterFactory = new PrismaPg(process.env.DATABASE_URL as string);
const prisma = new PrismaClient({ adapter: adapterFactory });

export default prisma;

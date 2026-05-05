const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv/config');

async function main() {
  const connectionString = process.env.DATABASE_URL.includes('sslmode=') 
      ? process.env.DATABASE_URL 
      : `${process.env.DATABASE_URL}?sslmode=require`;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  
  try {
    const res = await prisma.demoRequest.create({
      data: { name: 'test', email: 'test', phone: '12', interest: 'ok', consent: true }
    });
    console.log("Success:", res);
  } catch (e) {
    console.error("Error:", e);
  }
}
main();

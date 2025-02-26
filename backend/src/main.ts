
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createConnection } from 'mysql2/promise';

async function ensureDatabaseExists() {
  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL password
  });

  const dbName = 'myapp_db';

  // Check if the database exists
  const [rows] = await connection.query(`SHOW DATABASES LIKE '${dbName}'`);
  if ((rows as any[]).length === 0) {
    console.log(`Database "${dbName}" not found. Creating...`);
    await connection.query(`CREATE DATABASE ${dbName}`);
    console.log(`Database "${dbName}" created successfully.`);
  } else {
    console.log(`Database "${dbName}" already exists.`);
  }

  await connection.end();
}

async function bootstrap() {
  await ensureDatabaseExists(); // Ensure the database is created before starting the server
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Allow frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // If using cookies
  });
  
  await app.listen(3001);
  console.log('Backend server is running on http://localhost:3001');
}

bootstrap();

// Импорт функции defineConfig
import { defineConfig } from 'prisma/config'
// Импорт dotenv, чтобы загрузить переменные окружения из .env файла
import 'dotenv/config'

// Экспорт конфигурации Prisma
export default defineConfig({
  // Путь к файлу схемы Prisma
  schema: './src/prisma/schema/schema.prisma',
  // Настройки генератора Prisma Client
  generator: {
    output: './src/prisma/generated',  // Путь для сгенерированных файлов клиента
  },
  // Настройки источника данных
  datasource: {
    url: process.env.DATABASE_URL,  
    provider: 'postgresql',
  },
})
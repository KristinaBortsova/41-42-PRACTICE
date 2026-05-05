// Загрузка переменных окружения из файла .env
import 'dotenv/config'

// Объект конфигурации приложения
const config = {
    // Порт, на котором будет запущен сервер
    port: process.env.PORT || 3000,

    // Настройки для подключения к Supabase
    supabase: {
        // URL проекта в Supabase
        url: process.env.SUPABASE_URL,
        // Публичный анонимный ключ для доступа к Supabase API
        anonKey: process.env.SUPABASE_ANON_KEY,
    },

    // Настройки CORS (Cross-Origin Resource Sharing)
    cors: {
        // Разрешённый источник запросов
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        // Разрешить передачу учётных данных
        credentials: true,
    },

    // Окружение, в котором запущено приложение
    nodeEnv: process.env.NODE_ENV || 'development',
}
// Экспортируем объект конфигурации для использования в других модулях
export default config
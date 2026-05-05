// Импорт функции создания клиента из официальной библиотеки Supabase
import { createClient } from '@supabase/supabase-js'
// Импорт объекта конфигурации, где хранятся URL и ключи Supabase
import config from '../config.js'
// Создание экземпляра клиента Supabase.Передаём два параметра:URL проекта в Supabase и публичный анонимный ключ
const supabase = createClient(config.supabase.url, config.supabase.anonKey)
// Экспортируем созданный клиент для использования во всём приложении
export default supabase
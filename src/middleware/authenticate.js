// Импорт функций для работы с JWT токенами из библиотеки jose
import { createRemoteJWKSet, jwtVerify } from "jose";
// Импорт конфигурации для получения URL Supabase
import config from "../config.js";
// Импорт кастомного класса ошибок
import AppError from "../utils/appError.js";

// Создание набора JSON Web Key Set (JWKS) для проверки подписи токена
const JWKS = createRemoteJWKSet(
  new URL(`${config.supabase.url}/auth/v1/.well-known/jwks.json`),
);
// Издатель токена (issuer) - должен совпадать с тем, что указан в токене
const ISSUER = `${config.supabase.url}/auth/v1`;

// Middleware для проверки аутентификации пользователя
export default async function authenticate(req, res, next) {
  // Получаем заголовок Authorization из запроса
  const authHeader = req.headers.authorization;

  // Проверяем, что заголовок существует и начинается с "Bearer "
  if (!authHeader?.startsWith("Bearer ")) {
      // Если токена нет или формат неверный - возвращаем ошибку 401
      return next(new AppError("Вы не авторизованы", 401));
    }

   // Извлекаем сам токен, убирая префикс "Bearer " (7 символов)
   const token = authHeader.slice(7).trim();

  try {
      // Проверяем токен с помощью библиотеки jose
       const { payload } = await jwtVerify(token, JWKS, {
       issuer: ISSUER,
        audience: "authenticated",
    });

       // Если проверка прошла успешно, сохраняем данные пользователя в объект запроса
       req.user = payload;
        // Передаём управление следующему middleware/контроллеру
        next();
    } catch (err) {
      // Если произошла ошибка при проверке токена
       console.error("JWT verify error:", err?.message);
       // Возвращаем ошибку 401 - не авторизован
       return next(new AppError("Недействительный или истекший токен", 401));
  }
}
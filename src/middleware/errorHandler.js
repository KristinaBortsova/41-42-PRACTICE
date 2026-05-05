// Глобальный middleware для обработки ошибок в Express приложении
const errorHandler = (err, req, res, next) => {
    // Проверяем, является ли ошибка операционной (ожидаемой)
    if (err.isOperational) {
        // Возвращаем клиенту структурированный ответ с кодом ошибки
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    // Если ошибка не операционная (неожиданная, программная)
    console.error("Необработанная ошибка:", err);
    // Возвращаем клиенту общее сообщение без технических деталей
    res.status(500).json({
        status: "error",
        message: "Что-то пошло не так. Пожалуйста, попробуйте позже.",
    });
};
// Экспортируем middleware для подключения в app.js
export default errorHandler;
// Класс для создания кастомных ошибок приложения
class AppError extends Error {
    // Конструктор принимает сообщение об ошибке и HTTP статус-код
    constructor(message, statusCode) {
        // Вызов конструктора родительского класса Error с сообщением
        super(message);
        // Сохраняем HTTP статус-код ошибки
        this.statusCode = statusCode;
        // Определяем статус ошибки: если код начинается с "4" (клиентская ошибка) - статус "fail", иначе - статус "error"
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        // Флаг, указывающий что это операционная ошибка (ожидаемая)
        this.isOperational = true;

        // Захватываем стек вызовов для отладки
        Error.captureStackTrace(this, this.constructor);
    }
}
// Экспортируем класс для использования в других модулях
export default AppError;
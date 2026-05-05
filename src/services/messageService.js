// Импорт клиента Prisma и кастомного класса ошибок
import prisma from '../prisma/prismaClient.js'
import AppError from '../utils/appError.js'

// Вспомогательная функция: поиск пользователя по supabaseId
async function getUserBySupabaseId(supabaseId) {
    const user = await prisma.user.findUnique({ where: { supabaseId } })
    if (!user) throw new AppError('Пользователь не найден', 404)
    return user
}

// Получить все сообщения конкретной комнаты
export async function getMessages(roomId) {
    // Проверяем существование комнаты
    const room = await prisma.room.findUnique({ where: { id: roomId } })
    if (!room) throw new AppError('Комната не найдена', 404)

    // Получаем сообщения с информацией об отправителе
    return prisma.message.findMany({
        where: { roomId }, // фильтр по комнате
        orderBy: { createdAt: 'asc' }, // сортировка от старых к новым
         // подгружаем данные отправителя
        include: { sender: { select: { id: true, name: true, email: true } } },
    })
}

// Отправить новое сообщение в комнату
export async function createMessage(roomId, supabaseId, content) {
    // Получаем пользователя по его supabaseId из токена
    const user = await getUserBySupabaseId(supabaseId)
    // Проверяем, состоит ли пользователь в комнате (участник ли он)
    const member = await prisma.roomMember.findUnique({ 
        where: { userId_roomId: { userId: user.id, roomId } } 
    })
    // Если не участник - запрещаем отправку сообщений
    if (!member) throw new AppError('Вы не являетесь участником этой комнаты', 403)

    // Создаём сообщение и сразу возвращаем его с данными отправителя
    return prisma.message.create({
        data: { roomId, senderId: user.id, content },
        include: { sender: { select: { id: true, name: true, email: true } } },
    })
}
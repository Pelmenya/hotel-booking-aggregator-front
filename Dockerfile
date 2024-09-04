# Использование официального образа Node.js
FROM node:18 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --force

# Копируем остальные файлы
COPY . .

# Собираем проект
RUN npm run build

# Используем другой образ для продакшена
FROM node:18-alpine AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Устанавливаем переменные окружения
ENV NODE_ENV=production

# Запускаем приложение
CMD ["npm", "run", "start"]


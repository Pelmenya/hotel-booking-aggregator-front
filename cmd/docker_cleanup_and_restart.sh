#!/bin/bash

# Функция для обработки ошибок
handle_error() {
    echo "Error on line $1"
    exit 1
}

# Установить обработчик ошибок
trap 'handle_error $LINENO' ERR

# Перейти в корневую директорию проекта (если скрипт запускается не из корневой директории)
cd "$(dirname "$0")/.." || exit

# Подтянуть последние изменения из удаленного репозитория
echo "Pulling latest changes from git..."
git pull
if [ $? -ne 0 ]; then
    echo "Git pull failed. Exiting."
    exit 1
fi

# Остановка и удаление текущих контейнеров
echo "Stopping and removing current containers..."
docker-compose down
if [ $? -ne 0 ]; then
    echo "Failed to stop and remove containers. Exiting."
    exit 1
fi

# Очистка остановленных контейнеров
echo "Pruning stopped containers..."
docker container prune -f
if [ $? -ne 0 ]; then
    echo "Failed to prune stopped containers. Exiting."
    exit 1
fi

# Очистка неиспользуемых образов
echo "Pruning unused images..."
docker image prune -f
if [ $? -ne 0 ]; then
    echo "Failed to prune unused images. Exiting."
    exit 1
fi

# Очистка неиспользуемых томов
echo "Pruning unused volumes..."
docker volume prune -f
if [ $? -ne 0 ]; then
    echo "Failed to prune unused volumes. Exiting."
    exit 1
fi

# Очистка неиспользуемых сетей
echo "Pruning unused networks..."
docker network prune -f
if [ $? -ne 0 ]; then
    echo "Failed to prune unused networks. Exiting."
    exit 1
fi

# Очистка всех неиспользуемых ресурсов
echo "Pruning all unused resources..."
docker system prune -a -f
if [ $? -ne 0 ]; then
    echo "Failed to prune all unused resources. Exiting."
    exit 1
fi

# Перезапуск контейнеров с пересборкой образов
echo "Rebuilding and starting containers..."
nohup docker-compose up --build -d > docker-compose.log 2>&1 &
if [ $? -ne 0 ]; then
    echo "Failed to rebuild and start containers. Exiting."
    exit 1
fi

echo "Deployment completed successfully."

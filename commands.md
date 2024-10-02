# dev

* docker-compose --env-file .env.local -f docker-compose.dev.yml  up --build 

# prod

* docker compose -f docker-compose.yml up --build

# Скрипт для подтягивания изменений из папки cmd. Установка от админа. Обязательно!!!  

* chmod +x  /home/hotel-booking-aggregator-front/cmd/docker_cleanup_and_restart.sh

# Скрипт для подтягивания изменений из папки cmd. Исполнение на сервере вручную 

* cmd/docker_cleanup_and_restart.sh

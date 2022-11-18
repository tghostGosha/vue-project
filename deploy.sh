#!/usr/bin/env sh

# остановить публикацию при ошибках
set -en

# сборка приложения 
npm run build

# переход в каталог сборки 
cd dist

#Инициализация репозитория и загрузка кода github
git init
git add -A 
git commit -m 'deploy'

$ git push -f https://github.com/tghostGosha/vue-app.git master:gh-pages

cd -

# sh deploy.sh прописать в командно  строке
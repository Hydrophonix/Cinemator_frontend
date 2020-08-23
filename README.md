<!-- local -->

npm i

.production.env {
    APP_NAME
    PUBLIC_URL
    API_URL
}

npm run build

docker build -t arziburst/cinemator-frontend .

docker push arziburst/cinemator-frontend

<!-- droplet -->

docker pull arziburst/cinemator-frontend

docker tag arziburst/cinemator-frontend dokku/frontend

dokku tags:deploy frontend
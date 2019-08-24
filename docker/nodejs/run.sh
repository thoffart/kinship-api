#!/bin/sh

echo '==============================================='
echo 'Testando versão do node e npm'
echo '==============================================='
echo ''

node -v
npm -v

echo ''
echo '==============================================='
echo 'Instalação dos pacotes do projeto'
echo '==============================================='
echo ''

npm i --no-optional

echo ''
echo '==============================================='
echo "Executando no ambiente ${ENVIRONMENT}"
echo '==============================================='
echo ''

echo ''
echo '==============================================='
echo "Executando migrations"
echo '==============================================='
echo ''

npm run typeorm migration:run

if [ "${ENVIRONMENT}" = 'dev' ]; then
  npm run start:dev
elif [ "${ENVIRONMENT}" = 'debug' ]; then
  npm run start:debug
else
  # preparar scripr para prod
  npm run build:prod:aot
  npm run server:prod 3000
fi

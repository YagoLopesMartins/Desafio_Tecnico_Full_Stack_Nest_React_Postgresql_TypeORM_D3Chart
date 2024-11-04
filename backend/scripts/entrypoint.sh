#!/bin/bash

# Exibe uma mensagem de início do entrypoint
echo "Iniciando o container e executando setup..."

# Aguarda o banco de dados ficar pronto antes de iniciar
echo "Esperando o banco de dados estar pronto..."
until nc -z $DATABASE_HOST $DATABASE_PORT; do
  echo "Banco de dados não está pronto ainda. Aguardando..."
  sleep 2
done
echo "Banco de dados conectado com sucesso!"

# Instala as dependências
npm install

# Aplica as migrations
echo "Aplicando migrations..."
npm run typeorm migration:run

# Executa os seeds
echo "Executando seeds..."
for seed in src/database/seeds/*.{js,ts}; do
  if [ -e "$seed" ]; then # Verifica se o arquivo existe
    echo "Executando seed: $seed"
    node "$seed" # Executa o arquivo .js
  fi
done

npm run start:dev



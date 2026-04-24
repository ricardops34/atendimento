# Estágio 1: Build
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# Estágio 2: Execução (Imagem final leve)
FROM node:22-alpine

WORKDIR /usr/src/app

# Copia apenas o necessário do estágio de build
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]

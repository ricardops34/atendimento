FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
COPY prisma ./prisma/

# Instala as dependências e gera o Prisma Client
RUN npm install

# Copia o restante do código fonte
COPY . .

# Executa o build da aplicação NestJS
RUN npm run build

# Prepara a imagem de produção
FROM node:20-alpine

WORKDIR /app

# Copia apenas o que é necessário para a produção
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm", "run", "start:prod" ]

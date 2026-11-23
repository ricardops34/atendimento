FROM node:24-alpine AS builder

WORKDIR /app

# Confia em uma CA de inspeção SSL local (ex: antivírus corporativo), se presente no
# contexto de build. Em máquinas/CI sem esse arquivo, o COPY glob não copia nada e o build
# segue normalmente com o bundle padrão do sistema.
COPY *.cr[t] ./
RUN for f in *.crt; do [ -f "$f" ] && cat "$f" >> /etc/ssl/certs/ca-certificates.crt; done 2>/dev/null; true
ENV NODE_OPTIONS=--use-openssl-ca

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
FROM node:24-alpine

WORKDIR /app

# Copia apenas o que é necessário para a produção
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt

# Variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3000
ENV NODE_OPTIONS=--use-openssl-ca

EXPOSE 3000

# Comando para iniciar a aplicação (Forçando caminho devido ao cache do Docker)
CMD [ "node", "dist/src/main.js" ]

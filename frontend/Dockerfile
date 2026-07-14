FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o restante do código fonte
COPY . .

# Executa o build do Angular (production por padrão; local test usa development)
ARG BUILD_CONFIGURATION=production
RUN npm run build -- --configuration=$BUILD_CONFIGURATION

# Prepara a imagem do Nginx para servir a aplicação
FROM nginx:alpine

# Substitui a configuração padrão do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos gerados pelo Angular para a pasta do Nginx
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

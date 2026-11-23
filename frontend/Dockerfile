FROM node:24-alpine AS builder

WORKDIR /app

# Confia em uma CA de inspeção SSL local (ex: antivírus corporativo), se presente no
# contexto de build. Em máquinas/CI sem esse arquivo, o COPY glob não copia nada e o build
# segue normalmente com o bundle padrão do sistema.
COPY *.cr[t] ./
RUN for f in *.crt; do [ -f "$f" ] && cat "$f" >> /etc/ssl/certs/ca-certificates.crt; done 2>/dev/null; true
ENV NODE_OPTIONS=--use-openssl-ca

# Copia arquivos de dependência e instala
COPY package*.json ./
RUN npm ci

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

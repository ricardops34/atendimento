FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=dist/web

FROM nginx:alpine
# Caminho ajustado para garantir compatibilidade com Angular 17+
COPY --from=build /app/dist/web/browser /usr/share/nginx/html
# Adicionamos uma configuração customizada para o Nginx lidar com rotas do Angular (Single Page Application)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

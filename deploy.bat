@echo off
echo 🐳 Iniciando Build das Imagens SaaS (bjsoftware)...

echo 🔐 Fazendo Login no Docker Hub...
docker login

echo ⚙️ Construindo API...
docker build -t bjsoftware/saas-api:latest ./api

echo 🎨 Construindo Web...
docker build -t bjsoftware/saas-web:latest ./web

echo 📤 Enviando imagens para a nuvem...
docker push bjsoftware/saas-api:latest
docker push bjsoftware/saas-web:latest

echo ✅ Imagens enviadas com sucesso para bjsoftware!
pause

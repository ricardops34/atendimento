@echo off
echo 🐳 Iniciando Build das Imagens SaaS...

:: 1. Login no Docker Hub (Certifique-se de estar logado no Docker Desktop)
echo 🔐 Fazendo Login no Docker Hub...
docker login

:: 2. Build do Backend
echo ⚙️ Construindo API...
docker build -t ricardops34/saas-api:latest ./api

:: 3. Build do Frontend
echo 🎨 Construindo Web...
docker build -t ricardops34/saas-web:latest ./web

:: 4. Push para o Docker Hub
echo 📤 Enviando imagens para a nuvem...
docker push ricardops34/saas-api:latest
docker push ricardops34/saas-web:latest

echo ✅ Imagens enviadas com sucesso! Agora voce ja pode dar o Deploy no Portainer.
pause

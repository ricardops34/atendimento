Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " Iniciando Publicação no Docker Hub" -ForegroundColor Cyan
Write-Host " Organização: bjsoftware" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Cyan

# Função para checar erros
function Check-Error {
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Ocorreu um erro no último comando. Abortando script." -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

# 1. Backend
Write-Host "`n[1/2] Fazendo build do Backend..." -ForegroundColor Green
cd backend
docker build -t bjsoftware/atendimento-backend:latest .
Check-Error

Write-Host "Enviando Backend para o Docker Hub..." -ForegroundColor Green
docker push bjsoftware/atendimento-backend:latest
Check-Error
cd ..

# 2. Frontend
Write-Host "`n[2/2] Fazendo build do Frontend..." -ForegroundColor Green
cd frontend
docker build -t bjsoftware/atendimento-frontend:latest .
Check-Error

Write-Host "Enviando Frontend para o Docker Hub..." -ForegroundColor Green
docker push bjsoftware/atendimento-frontend:latest
Check-Error
cd ..

Write-Host "`n=========================================" -ForegroundColor Cyan
Write-Host " Sucesso! Imagens publicadas com exito." -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan

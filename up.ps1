# up.ps1

Write-Host "Lendo configurações do .env..."

# Carrega variáveis do .env
$envFile = ".\.env"
if (-Not (Test-Path $envFile)) {
    Write-Error ".env file não encontrado!"
    exit 1
}
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*([^#=]+)\s*=\s*(.*)\s*$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim('"').Trim()
        [System.Environment]::SetEnvironmentVariable($name, $value)
    }
}

$containerName = "laravel-db"

# Verifica se o container já existe
$containerExists = docker ps -a --filter "name=$containerName" --format "{{.Names}}" | Select-String $containerName

if ($containerExists) {
    Write-Host "Container '$containerName' já existe. Usando ele..."
    # Se o container não estiver rodando, inicia ele
    $isRunning = docker ps --filter "name=$containerName" --filter "status=running" --format "{{.Names}}" | Select-String $containerName
    if (-not $isRunning) {
        Write-Host "Iniciando container '$containerName'..."
        docker start $containerName | Out-Null
    }
} else {
    Write-Host "Criando e iniciando container PostgreSQL..."
    docker run -d --name $containerName `
        -p 5432:5432 `
        -e POSTGRES_DB=$env:DB_DATABASE `
        -e POSTGRES_USER=$env:DB_USERNAME `
        -e POSTGRES_PASSWORD=$env:DB_PASSWORD `
        -v "${PWD}/pgdata:/var/lib/postgresql/data" `
        postgres:latest
}

Write-Host "Aguardando o banco de dados iniciar..."
Start-Sleep -Seconds 10

Write-Host "Instalando dependências Node.js..."
npm install

Write-Host "Criando Build..."
npm run build

Write-Host "Gerando APP_KEY do Laravel (se ainda não gerada)..."
php artisan key:generate

Write-Host "Rodando migrations..."
php artisan migrate --force

Write-Host "Iniciando servidor Laravel..."
php artisan serve --host=0.0.0.0 --port=8000

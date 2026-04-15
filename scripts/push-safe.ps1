# Push para origin/main só depois de alinhar com o GitHub (repositório-mãe).
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
Set-Location (Resolve-Path (Join-Path $PSScriptRoot ".."))

$dirty = git status --porcelain
if ($dirty) {
    Write-Error "Working tree não está limpo. Faça commit ou stash antes do push seguro."
    exit 1
}

git fetch origin

$branch = git rev-parse --abbrev-ref HEAD
if ($branch -ne "main") {
    Write-Warning "Branch atual: '$branch'. Este script usa origin/main como referência."
}

$behind = [int](git rev-list --count HEAD..origin/main)
$ahead = [int](git rev-list --count origin/main..HEAD)

Write-Host "Após fetch: $ahead commit(s) locais não enviados; $behind commit(s) em origin/main que você ainda não tem."

if ($behind -gt 0) {
    Write-Host "Alinhando com origin/main (git pull --rebase origin main)..."
    git pull --rebase origin main
}

git push origin main
Write-Host "Push concluído."

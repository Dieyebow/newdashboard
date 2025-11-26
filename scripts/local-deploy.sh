#!/bin/bash

# Script de déploiement local
# Pull les derniers changements et lance le serveur de développement

set -e  # Arrêter en cas d'erreur

echo "🔄 Récupération des derniers changements..."

# Récupérer la branche actuelle
CURRENT_BRANCH=$(git branch --show-current)

# Pull les changements
git pull origin "$CURRENT_BRANCH"

echo "✅ Changements récupérés avec succès!"

# Vérifier si des dépendances ont été modifiées
if git diff HEAD@{1} HEAD --name-only | grep -q "package.json"; then
  echo "📦 package.json a été modifié, installation des dépendances..."
  npm install
  echo "✅ Dépendances installées!"
fi

echo "🚀 Démarrage du serveur de développement..."
echo ""
echo "📍 L'application sera disponible sur http://localhost:5173/"
echo "⌨️  Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

# Lancer le serveur de développement
npm run dev

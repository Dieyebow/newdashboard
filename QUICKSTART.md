# 🚀 Quick Start - PeeloCar Dashboard

Guide de démarrage rapide pour lancer le dashboard en 5 minutes.

## 📦 Installation (2 minutes)

```bash
# 1. Cloner le projet
git clone <repository-url>
cd newdashboard

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
```

## 🔑 Configuration (1 minute)

Le fichier `.env` est déjà configuré avec l'URL de l'API:
```env
VITE_API_URL=https://autoecole.mojay.pro
```

## 🎯 Lancement (30 secondes)

```bash
npm run dev
```

✅ L'application est maintenant disponible sur **http://localhost:5173**

## 🔐 Connexion (1 minute)

1. Ouvrez http://localhost:5173/login dans votre navigateur

2. Collez le token JWT fourni dans votre documentation

3. Cliquez sur "Se connecter"

4. Vous êtes redirigé vers le dashboard ! 🎉

## 📱 Navigation

Une fois connecté, vous avez accès à:

- **Dashboard** (/) - Vue d'ensemble avec KPIs et graphiques
- **Cours** (/courses) - Gestion des cours de code
- **Quiz** (/quizz) - Gestion des quiz et questions
- **Élèves** (/students) - Liste et recherche d'élèves
- **Auto-écoles** (/autoecoles) - Statistiques des auto-écoles
- **Statistiques** (/stats) - Analyses avancées

## 🛠️ Commandes utiles

```bash
# Développement
npm run dev              # Lancer le serveur de dev
npm run build           # Build de production
npm run preview         # Prévisualiser le build
npm run lint            # Vérifier le code
npm run type-check      # Vérifier les types TypeScript

# Nettoyage
npm run clean           # Nettoyer les fichiers de build
```

## 🚀 Déploiement en 1 clic

### Vercel (Recommandé)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Cliquer sur le bouton "Deploy"
2. Connecter votre repository GitHub
3. Ajouter la variable d'environnement:
   - `VITE_API_URL`: `https://autoecole.mojay.pro`
4. Déployer !

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Cliquer sur le bouton "Deploy to Netlify"
2. Connecter votre repository
3. Ajouter la variable d'environnement
4. Déployer !

### Docker

```bash
# Build et lancement en une commande
docker-compose up -d

# L'application sera disponible sur http://localhost:3000
```

## 📊 Données de test

Le dashboard se connecte à l'API production et affiche les données réelles:

- **8 auto-écoles** enregistrées
- **456+ élèves** inscrits
- **25 quiz** disponibles
- **18 cours** de code
- **3542+ tests** effectués

## 🎨 Personnalisation

### Changer les couleurs

Éditez `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#3b82f6',  // Couleur principale
    600: '#2563eb',  // Couleur au survol
    // ...
  },
}
```

### Changer le logo

Remplacez le texte dans `src/components/layout/Sidebar.tsx` ligne 42:

```typescript
<h1 className="text-xl font-bold text-primary-600">
  Votre Logo Ici
</h1>
```

## 🆘 Problèmes courants

### Port 5173 déjà utilisé

```bash
# Utiliser un autre port
npm run dev -- --port 3000
```

### Erreur "Cannot find module"

```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Page blanche après build

```bash
# Vérifier que les variables d'environnement sont définies
cat .env

# Rebuild
npm run build
```

## 📚 Ressources

- [README complet](./README.md)
- [Guide de déploiement](./DEPLOYMENT.md)
- [Guide de contribution](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)

## 💡 Astuce pro

Pour un développement optimal:

```bash
# Terminal 1: Serveur de dev
npm run dev

# Terminal 2: Vérification des types en temps réel
npm run type-check -- --watch
```

## 🎉 C'est tout !

Vous êtes prêt à utiliser le PeeloCar Dashboard. Bon développement !

---

**Questions?** Consultez le [README](./README.md) ou ouvrez une [issue](https://github.com/Dieyebow/newdashboard/issues).

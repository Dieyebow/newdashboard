# 🚗 PeeloCar Dashboard

Tableau de bord moderne et réactif pour la gestion de l'auto-école PeeloCar. Construit avec React, TypeScript, TailwindCSS et Vite.

## ✨ Fonctionnalités

- 📊 **Dashboard**: Vue d'ensemble avec KPIs, graphiques de croissance, tests récents et leaderboard
- 📚 **Gestion des Cours**: Affichage, visualisation et modification des cours de code de la route
- 📝 **Gestion des Quiz**: Liste des quiz avec statistiques, questions détaillées et modifications
- 👥 **Gestion des Élèves**: Liste paginée, recherche et suivi des inscriptions
- 🏫 **Gestion des Auto-écoles**: Statistiques, nombre d'élèves par auto-école
- 📈 **Statistiques avancées**: Graphiques de performance, répartition des élèves, évolution des inscriptions
- 🔐 **Authentification JWT**: Système de connexion sécurisé par token

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le dépôt
git clone <repository-url>
cd newdashboard

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Éditer .env avec votre URL d'API
# VITE_API_URL=https://autoecole.mojay.pro
```

### Développement

```bash
# Lancer le serveur de développement
npm run dev

# L'application sera disponible sur http://localhost:5173
```

### Build de production

```bash
# Créer le build de production
npm run build

# Prévisualiser le build de production
npm run preview
```

## 🔑 Configuration de l'authentification

1. Rendez-vous sur `/login`
2. Collez votre token JWT dans le champ de texte
3. Cliquez sur "Se connecter"

Le token sera stocké localement et inclus automatiquement dans toutes les requêtes API.

## 📦 Technologies utilisées

- **React 18**: Bibliothèque UI
- **TypeScript**: Typage statique
- **Vite**: Build tool et dev server
- **TailwindCSS 3**: Framework CSS utility-first
- **React Router**: Routing côté client
- **TanStack Query (React Query)**: Gestion d'état serveur et cache
- **Zustand**: Gestion d'état global (auth)
- **Axios**: Client HTTP
- **Recharts**: Bibliothèque de graphiques
- **Lucide React**: Icônes

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── layout/         # Layout (Sidebar, Navbar)
│   ├── dashboard/      # Composants du dashboard
│   ├── courses/        # Composants de gestion des cours
│   └── quizz/          # Composants de gestion des quiz
├── pages/              # Pages de l'application
│   ├── Dashboard.tsx   # Page principale
│   ├── Courses.tsx     # Gestion des cours
│   ├── Quizz.tsx       # Gestion des quiz
│   ├── Students.tsx    # Gestion des élèves
│   ├── Autoecoles.tsx  # Gestion des auto-écoles
│   ├── Stats.tsx       # Statistiques avancées
│   └── Login.tsx       # Page de connexion
├── services/           # Services API
│   └── api.ts          # Configuration axios et endpoints
├── store/              # State management
│   └── authStore.ts    # Store d'authentification (Zustand)
├── types/              # Définitions TypeScript
│   └── index.ts        # Interfaces et types
└── App.tsx             # Configuration des routes
```

## 🔌 API Endpoints

Le dashboard consomme l'API PeeloCar avec les endpoints suivants:

### Authentification
- Toutes les routes nécessitent un header `Authorization: Bearer <token>`

### Endpoints principaux
- `GET /dashboard/kpis/global` - KPIs globaux
- `GET /dashboard/courses/list` - Liste des cours
- `GET /dashboard/quizz/list` - Liste des quiz
- `GET /dashboard/students/list` - Liste des élèves
- `GET /dashboard/autoecoles/stats` - Statistiques des auto-écoles
- `GET /dashboard/tests/leaderboard` - Classement des élèves

Voir la documentation API complète pour tous les endpoints disponibles.

## 🎨 Fonctionnalités par page

### Dashboard (/)
- KPI cards (auto-écoles, élèves, quiz, cours, tests, en formation)
- Graphique de croissance des inscriptions
- Tests récents
- Leaderboard des meilleurs élèves

### Cours (/courses)
- Liste des cours avec nombre de chapitres
- Visualisation détaillée des sections
- Modification des cours (interface basique)
- Statistiques: total cours, sections, moyennes

### Quiz (/quizz)
- Liste des quiz avec nombre de questions
- Visualisation des questions avec images
- Affichage des bonnes réponses
- Quiz les plus populaires
- Statistiques détaillées

### Élèves (/students)
- Liste paginée des élèves
- Recherche par nom, téléphone ou auto-école
- Affichage des informations: nom, tel, auto-école, date d'inscription

### Auto-écoles (/autoecoles)
- Liste des auto-écoles avec leurs statistiques
- Nombre d'élèves par auto-école
- Top 5 des auto-écoles
- Informations sur les administrateurs

### Statistiques (/stats)
- Taux de réussite moyen
- Graphique d'évolution des inscriptions
- Répartition des élèves par auto-école (Pie chart)
- Performance des auto-écoles (Bar chart)
- Statistiques détaillées des tests

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet:

```env
VITE_API_URL=https://autoecole.mojay.pro
```

### Personnalisation des couleurs

Les couleurs principales sont définies dans `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    // ...
    900: '#1e3a8a',
  },
}
```

## 🚀 Déploiement

### Build

```bash
npm run build
```

Le dossier `dist/` contiendra les fichiers statiques prêts pour le déploiement.

### Serveur

Vous pouvez déployer sur:
- Vercel
- Netlify
- GitHub Pages
- Tout serveur web statique (nginx, Apache, etc.)

### Configuration nginx (exemple)

```nginx
server {
    listen 80;
    server_name dashboard.autoecole.mojay.pro;
    root /var/www/dashboard/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 📄 Licence

Ce projet est sous licence propriétaire - PeeloCar © 2025

## 👤 Auteur

**Mamadou DIEYE**
- Email: dieyebow@gmail.com

---

⭐ N'oubliez pas de star ce projet si vous le trouvez utile!

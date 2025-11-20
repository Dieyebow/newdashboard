# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2025-11-20

### Ajouté
- 🎉 Version initiale du PeeloCar Dashboard
- 📊 Dashboard principal avec KPIs et statistiques
  - 6 KPI cards (auto-écoles, élèves, quiz, cours, tests, formation)
  - Graphique de croissance des inscriptions
  - Liste des tests récents
  - Leaderboard des meilleurs élèves
- 📚 Gestion des cours
  - Liste des cours avec pagination
  - Visualisation détaillée des sections
  - Modal de modification
  - Statistiques: total cours, sections, moyennes
- 📝 Gestion des quiz
  - Liste des quiz avec nombre de questions
  - Visualisation des questions avec images
  - Affichage des bonnes réponses
  - Quiz les plus populaires
  - Statistiques détaillées
- 👥 Gestion des élèves
  - Liste paginée (10 élèves/page)
  - Recherche par nom, téléphone ou auto-école
  - Affichage des informations complètes
  - Statistiques des élèves
- 🏫 Gestion des auto-écoles
  - Liste des auto-écoles avec statistiques
  - Nombre d'élèves par auto-école
  - Top 5 des auto-écoles
  - Informations des administrateurs
- 📈 Page de statistiques avancées
  - Graphique d'évolution des inscriptions (Line chart)
  - Répartition des élèves par auto-école (Pie chart)
  - Performance des auto-écoles (Bar chart)
  - Statistiques détaillées des tests
- 🔐 Système d'authentification
  - Login avec token JWT
  - Protection des routes
  - Stockage local du token
  - Déconnexion sécurisée
- 🎨 Interface utilisateur moderne
  - Design responsive (mobile, tablette, desktop)
  - TailwindCSS 3 pour le styling
  - Composants réutilisables
  - Animations et transitions fluides
- 🔌 Intégration API complète
  - 34+ endpoints intégrés
  - Gestion automatique du token JWT
  - Cache avec React Query
  - Gestion des erreurs
- 📦 Configuration de développement
  - Vite pour un dev server ultra-rapide
  - TypeScript pour la sécurité des types
  - ESLint pour la qualité du code
  - Prettier pour le formatage
- 🚀 Support de déploiement
  - Configuration Vercel
  - Configuration Netlify
  - Dockerfile pour Docker
  - Docker Compose
  - Configuration Nginx
  - GitHub Actions CI/CD
- 📖 Documentation complète
  - README détaillé
  - Guide de contribution (CONTRIBUTING.md)
  - Guide de déploiement (DEPLOYMENT.md)
  - Changelog

### Technique
- React 18.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- TailwindCSS 3.4.18
- React Router 7.9.6
- TanStack Query 5.90.10
- Zustand 5.0.8
- Axios 1.13.2
- Recharts 3.4.1
- Lucide React 0.554.0

## [Unreleased]

### À venir
- [ ] Modification complète des cours (éditeur riche)
- [ ] Modification complète des quiz (ajout/suppression de questions)
- [ ] Ajout d'élèves depuis le dashboard
- [ ] Export des données (CSV, Excel)
- [ ] Notifications temps réel
- [ ] Mode sombre
- [ ] Filtres avancés sur toutes les pages
- [ ] Système de commentaires
- [ ] Rapports PDF générés automatiquement
- [ ] Analytics avancés avec graphiques interactifs
- [ ] Gestion des permissions utilisateurs
- [ ] Historique des modifications
- [ ] Backup automatique des données

---

## Types de changements

- `Ajouté` pour les nouvelles fonctionnalités
- `Modifié` pour les changements dans les fonctionnalités existantes
- `Obsolète` pour les fonctionnalités qui seront bientôt supprimées
- `Supprimé` pour les fonctionnalités supprimées
- `Corrigé` pour les corrections de bugs
- `Sécurité` pour les vulnérabilités corrigées

# 🚀 Guide de déploiement - PeeloCar Dashboard

Ce guide décrit les différentes options pour déployer le PeeloCar Dashboard en production.

## 📋 Prérequis

- Node.js 18+ installé
- Compte sur une plateforme de déploiement (Vercel, Netlify, etc.)
- Accès au repository Git

## 🔧 Préparation

### 1. Variables d'environnement

Créer un fichier `.env.production` avec:

```env
VITE_API_URL=https://autoecole.mojay.pro
```

### 2. Build de production

```bash
npm run build:prod
```

Le dossier `dist/` contient les fichiers prêts pour le déploiement.

## 🌐 Options de déploiement

### Option 1: Vercel (Recommandé)

Vercel offre le déploiement le plus simple avec support natif de Vite.

#### Via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

#### Via GitHub

1. Aller sur [vercel.com](https://vercel.com)
2. Importer le repository GitHub
3. Configurer les variables d'environnement:
   - `VITE_API_URL`: `https://autoecole.mojay.pro`
4. Déployer

**Configuration automatique** (vercel.json):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "routes": [
    {
      "src": "/[^.]+",
      "dest": "/",
      "status": 200
    }
  ]
}
```

### Option 2: Netlify

#### Via CLI

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy

# Déployer en production
netlify deploy --prod
```

#### Via Dashboard

1. Aller sur [app.netlify.com](https://app.netlify.com)
2. "Add new site" > "Import an existing project"
3. Connecter le repository GitHub
4. Configuration:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Variables d'environnement:
   - `VITE_API_URL`: `https://autoecole.mojay.pro`
6. Déployer

**Configuration** (netlify.toml):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: GitHub Pages

#### Via CLI

```bash
# Installer gh-pages
npm i -D gh-pages

# Ajouter au package.json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}

# Déployer
npm run deploy
```

**Important**: Ajouter `base: '/newdashboard/'` dans `vite.config.ts` si le repo n'est pas à la racine.

### Option 4: Serveur VPS (Ubuntu/Debian)

#### 1. Installation des prérequis

```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Installer Nginx
sudo apt install -y nginx

# Installer PM2 (optionnel, pour le preview)
sudo npm install -g pm2
```

#### 2. Cloner et builder

```bash
# Cloner le projet
cd /var/www
sudo git clone <repository-url> peelocar-dashboard
cd peelocar-dashboard

# Installer les dépendances
sudo npm install

# Créer .env
sudo nano .env
# Ajouter: VITE_API_URL=https://autoecole.mojay.pro

# Builder
sudo npm run build
```

#### 3. Configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/peelocar-dashboard
```

```nginx
server {
    listen 80;
    server_name dashboard.autoecole.mojay.pro;
    root /var/www/peelocar-dashboard/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/javascript application/json;

    # Cache statique
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Fallback pour React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/peelocar-dashboard /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Recharger Nginx
sudo systemctl reload nginx
```

#### 4. SSL avec Let's Encrypt

```bash
# Installer Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtenir le certificat
sudo certbot --nginx -d dashboard.autoecole.mojay.pro

# Renouvellement automatique
sudo certbot renew --dry-run
```

### Option 5: Docker

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Docker Compose

```yaml
version: '3.8'
services:
  dashboard:
    build: .
    ports:
      - "3000:80"
    environment:
      - VITE_API_URL=https://autoecole.mojay.pro
    restart: unless-stopped
```

#### Commandes

```bash
# Builder l'image
docker build -t peelocar-dashboard .

# Lancer le conteneur
docker run -d -p 3000:80 --name dashboard peelocar-dashboard

# Avec Docker Compose
docker-compose up -d
```

## 🔍 Vérification post-déploiement

### Checklist

- [ ] L'application se charge correctement
- [ ] L'authentification fonctionne
- [ ] Les routes sont accessibles (pas de 404)
- [ ] Les API calls fonctionnent
- [ ] Les graphiques s'affichent
- [ ] Les images se chargent
- [ ] Les performances sont bonnes (Lighthouse score)
- [ ] Le responsive fonctionne (mobile/tablette)
- [ ] HTTPS est configuré
- [ ] Les logs d'erreur sont configurés

### Tests

```bash
# Tester la page d'accueil
curl -I https://dashboard.autoecole.mojay.pro

# Tester que les routes fonctionnent
curl https://dashboard.autoecole.mojay.pro/courses

# Vérifier le temps de réponse
curl -w "@curl-format.txt" -o /dev/null -s https://dashboard.autoecole.mojay.pro
```

## 📊 Monitoring

### Google Analytics (optionnel)

Ajouter dans `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sentry (Error tracking)

```bash
npm install @sentry/react @sentry/vite-plugin
```

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

## 🔄 Mise à jour

### Mise à jour manuelle

```bash
# Sur le serveur
cd /var/www/peelocar-dashboard
sudo git pull origin main
sudo npm install
sudo npm run build
sudo systemctl reload nginx
```

### Mise à jour automatique (GitHub Actions)

Créer `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🆘 Dépannage

### Problème: Page blanche après déploiement

**Solution**:
- Vérifier que `base` dans `vite.config.ts` est correct
- Vérifier les logs du navigateur (F12)
- Vérifier que les assets sont accessibles

### Problème: Les routes ne fonctionnent pas (404)

**Solution**:
- Vérifier la configuration du serveur (fallback vers index.html)
- Pour Nginx: `try_files $uri $uri/ /index.html;`
- Pour Vercel/Netlify: vérifier le fichier de configuration

### Problème: Variables d'environnement non définies

**Solution**:
- Les variables doivent commencer par `VITE_`
- Rebuild après modification des variables
- Vérifier qu'elles sont définies sur la plateforme de déploiement

### Problème: Erreurs CORS

**Solution**:
- Vérifier que l'API autorise le domaine du dashboard
- Configurer les headers CORS sur le serveur API

## 📞 Support

Pour toute question sur le déploiement:
- Email: dieyebow@gmail.com
- GitHub Issues: [Repository Issues](https://github.com/Dieyebow/newdashboard/issues)

---

Bon déploiement ! 🚀

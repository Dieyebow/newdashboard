# Guide de contribution - PeeloCar Dashboard

Merci de votre intérêt pour contribuer au PeeloCar Dashboard ! 🚗

## 🚀 Installation pour le développement

```bash
# Cloner le projet
git clone <repository-url>
cd newdashboard

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Lancer le serveur de développement
npm run dev
```

## 📁 Structure du projet

```
src/
├── components/     # Composants réutilisables
│   ├── layout/    # Layout (Sidebar, Navbar)
│   ├── dashboard/ # Composants du dashboard
│   ├── courses/   # Gestion des cours
│   └── quizz/     # Gestion des quiz
├── pages/         # Pages de l'application
├── services/      # Services API
├── store/         # State management (Zustand)
├── types/         # Types TypeScript
└── App.tsx        # Configuration des routes
```

## 🛠️ Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Crée le build de production
- `npm run build:prod` - Build de production avec vérification des types
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Exécute le linter
- `npm run type-check` - Vérifie les types TypeScript
- `npm run clean` - Nettoie les fichiers de build

## 🎨 Standards de code

### TypeScript
- Toujours typer les props et les fonctions
- Utiliser `interface` pour les objets, `type` pour les unions/intersections
- Éviter `any` autant que possible

### React
- Composants fonctionnels uniquement
- Utiliser les hooks React modernes
- Extraction de la logique dans des hooks personnalisés quand c'est pertinent

### Styling
- Utiliser TailwindCSS pour tout le styling
- Classes utilitaires en priorité
- Éviter le CSS personnalisé sauf si absolument nécessaire

### Nommage
- Composants: PascalCase (ex: `CourseCard.tsx`)
- Fonctions/variables: camelCase (ex: `getCourseDetails`)
- Constantes: SCREAMING_SNAKE_CASE (ex: `API_BASE_URL`)
- Fichiers: kebab-case pour les utils, PascalCase pour les composants

## 📝 Conventions de commit

Utiliser le format Conventional Commits:

```
type(scope): description

[body optionnel]

[footer optionnel]
```

**Types:**
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage, point-virgules manquants, etc.
- `refactor`: Refactoring du code
- `test`: Ajout de tests
- `chore`: Maintenance, dépendances, etc.

**Exemples:**
```
feat(courses): add course filtering by category
fix(auth): resolve token refresh issue
docs(readme): update installation instructions
```

## 🔀 Workflow Git

1. Créer une branche depuis `main`:
   ```bash
   git checkout -b feat/ma-nouvelle-fonctionnalite
   ```

2. Faire des commits atomiques et descriptifs

3. Pousser la branche:
   ```bash
   git push -u origin feat/ma-nouvelle-fonctionnalite
   ```

4. Créer une Pull Request sur GitHub

5. Attendre la revue de code et l'approbation

## 🧪 Tests

Avant de soumettre une PR:

1. Vérifier que le build fonctionne:
   ```bash
   npm run build:prod
   ```

2. Tester l'application localement:
   ```bash
   npm run preview
   ```

3. Vérifier qu'il n'y a pas d'erreurs de type:
   ```bash
   npm run type-check
   ```

## 🔌 Ajout de nouveaux endpoints API

1. Ajouter la méthode dans `src/services/api.ts`
2. Ajouter les types correspondants dans `src/types/index.ts`
3. Utiliser React Query pour la gestion du cache
4. Gérer les états de chargement et d'erreur

**Exemple:**
```typescript
// Dans api.ts
async getNewData() {
  return this.request({ method: 'GET', url: '/dashboard/new-data' });
}

// Dans le composant
const { data, isLoading, error } = useQuery({
  queryKey: ['newData'],
  queryFn: () => apiService.getNewData(),
});
```

## 🎨 Ajout de nouveaux composants

1. Créer le composant dans le dossier approprié
2. Typer toutes les props avec une interface
3. Exporter le composant par défaut
4. Utiliser TailwindCSS pour le styling

**Exemple:**
```typescript
import type { ReactNode } from 'react';

interface MyComponentProps {
  title: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function MyComponent({ title, children, onClick }: MyComponentProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div>{children}</div>
      {onClick && (
        <button onClick={onClick} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded">
          Action
        </button>
      )}
    </div>
  );
}
```

## 📦 Ajout de dépendances

- Minimiser l'ajout de nouvelles dépendances
- Privilégier les packages légers et bien maintenus
- Vérifier la taille du bundle après ajout
- Documenter pourquoi la dépendance est nécessaire dans la PR

## 🐛 Signalement de bugs

Utiliser les GitHub Issues avec le template suivant:

```markdown
**Description du bug**
Description claire et concise du bug.

**Comment reproduire**
1. Aller sur '...'
2. Cliquer sur '...'
3. Scroller jusqu'à '...'
4. Voir l'erreur

**Comportement attendu**
Description du comportement attendu.

**Captures d'écran**
Si applicable, ajouter des captures d'écran.

**Environnement:**
- OS: [ex: Windows 10]
- Navigateur: [ex: Chrome 120]
- Version: [ex: 1.0.0]
```

## 💡 Proposition de fonctionnalités

Utiliser les GitHub Issues avec le label `enhancement`:

```markdown
**Fonctionnalité souhaitée**
Description claire de la fonctionnalité.

**Cas d'usage**
Expliquer pourquoi cette fonctionnalité serait utile.

**Proposition de solution**
Description de comment vous envisagez la fonctionnalité.

**Alternatives considérées**
Autres approches envisagées.
```

## ❓ Questions

Pour toute question, n'hésitez pas à:
- Ouvrir une GitHub Issue avec le label `question`
- Contacter l'équipe via email: dieyebow@gmail.com

## 📄 Licence

En contribuant à ce projet, vous acceptez que vos contributions soient sous la même licence que le projet.

---

Merci pour vos contributions ! 🙏

# API Documentation - Gestion des Quiz (autoecoles_quizz)

## Base URL
```
https://autoecole.mojay.pro
```

Tous les endpoints nécessitent un header d'authentification :
```
Authorization: Bearer <token>
```

---

## Endpoints de Lecture (GET)

### 1. Compter les quiz
**GET** `/dashboard/quizz/count`

Retourne le nombre total de quiz dans la base de données.

**Réponse :**
```json
{
  "success": true,
  "count": 4
}
```

---

### 2. Lister les quiz (version légère)
**GET** `/dashboard/quizz/list`

Retourne la liste de tous les quiz avec le nombre de questions par quiz.

**Réponse :**
```json
{
  "success": true,
  "quizz": [
    {
      "_id": "667ae5aa6cf4978137fb0b19",
      "title": "Signalisation Horizontale",
      "number_quizz": 5
    },
    {
      "_id": "660438a43406fc5b369fe12b",
      "title": "Panneaux Triangles",
      "number_quizz": 7
    }
  ],
  "count": 2
}
```

---

### 3. Détails complets d'un quiz
**GET** `/dashboard/quizz/:id/details`

Retourne toutes les informations d'un quiz spécifique, incluant toutes les questions.

**Paramètres :**
- `id` (string) : MongoDB ObjectId du quiz

**Réponse :**
```json
{
  "success": true,
  "quizz": {
    "_id": "667ae5aa6cf4978137fb0b19",
    "title": "Signalisation Horizontale",
    "id_user": "65a03b6e2f704c698db2bba6",
    "list_quizz": [
      {
        "image": "https://example.com/image.jpg",
        "text": "Quelle est la vitesse maximale en ville?",
        "audio": "",
        "buttons": [
          {"id": "1", "title": "30 km/h"},
          {"id": "2", "title": "50 km/h"},
          {"id": "3", "title": "70 km/h"}
        ],
        "answer": {
          "audio": "",
          "text": "50 km/h"
        }
      }
    ],
    "created_at": "2025-11-27T20:00:20.168Z",
    "update_date": "2025-11-27T20:00:20.271Z"
  },
  "questionsCount": 1
}
```

---

### 4. Statistiques des quiz
**GET** `/dashboard/quizz/stats`

Retourne des statistiques globales sur les quiz (nombre total, nombre de questions, moyennes, etc.).

**Réponse :**
```json
{
  "success": true,
  "stats": {
    "totalQuizz": 4,
    "totalQuestions": 22,
    "avgQuestionsPerQuizz": 5.5,
    "minQuestions": 1,
    "maxQuestions": 9
  }
}
```

---

### 5. Quiz les plus populaires
**GET** `/dashboard/quizz/popular?limit=10`

Retourne les quiz les plus utilisés basé sur les tests effectués.

**Query Parameters :**
- `limit` (number, optional) : Nombre de quiz à retourner (défaut: 10)

**Réponse :**
```json
{
  "success": true,
  "popularQuizz": [
    {
      "_id": "667ae5aa6cf4978137fb0b19",
      "testCount": 1523,
      "avgScore": 75.32,
      "title": "Signalisation Horizontale"
    }
  ]
}
```

---

## Endpoints de Création (POST)

### 6. Créer un nouveau quiz
**POST** `/dashboard/quizz`

Crée un nouveau quiz vide (sans questions).

**Body (JSON) :**
```json
{
  "title": "Mon Nouveau Quiz",
  "id_user": "65a03b6e2f704c698db2bba6"
}
```

**Champs requis :**
- `title` (string) : Titre du quiz

**Champs optionnels :**
- `id_user` (string) : ID de l'utilisateur créateur (utilise req.user._id si non fourni)

**Réponse :**
```json
{
  "success": true,
  "message": "Quiz created successfully",
  "quizz_id": "6928add4f399385b17b20aa0"
}
```

---

### 7. Ajouter une question à un quiz
**POST** `/dashboard/quizz/:id/questions`

Ajoute une nouvelle question à la fin de la liste des questions d'un quiz.

**Paramètres :**
- `id` (string) : MongoDB ObjectId du quiz

**Body (JSON) :**
```json
{
  "text": "Quelle est la vitesse maximale en ville?",
  "image": "https://example.com/image.jpg",
  "audio": "https://example.com/audio.mp3",
  "buttons": [
    {"id": "1", "title": "30 km/h"},
    {"id": "2", "title": "50 km/h"},
    {"id": "3", "title": "70 km/h"}
  ],
  "answer": {
    "text": "50 km/h",
    "audio": "https://example.com/answer-audio.mp3"
  }
}
```

**Champs requis :**
- `text` (string) : Texte de la question
- `buttons` (array) : Liste des boutons de réponse
  - Chaque bouton doit avoir : `id` et `title`
- `answer` (object) : Réponse correcte
  - Doit avoir au minimum : `text`

**Champs optionnels :**
- `image` (string) : URL de l'image de la question
- `audio` (string) : URL de l'audio de la question
- `answer.audio` (string) : URL de l'audio de la réponse

**Réponse :**
```json
{
  "success": true,
  "message": "Question added successfully"
}
```

---

### 8. Upload d'image pour une question
**POST** `/dashboard/quizz/:id/questions/:index/upload-image`

Téléverse une image pour une question spécifique du quiz.

**Paramètres :**
- `id` (string) : MongoDB ObjectId du quiz
- `index` (number) : Index de la question dans list_quizz (commence à 0)

**Body (multipart/form-data) :**
- `image` (file) : Fichier image à uploader

**Réponse :**
```json
{
  "success": true,
  "imageUrl": "https://autoecole.mojay.pro/uploads/images/quiz_123_question_0_1234567890.jpg"
}
```

**Erreurs possibles :**
- Code 400 : Aucun fichier fourni ou format invalide
- Code 404 : Quiz ou question non trouvée
- Code 500 : Erreur lors de l'upload

---

### 9. Upload d'audio pour une question
**POST** `/dashboard/quizz/:id/questions/:index/upload-audio`

Téléverse un fichier audio pour la question.

**Paramètres :**
- `id` (string) : MongoDB ObjectId du quiz
- `index` (number) : Index de la question dans list_quizz (commence à 0)

**Body (multipart/form-data) :**
- `audio` (file) : Fichier audio à uploader

**Réponse :**
```json
{
  "success": true,
  "audioUrl": "https://autoecole.mojay.pro/uploads/audio/quiz_123_question_0_1234567890.mp3"
}
```

**Erreurs possibles :**
- Code 400 : Aucun fichier fourni ou format invalide
- Code 404 : Quiz ou question non trouvée
- Code 500 : Erreur lors de l'upload

---

### 10. Upload d'audio pour la réponse
**POST** `/dashboard/quizz/:id/questions/:index/upload-answer-audio`

Téléverse un fichier audio pour la réponse/explication de la question.

**Paramètres :**
- `id` (string) : MongoDB ObjectId du quiz
- `index` (number) : Index de la question dans list_quizz (commence à 0)

**Body (multipart/form-data) :**
- `audioanswer` (file) : Fichier audio à uploader

**Réponse :**
```json
{
  "success": true,
  "audioUrl": "https://autoecole.mojay.pro/uploads/audio/quiz_123_answer_0_1234567890.mp3"
}
```

**Erreurs possibles :**
- Code 400 : Aucun fichier fourni ou format invalide
- Code 404 : Quiz ou question non trouvée
- Code 500 : Erreur lors de l'upload

---

## Endpoints de Modification (PUT)

### 11. Modifier le titre d'un quiz
**PUT** `/dashboard/quizz/:id`

Modifie les métadonnées d'un quiz (actuellement : uniquement le titre).

**Paramètres :**
- `id` (string) : MongoDB ObjectId du quiz

**Body (JSON) :**
```json
{
  "title": "Nouveau Titre du Quiz"
}
```

**Champs requis :**
- `title` (string) : Nouveau titre du quiz

**Réponse :**
```json
{
  "success": true,
  "message": "Quiz updated successfully"
}
```

---

### 12. Modifier une question spécifique
**PUT** `/dashboard/quizz/:id/questions/:index`

Modifie une question existante dans un quiz.

**Paramètres :**
- `id` (string) : MongoDB ObjectId du quiz
- `index` (number) : Index de la question dans list_quizz (commence à 0)

**Body (JSON) :**
```json
{
  "text": "Quelle est la vitesse maximale autorisée en ville?",
  "image": "https://example.com/new-image.jpg",
  "audio": "https://example.com/new-audio.mp3",
  "buttons": [
    {"id": "1", "title": "30 km/h"},
    {"id": "2", "title": "50 km/h"},
    {"id": "3", "title": "70 km/h"},
    {"id": "4", "title": "90 km/h"}
  ],
  "answer": {
    "text": "50 km/h",
    "audio": "https://example.com/answer.mp3"
  }
}
```

**Champs requis :**
- `text` (string)
- `buttons` (array)
- `answer.text` (string)

**Champs optionnels :**
- `image` (string)
- `audio` (string)
- `answer.audio` (string)

**Réponse :**
```json
{
  "success": true,
  "message": "Question updated successfully"
}
```

---

## Endpoints de Suppression (DELETE)

### 13. Supprimer une question d'un quiz
**DELETE** `/dashboard/quizz/:id/questions/:index`

Supprime une question spécifique d'un quiz.

**Paramètres :**
- `id` (string) : MongoDB ObjectId du quiz
- `index` (number) : Index de la question à supprimer (commence à 0)

**Réponse :**
```json
{
  "success": true,
  "message": "Question deleted successfully"
}
```

**Erreurs possibles :**
- Code 400 : Index invalide (négatif ou non numérique)
- Code 500 : Quiz ou question non trouvée

---

### 14. Supprimer un quiz complet
**DELETE** `/dashboard/quizz/:id`

Supprime un quiz et toutes ses questions de la base de données.

**Paramètres :**
- `id` (string) : MongoDB ObjectId du quiz

**Réponse :**
```json
{
  "success": true,
  "message": "Quiz deleted successfully"
}
```

**Erreurs possibles :**
```json
{
  "success": false,
  "message": "Quiz not found"
}
```

---

## Structure des données

### Objet Quiz complet
```json
{
  "_id": "ObjectId",
  "title": "string",
  "id_user": "ObjectId",
  "list_quizz": [
    {
      "image": "string (URL)",
      "text": "string",
      "audio": "string (URL)",
      "buttons": [
        {
          "id": "string",
          "title": "string"
        }
      ],
      "answer": {
        "audio": "string (URL)",
        "text": "string"
      }
    }
  ],
  "created_at": "Date ISO 8601",
  "update_date": "Date ISO 8601"
}
```

---

## Exemples d'utilisation avec curl

### Créer un quiz
```bash
curl -X POST https://autoecole.mojay.pro/dashboard/quizz \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Code de la Route 2025",
    "id_user": "65a03b6e2f704c698db2bba6"
  }'
```

### Ajouter une question
```bash
curl -X POST https://autoecole.mojay.pro/dashboard/quizz/QUIZ_ID/questions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "À quelle distance doit-on signaler sa sortie sur autoroute?",
    "buttons": [
      {"id": "1", "title": "100m"},
      {"id": "2", "title": "200m"},
      {"id": "3", "title": "500m"}
    ],
    "answer": {
      "text": "200m"
    }
  }'
```

### Modifier une question
```bash
curl -X PUT https://autoecole.mojay.pro/dashboard/quizz/QUIZ_ID/questions/0 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Question modifiée",
    "buttons": [
      {"id": "1", "title": "Réponse A"},
      {"id": "2", "title": "Réponse B"}
    ],
    "answer": {
      "text": "Réponse A"
    }
  }'
```

### Supprimer une question
```bash
curl -X DELETE https://autoecole.mojay.pro/dashboard/quizz/QUIZ_ID/questions/0 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Supprimer un quiz
```bash
curl -X DELETE https://autoecole.mojay.pro/dashboard/quizz/QUIZ_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Upload d'image pour une question
```bash
curl -X POST https://autoecole.mojay.pro/dashboard/quizz/QUIZ_ID/questions/0/upload-image \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/image.jpg"
```

### Upload d'audio pour une question
```bash
curl -X POST https://autoecole.mojay.pro/dashboard/quizz/QUIZ_ID/questions/0/upload-audio \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "audio=@/path/to/audio.mp3"
```

### Upload d'audio pour la réponse
```bash
curl -X POST https://autoecole.mojay.pro/dashboard/quizz/QUIZ_ID/questions/0/upload-answer-audio \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "audioanswer=@/path/to/answer-audio.mp3"
```

---

## Notes importantes

1. **Authentification** : Tous les endpoints nécessitent un token JWT valide dans le header Authorization
2. **Format des dates** : Toutes les dates sont en format ISO 8601
3. **Index des questions** : Les questions sont indexées à partir de 0
4. **Mise à jour automatique** : Le champ `update_date` est automatiquement mis à jour lors de toute modification
5. **Validation** : Les champs requis sont validés côté serveur
6. **Upload de fichiers** : Des endpoints dédiés permettent l'upload d'images et d'audio (voir endpoints 8, 9, 10)

---

# API Documentation - Autres Endpoints

## Endpoints Students (Élèves)

### 15. Compter les élèves
**GET** `/dashboard/students/count`

Retourne le nombre total d'élèves inscrits.

**Réponse :**
```json
{
  "success": true,
  "count": 1523
}
```

---

### 16. Lister les élèves avec pagination
**GET** `/dashboard/students/list?page=1&limit=10&search=`

Retourne la liste paginée des élèves avec recherche optionnelle.

**Query Parameters :**
- `page` (number, optional) : Numéro de page (défaut: 1)
- `limit` (number, optional) : Nombre d'éléments par page (défaut: 10)
- `search` (string, optional) : Recherche par nom, prénom ou téléphone

**Réponse :**
```json
{
  "success": true,
  "students": [
    {
      "_id": "65a03b6e2f704c698db2bba6",
      "name": "John Doe",
      "tel": "+221701234567",
      "home_ec": {
        "_id": "660438a43406fc5b369fe12b",
        "name": "Auto École XYZ"
      },
      "isPremium": true,
      "created_at": "2025-01-15T10:30:00.000Z"
    }
  ],
  "total": 1523,
  "page": 1,
  "pages": 153
}
```

---

### 17. Lister les élèves par auto-école
**GET** `/dashboard/students/by-autoecole/:id?page=1&limit=10`

Retourne les élèves d'une auto-école spécifique.

**Paramètres :**
- `id` (string) : MongoDB ObjectId de l'auto-école

**Query Parameters :**
- `page` (number, optional) : Numéro de page (défaut: 1)
- `limit` (number, optional) : Nombre d'éléments par page (défaut: 10)

**Réponse :**
```json
{
  "success": true,
  "students": [...],
  "total": 45,
  "page": 1,
  "pages": 5
}
```

---

### 18. Statistiques d'inscription par date
**GET** `/dashboard/students/by-date`

Retourne le nombre d'inscriptions d'élèves par jour.

**Réponse :**
```json
{
  "success": true,
  "data": [
    {
      "date": "2025-01-15",
      "count": 23
    },
    {
      "date": "2025-01-16",
      "count": 18
    }
  ]
}
```

---

### 19. Lister les élèves premium
**GET** `/dashboard/students/premium?page=1&limit=10`

Retourne la liste des élèves ayant un abonnement premium.

**Query Parameters :**
- `page` (number, optional) : Numéro de page (défaut: 1)
- `limit` (number, optional) : Nombre d'éléments par page (défaut: 10)

**Réponse :**
```json
{
  "success": true,
  "students": [...],
  "total": 342,
  "page": 1,
  "pages": 35
}
```

---

### 20. Lister les élèves actifs
**GET** `/dashboard/students/active?idbot=`

Retourne les élèves actifs (dernière connexion récente).

**Query Parameters :**
- `idbot` (string, optional) : Filtrer par bot Telegram spécifique

**Réponse :**
```json
{
  "success": true,
  "activeStudents": [
    {
      "_id": "65a03b6e2f704c698db2bba6",
      "name": "John Doe",
      "tel": "+221701234567",
      "lastActive": "2025-11-28T14:30:00.000Z"
    }
  ],
  "count": 234
}
```

---

## Endpoints Autoecoles (Auto-Écoles)

### 21. Compter les auto-écoles
**GET** `/dashboard/autoecoles/count`

Retourne le nombre total d'auto-écoles inscrites.

**Réponse :**
```json
{
  "success": true,
  "count": 45
}
```

---

### 22. Lister les auto-écoles avec pagination
**GET** `/dashboard/autoecoles/list?page=1&limit=10`

Retourne la liste paginée des auto-écoles.

**Query Parameters :**
- `page` (number, optional) : Numéro de page (défaut: 1)
- `limit` (number, optional) : Nombre d'éléments par page (défaut: 10)

**Réponse :**
```json
{
  "success": true,
  "autoecoles": [
    {
      "_id": "660438a43406fc5b369fe12b",
      "name": "Auto École XYZ",
      "address": "Dakar, Sénégal",
      "tel": "+221701234567",
      "email": "contact@autoecolexyz.sn",
      "studentsCount": 156,
      "created_at": "2024-08-15T10:00:00.000Z"
    }
  ],
  "total": 45,
  "page": 1,
  "pages": 5
}
```

---

### 23. Obtenir les élèves d'une auto-école
**GET** `/dashboard/autoecoles/:id/students`

Retourne tous les élèves inscrits dans une auto-école spécifique.

**Paramètres :**
- `id` (string) : MongoDB ObjectId de l'auto-école

**Réponse :**
```json
{
  "success": true,
  "students": [
    {
      "_id": "65a03b6e2f704c698db2bba6",
      "name": "John Doe",
      "tel": "+221701234567",
      "isPremium": true
    }
  ],
  "count": 156
}
```

---

### 24. Statistiques des auto-écoles
**GET** `/dashboard/autoecoles/stats`

Retourne des statistiques globales sur les auto-écoles.

**Réponse :**
```json
{
  "success": true,
  "stats": {
    "totalAutoecoles": 45,
    "totalStudents": 1523,
    "avgStudentsPerAutoecole": 33.8,
    "topAutoecoles": [
      {
        "_id": "660438a43406fc5b369fe12b",
        "name": "Auto École XYZ",
        "studentsCount": 156
      }
    ]
  }
}
```

---

## Endpoints Tests (Examens)

### 25. Compter les tests
**GET** `/dashboard/tests/count`

Retourne le nombre total de tests effectués.

**Réponse :**
```json
{
  "success": true,
  "count": 12456
}
```

---

### 26. Tests par élève
**GET** `/dashboard/tests/by-student/:tel`

Retourne l'historique des tests d'un élève spécifique.

**Paramètres :**
- `tel` (string) : Numéro de téléphone de l'élève

**Réponse :**
```json
{
  "success": true,
  "tests": [
    {
      "_id": "667ae5aa6cf4978137fb0b19",
      "quizz_id": "660438a43406fc5b369fe12b",
      "quizz_title": "Signalisation Horizontale",
      "score": 8,
      "total_questions": 10,
      "percentage": 80,
      "date": "2025-11-27T14:30:00.000Z"
    }
  ],
  "count": 23
}
```

---

### 27. Tests par quiz
**GET** `/dashboard/tests/by-quiz/:id`

Retourne tous les tests effectués pour un quiz spécifique.

**Paramètres :**
- `id` (string) : MongoDB ObjectId du quiz

**Réponse :**
```json
{
  "success": true,
  "tests": [
    {
      "_id": "667ae5aa6cf4978137fb0b19",
      "student_tel": "+221701234567",
      "student_name": "John Doe",
      "score": 8,
      "total_questions": 10,
      "date": "2025-11-27T14:30:00.000Z"
    }
  ],
  "count": 1523
}
```

---

### 28. Statistiques des tests
**GET** `/dashboard/tests/stats`

Retourne des statistiques globales sur les tests.

**Réponse :**
```json
{
  "success": true,
  "stats": {
    "totalTests": 12456,
    "avgScore": 72.5,
    "successRate": 68.3,
    "totalStudentsTested": 1234
  }
}
```

---

### 29. Classement (Leaderboard)
**GET** `/dashboard/tests/leaderboard?limit=10`

Retourne le classement des meilleurs élèves.

**Query Parameters :**
- `limit` (number, optional) : Nombre d'élèves à retourner (défaut: 10)

**Réponse :**
```json
{
  "success": true,
  "leaderboard": [
    {
      "student_tel": "+221701234567",
      "student_name": "John Doe",
      "totalTests": 45,
      "avgScore": 92.3,
      "bestScore": 100
    }
  ]
}
```

---

## Endpoints Courses (Cours)

### 30. Compter les cours
**GET** `/dashboard/courses/count`

Retourne le nombre total de cours disponibles.

**Réponse :**
```json
{
  "success": true,
  "count": 28
}
```

---

### 31. Lister les cours
**GET** `/dashboard/courses/list`

Retourne la liste de tous les cours.

**Réponse :**
```json
{
  "success": true,
  "courses": [
    {
      "_id": "667ae5aa6cf4978137fb0b19",
      "title": "Code de la Route - Module 1",
      "description": "Introduction au code de la route",
      "category": "Signalisation",
      "duration": 45,
      "created_at": "2025-01-15T10:00:00.000Z"
    }
  ],
  "count": 28
}
```

---

### 32. Détails d'un cours
**GET** `/dashboard/courses/:id/details`

Retourne les détails complets d'un cours spécifique.

**Paramètres :**
- `id` (string) : MongoDB ObjectId du cours

**Réponse :**
```json
{
  "success": true,
  "course": {
    "_id": "667ae5aa6cf4978137fb0b19",
    "title": "Code de la Route - Module 1",
    "description": "Introduction au code de la route",
    "category": "Signalisation",
    "duration": 45,
    "content": "Contenu détaillé du cours...",
    "videos": [
      {
        "title": "Vidéo 1",
        "url": "https://example.com/video1.mp4"
      }
    ],
    "created_at": "2025-01-15T10:00:00.000Z"
  }
}
```

---

### 33. Statistiques des cours
**GET** `/dashboard/courses/stats`

Retourne des statistiques sur les cours.

**Réponse :**
```json
{
  "success": true,
  "stats": {
    "totalCourses": 28,
    "totalViews": 5678,
    "avgViewsPerCourse": 202.8,
    "mostViewedCourses": [
      {
        "_id": "667ae5aa6cf4978137fb0b19",
        "title": "Code de la Route - Module 1",
        "views": 1234
      }
    ]
  }
}
```

---

## Endpoints KPIs (Indicateurs de Performance)

### 34. KPIs globaux
**GET** `/dashboard/kpis/global`

Retourne les indicateurs de performance globaux du dashboard.

**Réponse :**
```json
{
  "success": true,
  "kpis": {
    "totalUsers": 1523,
    "totalAutoecoles": 45,
    "totalQuizz": 4,
    "totalTests": 12456,
    "totalCourses": 28,
    "activeUsersToday": 234,
    "premiumUsers": 342
  }
}
```

---

### 35. Engagement des utilisateurs
**GET** `/dashboard/kpis/engagement?page=1&limit=10&idbot=`

Retourne les métriques d'engagement des utilisateurs.

**Query Parameters :**
- `page` (number, optional) : Numéro de page (défaut: 1)
- `limit` (number, optional) : Nombre d'éléments par page (défaut: 10)
- `idbot` (string, optional) : Filtrer par bot Telegram spécifique

**Réponse :**
```json
{
  "success": true,
  "engagement": [
    {
      "student_tel": "+221701234567",
      "student_name": "John Doe",
      "lastActive": "2025-11-28T14:30:00.000Z",
      "testsCompleted": 45,
      "coursesViewed": 12,
      "engagementScore": 87.5
    }
  ],
  "total": 234,
  "page": 1,
  "pages": 24
}
```

---

### 36. Performance des quiz
**GET** `/dashboard/kpis/performance`

Retourne les métriques de performance des quiz.

**Réponse :**
```json
{
  "success": true,
  "performance": {
    "avgTestScore": 72.5,
    "avgTestsPerStudent": 8.2,
    "successRate": 68.3,
    "topPerformingQuizz": [
      {
        "_id": "667ae5aa6cf4978137fb0b19",
        "title": "Signalisation Horizontale",
        "avgScore": 85.2
      }
    ]
  }
}
```

---

### 37. Croissance de la plateforme
**GET** `/dashboard/kpis/growth`

Retourne les métriques de croissance de la plateforme.

**Réponse :**
```json
{
  "success": true,
  "growth": {
    "newUsersThisMonth": 156,
    "newUsersLastMonth": 134,
    "growthRate": 16.4,
    "newAutoEcolesThisMonth": 3,
    "dailyActiveUsers": 234,
    "monthlyActiveUsers": 892
  }
}
```

---

## Endpoints Users (Utilisateurs Administrateurs)

### 38. Compter les utilisateurs
**GET** `/dashboard/users/count`

Retourne le nombre d'utilisateurs administrateurs.

**Réponse :**
```json
{
  "success": true,
  "count": 5
}
```

---

### 39. Lister les utilisateurs avec pagination
**GET** `/dashboard/users/list?page=1&limit=10`

Retourne la liste des utilisateurs administrateurs.

**Query Parameters :**
- `page` (number, optional) : Numéro de page (défaut: 1)
- `limit` (number, optional) : Nombre d'éléments par page (défaut: 10)

**Réponse :**
```json
{
  "success": true,
  "users": [
    {
      "_id": "65a03b6e2f704c698db2bba6",
      "username": "admin",
      "email": "admin@autoecole.sn",
      "role": "superadmin",
      "created_at": "2024-01-15T10:00:00.000Z"
    }
  ],
  "total": 5,
  "page": 1,
  "pages": 1
}
```

---

## Endpoint Health Check

### 40. Vérification de l'état du serveur
**GET** `/dashboard/health`

Vérifie que l'API est en ligne et fonctionne correctement.

**Réponse :**
```json
{
  "success": true,
  "message": "API is healthy",
  "timestamp": "2025-11-28T14:30:00.000Z"
}
```

---

## Codes d'erreur HTTP

- `200` : Succès (GET, PUT, DELETE)
- `201` : Ressource créée (POST)
- `400` : Requête invalide (paramètres manquants ou invalides)
- `404` : Ressource non trouvée
- `500` : Erreur serveur interne

---

## Script de test complet

Un script de test bash est disponible à : `/home/ec2-user/test_quiz_crud.sh`

Pour l'exécuter :
```bash
chmod +x /home/ec2-user/test_quiz_crud.sh
/home/ec2-user/test_quiz_crud.sh
```

Ce script teste tous les endpoints CRUD dans l'ordre logique.

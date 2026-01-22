# 📋 Task Manager Collaboratif

> Application Angular moderne de gestion de tâches avec fonctionnalités collaboratives et analytiques

## 🎯 Vue d'ensemble

Task Manager est une application web complète permettant la gestion de tâches avec système d'authentification, commentaires collaboratifs, et tableau de bord analytique.

---

## ✨ Fonctionnalités

### 🔐 Authentification
- **Inscription** (`/register`) : Création de compte utilisateur
- **Connexion** (`/login`) : Authentification avec JWT
- **Protection des routes** : Guard pour sécuriser l'accès aux pages
- **Gestion de session** : Token stocké en LocalStorage
- **Validation** : Feedback visuel en temps réel sur les formulaires

### 📝 Gestion des Tâches
- **Liste des tâches** (`/tasks`) : Affichage de toutes les tâches
  - Titre, description, statut, utilisateur assigné
  - Dates de création et modification formatées
  - Tâches terminées affichées barrées
- **Détail d'une tâche** (`/tasks/:id`) : Vue complète d'une tâche
  - Badge de statut coloré
  - Toutes les informations détaillées
  - Bouton retour vers la liste
- **Ajout de tâche** : Création via formulaire réactif
- **Modification** : Édition des tâches existantes
- **Suppression** : Avec confirmation utilisateur
- **Filtres dynamiques** : 
  - Toutes les tâches
  - À faire (TODO, IN_PROGRESS)
  - Terminées (DONE)

### 💬 Système de Commentaires
- **Module social** : Intégré dans la page de détail
- **Ajout de commentaire** : Formulaire réactif
- **Affichage** : Liste avec auteur, message et date
- **Persistance** : Stockage local par tâche

### 📊 Dashboard Analytics
- **Page dédiée** (`/dashboard`) : Tableau de bord analytique
- **KPI (Indicateurs clés)** :
  - 📈 Nombre total de tâches (Admin uniquement)
  - ✅ Tâches terminées
  - 👤 Mes tâches assignées
- **Barre de progression** : Visualisation du % de complétion

### 👥 Administration (Admin uniquement)
- **Gestion des utilisateurs** (`/users`) : Page protégée
- **Liste complète** : Affichage de tous les utilisateurs
- **Action de bannissement** : Retrait avec confirmation
- **Sécurité** : Route accessible uniquement aux administrateurs

---

## 🏗️ Architecture du Projet

```
src/
├── app/
│   ├── core/auth/                    # Module Core (singleton)
│   │   ├── guards/             # Guards de protection
│   │   ├── interceptors/       # Intercepteurs HTTP
│   │   ├── interfaces/         # Interfaces TypeScript
│   │   └── services/           # Services globaux
│   │
│   ├── features/               # Modules fonctionnels
│   │   ├── admin/             # Gestion des tâches
│   │   ├── auth/              # Gestion des tâches
│   │   ├── dashboard/         # Analytics
│   │   ├── task/              # Gestion des tâches
│   │   └── users/             # Administration
│   │
│   └── shared/                # Composants partagés 
│       └── header/            # Composants partagés header
```

### 📐 Principes d'Architecture

**Core Module** : Services singleton, guards, interceptors, interfaces
- `AuthService` : Gestion de l'authentification
- `TaskService` : CRUD des tâches
- `UsersService` : Gestion des utilisateurs
- `AuthGuard` : Protection des routes authentifiées
- `AdminGuard` : Protection des routes admin
- `AuthInterceptor` : Injection du token JWT

**Features Modules** : Modules métier autonomes
- Composants standalone Angular 17+
- Logique métier encapsulée
- Routing lazy-loading

**Shared Module** : Éléments réutilisables
- Composants UI génériques
- Pipes de transformation
- Utilitaires communs

---

## 🚀 Technologies Utilisées

- **Angular 17+** : Framework principal
- **TypeScript** : Typage strict
- **Tailwind CSS** : Framework CSS utility-first
- **RxJS** : Programmation réactive
- **LocalStorage** : Persistance locale

### 🆕 Fonctionnalités Angular 17+

- ✅ **Signals** : Gestion réactive de l'état
- ✅ **Control Flow** : `@if`, `@for`, `@switch`
- ✅ **inject()** : Injection de dépendances moderne
- ✅ **Standalone Components** : Composants autonomes
- ✅ **Reactive Forms** : Formulaires réactifs
- ✅ **withComponentInputBinding** : Routing inputs

---

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/LudovicMARIE/angular-task-manager-project

# Installer les dépendances
cd angular-task-manager-project
npm install

# Lancer le serveur de développement
ng serve

# Ouvrir dans le navigateur
# http://localhost:4200
```

---

## 🎨 Conventions de Code

### Typage Strict
```typescript
// ❌ Éviter
let data: any;

// ✅ Utiliser
let data: Task[];
```

### Signals (Angular 17+)
```typescript
// State management moderne
count = signal(0);
doubleCount = computed(() => this.count() * 2);
```

### Control Flow
```typescript
// ❌ Ancien
<div *ngIf="isLoading">Chargement...</div>

// ✅ Nouveau
@if (isLoading) {
  <div>Chargement...</div>
}
```

### Injection de dépendances
```typescript
// ✅ Moderne
private taskService = inject(TaskService);
```

---

## 📱 Pages de l'Application

| Route | Description | Protection |
|-------|-------------|------------|
| `/login` | Page de connexion | Public |
| `/register` | Page d'inscription | Public |
| `/tasks` | Liste des tâches | Auth required |
| `/tasks/:id` | Détail d'une tâche | Auth required |
| `/dashboard` | Tableau de bord | Auth required |
| `/create` | page de création d'une task | Auth required |
| `/edit/:id` | page de modification d'une task | Auth required |
| `/users` | Gestion utilisateurs | Auth required, Admin only |

---

## 🔒 Sécurité

- **JWT Token** : Stocké en LocalStorage
- **AuthGuard** : Protège les routes authentifiées
- **AdminGuard** : Protège les routes administrateur
- **Interceptor** : Ajoute automatiquement le token aux requêtes
- **Validation** : Formulaires avec validators Angular

---

## 🎯 Statuts des Tâches

| Statut | Label | Couleur |
|--------|-------|---------|
| `TODO` | À faire | 🔵 Bleu |
| `IN_PROGRESS` | En cours | 🟡 Jaune |
| `DONE` | Terminée | 🟢 Vert |

---

## 📈 Évolutions Futures

- [ ] WebSocket pour temps réel
- [ ] Notifications push
- [ ] Export de données (PDF, Excel)
- [ ] Recherche avancée
- [ ] Tags et catégories
- [ ] Pièces jointes
- [ ] Mode hors ligne (PWA)

---

## 👨‍💻 Développeurs

Projet réalisé dans le cadre d'un examen Angular.

- Ludovic Marie
- Valerie Song
- Mathias Mousset

Made with 💖

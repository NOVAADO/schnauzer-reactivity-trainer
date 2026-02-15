# SchnauzTrain — App d'education canine pour schnauzers reactifs

Application web mobile-first (PWA) pour eduquer deux schnauzers de meme portee reactifs, avec progression par environnement (maison > cour > rue calme > rue stimulante).

## Lancer l'application

```bash
cd app
npm install
npm run dev
```

Ouvrir http://localhost:3000 sur un navigateur mobile ou en mode responsive.

## Stack technique

- **Next.js 15** + TypeScript + Tailwind CSS v4
- **Dexie.js** (IndexedDB) — stockage local, offline-first, aucun serveur requis
- **PWA** — installable sur mobile, fonctionne hors-ligne
- Aucune authentification requise (P0)

## Structure du projet

```
app/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx            # Accueil / Dashboard du jour
│   ├── onboarding/         # Creation des profils chiens
│   ├── education/          # Bibliotheque d'exercices guides
│   │   └── [id]/           # Session d'exercice avec timer
│   ├── reactivity/         # Protocoles reactivite
│   │   ├── [id]/           # Detail d'un protocole
│   │   └── incident/       # Journal d'incidents rapide
│   ├── care/               # Module soins progressifs
│   │   └── [id]/           # Detail d'un soin
│   └── progression/        # Dashboard + analytics 7 jours
├── components/ui/          # Composants reutilisables
│   ├── ActivationBarometer # Echelle 1-5 du seuil d'apprentissage
│   ├── BottomNav           # Navigation 5 onglets
│   ├── DogSelector         # Selecteur solo/duo
│   ├── Timer               # Chronometre circulaire
│   ├── SimpleChart         # Graphiques en barres
│   └── ServiceWorkerRegistration
├── lib/
│   ├── types.ts            # Tous les types/enums TypeScript
│   ├── hooks.ts            # Hooks Dexie (live queries)
│   ├── utils.ts            # Utilitaires dates/formatage
│   ├── db/database.ts      # CRUD IndexedDB (Dexie)
│   └── seed/               # Contenu prerempli
│       ├── exercises.ts    # 8 exercices education
│       ├── protocols.ts    # 3 protocoles reactivite
│       └── care.ts         # 5 soins progressifs
└── public/
    ├── manifest.json       # PWA manifest
    └── sw.js               # Service Worker
```

## Fonctionnalites

### 1. Onboarding
Creer 2 profils chiens avec nom, age, poids, sensibilites et objectif. Thor est marque comme "chien declencheur".

### 2. Barometre d'activation (seuil d'apprentissage)
Echelle 1-5 avant chaque session. Si >3, l'app bloque les exercices complexes et propose une routine de retour au calme.

### 3. Education (micro-seances guidees)
8 exercices avec etapes, timer, erreurs frequentes et criteres de reussite :
- Regard (contact visuel) — 2 niveaux
- Assis (politesse)
- Couche (calme)
- Reste (patience)
- Place / Tapis (ancrage)
- Marche exploratoire — 2 niveaux

### 4. Reactivite
3 protocoles detailles :
- Cour arriere (supervision active)
- Visiteurs (ignorer > gateries > contact progressif)
- Chiens dehors (distance seuil + desensibilisation)

Journal d'incidents rapide (10 secondes) : contexte, declencheur, intensite, action, resultat.

### 5. Soins (programmes progressifs)
5 routines avec etapes jour par jour :
- Dents (14 jours)
- Ongles (10 jours)
- Oreilles (7 jours)
- Yeux (5 jours)
- Toilettage (7 jours)

### 6. Dashboard + Progression
- Resume du jour
- Graphiques 7 jours (sessions, incidents, intensite)
- "Ce qui fonctionne" — top 3 interventions

### Mode Duo
- Entrainer separement (Thor seul / autre chien seul)
- Duo disponible seulement si activation <= 3
- L'app recommande de commencer par Thor

## Ajouter un exercice

Editer `lib/seed/exercises.ts` et ajouter un objet TrainingExercise :

```typescript
{
  id: 'mon-exercice',
  category: ExerciseCategory.REGARD,
  name: 'Mon exercice',
  objective: 'Description',
  durationMinutes: 5,
  environmentLevel: EnvironmentLevel.MAISON,
  maxActivation: 3,
  steps: [
    { instruction: 'Etape 1', durationSeconds: 10 },
    { instruction: 'Etape 2', durationSeconds: 20, tip: 'Un conseil' },
  ],
  commonMistakes: ['Erreur 1'],
  ifItFails: 'Que faire si ca echoue',
  successCriteria: 'Critere de reussite',
}
```

## Ajouter un soin

Editer `lib/seed/care.ts` et ajouter un objet CareTask avec des etapes progressives par jour.

## Principes educatifs integres

- Micro-seances 5-7 min, 3x/jour
- Exercice REGARD : nom > "BON CHIEN" > contact visuel > recompense
- Jamais dire "NON" — toujours proposer une alternative
- Marche exploratoire : laisse detendue, pas d'objectif de distance
- Desensibilisation : travailler sous le seuil, reculer si nerveux
- Visiteurs : ignorer le chien, lancer gateries sans contact visuel
- Soins : 10 secondes positives > 30 secondes de lutte

## Donnees

Toutes les donnees sont stockees localement dans IndexedDB via Dexie.js. Aucune donnee n'est envoyee a un serveur. Supprimer les donnees du navigateur efface tout.

import { type TrainingExercise, ExerciseCategory, EnvironmentLevel } from '../types';

export const EXERCISES: TrainingExercise[] = [
  // ---- 1. REGARD ----
  {
    id: 'regard-base',
    category: ExerciseCategory.REGARD,
    name: 'Regard — Contact visuel',
    objective: 'Apprendre au chien à te regarder quand tu dis son nom.',
    durationMinutes: 3,
    environmentLevel: EnvironmentLevel.MAISON,
    maxActivation: 3,
    steps: [
      { instruction: 'Dis le nom du chien UNE seule fois, calmement.', durationSeconds: 5 },
      { instruction: 'Attends qu\'il te regarde. Ne répète pas son nom.', durationSeconds: 10, tip: 'Patience ! Même un micro-regard compte.' },
      { instruction: 'Dès qu\'il te regarde : dis "BON CHIEN" et donne une gâterie.', durationSeconds: 5 },
      { instruction: 'Attends 5 secondes, puis recommence.', durationSeconds: 5 },
      { instruction: 'Répète 5 à 8 fois. Arrête pendant que ça va bien !', durationSeconds: 120 },
    ],
    commonMistakes: [
      'Répéter le nom plusieurs fois (ça apprend au chien à ignorer)',
      'Récompenser trop tard (plus de 2 secondes après le regard)',
      'Sessions trop longues — 3 minutes max !',
    ],
    ifItFails: 'Rapproche la gâterie de ton visage pour attirer le regard. Récompense dès le moindre mouvement des yeux vers toi.',
    successCriteria: 'Le chien te regarde dans les 3 secondes après son nom, 4 fois sur 5.',
  },
  {
    id: 'regard-distraction',
    category: ExerciseCategory.REGARD,
    name: 'Regard — Avec distraction légère',
    objective: 'Maintenir le contact visuel malgré une petite distraction.',
    durationMinutes: 5,
    environmentLevel: EnvironmentLevel.COUR,
    maxActivation: 2,
    steps: [
      { instruction: 'Va dans la cour. Laisse le chien renifler 30 secondes.', durationSeconds: 30 },
      { instruction: 'Dis son nom calmement.', durationSeconds: 5 },
      { instruction: 'S\'il te regarde : "BON CHIEN" + gâterie jackpot (3 gâteries !)', durationSeconds: 5 },
      { instruction: 'S\'il ne regarde pas : attends 5 sec, puis rapproche la gâterie de ton visage.', durationSeconds: 10 },
      { instruction: 'Répète 5 fois avec des pauses de 15 secondes entre chaque essai.', durationSeconds: 120 },
    ],
    commonMistakes: [
      'Faire l\'exercice quand le chien est déjà fixé sur un stimulus',
      'Tirer sur la laisse pour attirer l\'attention',
    ],
    ifItFails: 'Rentre à la maison et recommence l\'exercice de regard de base. La cour est peut-être trop stimulante pour le moment.',
    successCriteria: 'Le chien te regarde en cour malgré des bruits légers, 3 fois sur 5.',
  },

  // ---- 2. ASSIS ----
  {
    id: 'assis-base',
    category: ExerciseCategory.ASSIS,
    name: 'Assis — Politesse de base',
    objective: 'Assis automatique avant chaque chose agréable (sortie, repas, attention).',
    durationMinutes: 3,
    environmentLevel: EnvironmentLevel.MAISON,
    maxActivation: 3,
    steps: [
      { instruction: 'Tiens une gâterie au-dessus du nez du chien, recule-la lentement vers l\'arrière de sa tête.', durationSeconds: 10 },
      { instruction: 'Son derrière touche le sol ? "BON CHIEN" + gâterie immédiatement.', durationSeconds: 5 },
      { instruction: 'S\'il saute : cache la gâterie, tourne le dos, attends 3 secondes.', durationSeconds: 5, tip: 'Sauter = l\'inverse de ce qu\'il veut. Pas besoin de dire NON.' },
      { instruction: 'Quand il est assis calmement, récompense. Répète 6 fois.', durationSeconds: 120 },
    ],
    commonMistakes: [
      'Pousser le derrière du chien (il va résister)',
      'Dire "assis assis assis" — une seule fois suffit',
      'Donner la gâterie quand il se relève',
    ],
    ifItFails: 'Utilise un leurre plus appétissant (fromage, poulet). Guide le mouvement avec la nourriture.',
    successCriteria: 'Le chien s\'assoit avec un seul signal, sans leurre visible, 5 fois sur 5.',
  },

  // ---- 3. COUCHÉ ----
  {
    id: 'couche-base',
    category: ExerciseCategory.COUCHE,
    name: 'Couché — Position calme',
    objective: 'Apprendre la position couchée pour encourager le calme.',
    durationMinutes: 5,
    environmentLevel: EnvironmentLevel.MAISON,
    maxActivation: 2,
    steps: [
      { instruction: 'Demande "assis" d\'abord.', durationSeconds: 10 },
      { instruction: 'Tiens une gâterie devant son nez, descends lentement vers le sol entre ses pattes.', durationSeconds: 15 },
      { instruction: 'Quand ses coudes touchent le sol : "BON CHIEN" + gâterie.', durationSeconds: 5, tip: 'Même un demi-couché mérite une récompense au début !' },
      { instruction: 'Répète 5 fois. Fais des pauses de 10 secondes entre chaque essai.', durationSeconds: 120 },
    ],
    commonMistakes: [
      'Aller trop vite vers le sol (le chien se lève)',
      'Forcer le chien au sol avec les mains',
      'Oublier de récompenser les étapes intermédiaires',
    ],
    ifItFails: 'Essaie sous une chaise basse : le chien doit se coucher pour atteindre la gâterie glissée dessous.',
    successCriteria: 'Le chien se couche avec un seul signal verbal + geste, 4 fois sur 5.',
  },

  // ---- 4. RESTE ----
  {
    id: 'reste-base',
    category: ExerciseCategory.RESTE,
    name: 'Reste — Patience de base',
    objective: 'Le chien reste en place 5 à 10 secondes avant d\'obtenir sa récompense.',
    durationMinutes: 5,
    environmentLevel: EnvironmentLevel.MAISON,
    maxActivation: 2,
    steps: [
      { instruction: 'Demande "assis" ou "couché".', durationSeconds: 10 },
      { instruction: 'Montre ta paume ouverte et dis "reste".', durationSeconds: 3 },
      { instruction: 'Attends 2 secondes. Si le chien ne bouge pas : "BON CHIEN" + gâterie.', durationSeconds: 5 },
      { instruction: 'Augmente progressivement : 3 sec, puis 5 sec, puis 8 sec.', durationSeconds: 60 },
      { instruction: 'Si le chien bouge : pas de récompense, replace-le calmement, recommence à une durée plus courte.', durationSeconds: 60 },
    ],
    commonMistakes: [
      'Augmenter trop vite la durée',
      'Reculer en même temps que tu dis "reste" (trop de difficulté d\'un coup)',
      'Punir le chien qui bouge au lieu de simplement recommencer',
    ],
    ifItFails: 'Reviens à 1 seconde de reste. Récompense souvent. La patience se construit très progressivement.',
    successCriteria: 'Le chien reste 10 secondes en position, 3 fois de suite.',
  },

  // ---- 5. PLACE / TAPIS ----
  {
    id: 'place-tapis',
    category: ExerciseCategory.PLACE,
    name: 'Place — Aller au tapis',
    objective: 'Le chien va sur son tapis et y reste calmement. Ancrage pour visiteurs et moments excitants.',
    durationMinutes: 5,
    environmentLevel: EnvironmentLevel.MAISON,
    maxActivation: 3,
    steps: [
      { instruction: 'Place le tapis au sol. Lance une gâterie dessus. Quand le chien y va : "BON CHIEN".', durationSeconds: 15 },
      { instruction: 'Répète 5 fois : gâterie sur le tapis → le chien y va → "BON CHIEN".', durationSeconds: 60 },
      { instruction: 'Maintenant, pointe le tapis et dis "place". Attends qu\'il y aille. Récompense sur le tapis.', durationSeconds: 30 },
      { instruction: 'Quand il est sur le tapis, donne-lui une gâterie toutes les 5 secondes s\'il reste.', durationSeconds: 60, tip: 'Le tapis doit devenir le meilleur endroit de la maison !' },
      { instruction: 'Libère avec "ok, viens !" après 30 secondes max au début.', durationSeconds: 10 },
    ],
    commonMistakes: [
      'Utiliser "place" pour punir ou isoler',
      'Oublier de récompenser le calme sur le tapis',
      'Demander trop de temps sur le tapis trop vite',
    ],
    ifItFails: 'Reviens à l\'étape 1 : lance des gâteries sur le tapis pour recréer l\'association positive.',
    successCriteria: 'Le chien va sur le tapis au signal "place" et y reste 30 secondes calmement.',
  },

  // ---- 6. MARCHE EXPLORATOIRE (2 niveaux) ----
  {
    id: 'marche-exploratoire',
    category: ExerciseCategory.MARCHE,
    name: 'Marche exploratoire — Rue calme',
    objective: 'Marcher en laisse détendue. Pas d\'objectif de distance. Le chien renifle et explore.',
    durationMinutes: 7,
    environmentLevel: EnvironmentLevel.RUE_CALME,
    maxActivation: 2,
    steps: [
      { instruction: 'Mets le harnais calmement. Si le chien s\'excite, attends qu\'il soit calme avant de sortir.', durationSeconds: 30, tip: 'La porte s\'ouvre SEULEMENT quand le chien est calme.' },
      { instruction: 'Sors et laisse le chien renifler devant la maison 1 minute.', durationSeconds: 60 },
      { instruction: 'Marche lentement. Laisse détendue = on avance. Laisse tendue = tu t\'arrêtes.', durationSeconds: 120 },
      { instruction: 'Quand le chien marche à côté avec laisse détendue : "BON CHIEN" + gâterie.', durationSeconds: 10 },
      { instruction: 'Laisse-le renifler les buissons, l\'herbe. Le reniflage calme le chien.', durationSeconds: 120 },
      { instruction: 'Si tu vois un stimulus (chien, personne) : augmente la distance. Récompense le calme.', durationSeconds: 30, tip: 'Mieux vaut faire demi-tour tôt que gérer une explosion.' },
    ],
    commonMistakes: [
      'Vouloir "avancer" ou "finir le trajet" — il n\'y a pas d\'objectif de distance',
      'Tirer la laisse quand le chien renifle',
      'S\'approcher trop d\'un stimulus pour "tester"',
    ],
    ifItFails: 'Rentre à la maison calmement. Réessaie demain dans une rue encore plus calme ou à un horaire moins fréquenté.',
    successCriteria: 'Marche de 5 minutes avec laisse détendue 80% du temps, sans réaction majeure.',
  },
  {
    id: 'marche-cour',
    category: ExerciseCategory.MARCHE,
    name: 'Marche en laisse — Dans la cour',
    objective: 'Pratiquer la laisse détendue dans un environnement familier avant la rue.',
    durationMinutes: 5,
    environmentLevel: EnvironmentLevel.COUR,
    maxActivation: 3,
    steps: [
      { instruction: 'Mets la laisse dans la cour. Laisse le chien se promener.', durationSeconds: 30 },
      { instruction: 'Marche doucement en faisant des changements de direction.', durationSeconds: 60 },
      { instruction: 'À chaque fois que le chien te suit : "BON CHIEN" + gâterie.', durationSeconds: 10 },
      { instruction: 'Si la laisse se tend, arrête-toi. Attends. Quand il revient vers toi : récompense.', durationSeconds: 60 },
      { instruction: 'Termine avec du reniflage libre (détache la laisse si c\'est sécuritaire).', durationSeconds: 60 },
    ],
    commonMistakes: [
      'Saccades sur la laisse pour le ramener',
      'Aller trop vite',
    ],
    ifItFails: 'Le chien est trop stimulé dans la cour. Travaille le regard à la maison et réessaie demain.',
    successCriteria: 'Le chien marche en laisse détendue dans la cour pendant 3 minutes.',
  },
];

export function getExerciseById(id: string): TrainingExercise | undefined {
  return EXERCISES.find((e) => e.id === id);
}

export function getExercisesByCategory(category: ExerciseCategory): TrainingExercise[] {
  return EXERCISES.filter((e) => e.category === category);
}

export function getExercisesForActivation(activation: number): TrainingExercise[] {
  return EXERCISES.filter((e) => e.maxActivation >= activation);
}

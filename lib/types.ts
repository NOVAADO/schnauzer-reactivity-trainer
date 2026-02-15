// ============================================================
// TYPES & MODÈLES — APP CHIEN (Schnauzer Reactivity Trainer)
// ============================================================

// ---- ENUMS ----

export enum Context {
  MAISON = 'maison',
  COUR = 'cour',
  RUE_CALME = 'rue_calme',
  RUE_STIMULANTE = 'rue_stimulante',
}

export enum Trigger {
  BRUIT = 'bruit',
  VISITEUR = 'visiteur',
  CHIEN = 'chien',
  CHAT = 'chat',
  VELO = 'velo',
  ENFANT = 'enfant',
  TELEVISION = 'television',
  AUTRE = 'autre',
}

export enum Outcome {
  MIEUX = 'mieux',
  PAREIL = 'pareil',
  PIRE = 'pire',
}

export enum SessionResult {
  REUSSI = 'reussi',
  TROP_DIFFICILE = 'trop_difficile',
  STRESS = 'stress',
}

export enum ExerciseCategory {
  REGARD = 'regard',
  ASSIS = 'assis',
  COUCHE = 'couche',
  RESTE = 'reste',
  PLACE = 'place',
  MARCHE = 'marche',
}

export enum EnrichmentCategory {
  TRICK = 'trick',
  MENTAL = 'mental',
  OLFACTIF = 'olfactif',
  CONFIANCE = 'confiance',
  FUN = 'fun',
}

export interface EnrichmentActivity {
  id: string;
  category: EnrichmentCategory;
  name: string;
  description: string;
  durationMinutes: number;
  difficulty: 1 | 2 | 3; // 1=debutant, 2=intermediaire, 3=avance
  prerequisite?: string; // id exercice de base requis
  materials?: string[];
  steps: ExerciseStep[];
  benefits: string[];
  tip: string;
}

export enum CareType {
  DENTS = 'dents',
  ONGLES = 'ongles',
  OREILLES = 'oreilles',
  YEUX = 'yeux',
  TOILETTAGE = 'toilettage',
}

export enum EnvironmentLevel {
  MAISON = 1,
  COUR = 2,
  RUE_CALME = 3,
  RUE_STIMULANTE = 4,
}

export enum DogMode {
  SOLO_THOR = 'solo_thor',
  SOLO_AUTRE = 'solo_autre',
  DUO = 'duo',
}

// ---- MODÈLES ----

export interface Dog {
  id?: number;
  name: string;
  age: number; // mois
  weight: number; // kg
  particularities: string;
  isTriggerDog: boolean;
  sensitivities: Trigger[];
  masteredSkills: string[]; // ids d'exercices/tricks déjà acquis
  mainObjective: string;
  createdAt: string;
}

export interface ExerciseStep {
  instruction: string;
  durationSeconds: number;
  tip?: string;
}

export interface TrainingExercise {
  id: string;
  category: ExerciseCategory;
  name: string;
  objective: string;
  durationMinutes: number;
  environmentLevel: EnvironmentLevel;
  steps: ExerciseStep[];
  commonMistakes: string[];
  ifItFails: string;
  successCriteria: string;
  maxActivation: number; // niveau max d'activation pour lancer cet exercice
}

export interface TrainingSession {
  id?: number;
  dogId: number;
  exerciseId: string;
  dogMode: DogMode;
  activationBefore: number; // 1-5
  activationAfter?: number; // 1-5
  result: SessionResult;
  environment: Context;
  notes?: string;
  durationSeconds: number;
  date: string;
  createdAt: string;
}

export interface IncidentLog {
  id?: number;
  dogId: number;
  context: Context;
  trigger: Trigger;
  intensity: number; // 1-5
  durationSeconds?: number;
  actionTaken: string;
  outcome: Outcome;
  notes?: string;
  date: string;
  createdAt: string;
}

export interface CareStep {
  instruction: string;
  day?: number; // jour du programme progressif
  durationSeconds: number;
}

export interface CareTask {
  id: string;
  type: CareType;
  name: string;
  description: string;
  frequencyPerWeek: number;
  steps: CareStep[];
  totalDays: number; // durée du programme progressif
}

export interface CareEntry {
  id?: number;
  dogId: number;
  careTaskId: string;
  toleranceLevel: number; // 1-5
  stepCompleted: number;
  notes?: string;
  date: string;
  createdAt: string;
}

export interface DailySummary {
  date: string;
  sessionsCount: number;
  incidentsCount: number;
  avgActivation: number;
  careTasksDone: number;
  topInterventions: { action: string; count: number; avgOutcome: number }[];
}

export interface ReactivityProtocol {
  id: string;
  name: string;
  context: Context;
  description: string;
  steps: { instruction: string; tip?: string }[];
  ifReaction: string;
  successCriteria: string;
}

// ---- HELPERS ----

export const ACTIVATION_LABELS: Record<number, string> = {
  1: 'Calme',
  2: 'Attentif',
  3: 'Alerte',
  4: 'Agité',
  5: 'Surexcité',
};

export const ACTIVATION_COLORS: Record<number, string> = {
  1: '#22c55e',
  2: '#84cc16',
  3: '#eab308',
  4: '#f97316',
  5: '#ef4444',
};

export const ACTIVATION_EMOJIS: Record<number, string> = {
  1: '😌',
  2: '🙂',
  3: '😐',
  4: '😬',
  5: '🔥',
};

export const CONTEXT_LABELS: Record<Context, string> = {
  [Context.MAISON]: 'Maison',
  [Context.COUR]: 'Cour arrière',
  [Context.RUE_CALME]: 'Rue calme',
  [Context.RUE_STIMULANTE]: 'Rue stimulante',
};

export const TRIGGER_LABELS: Record<Trigger, string> = {
  [Trigger.BRUIT]: 'Bruit',
  [Trigger.VISITEUR]: 'Visiteur',
  [Trigger.CHIEN]: 'Chien',
  [Trigger.CHAT]: 'Chat',
  [Trigger.VELO]: 'Vélo',
  [Trigger.ENFANT]: 'Enfant',
  [Trigger.TELEVISION]: 'Télévision',
  [Trigger.AUTRE]: 'Autre',
};

export const OUTCOME_LABELS: Record<Outcome, string> = {
  [Outcome.MIEUX]: 'Mieux',
  [Outcome.PAREIL]: 'Pareil',
  [Outcome.PIRE]: 'Pire',
};

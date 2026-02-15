import { type CareTask, CareType } from '../types';

export const CARE_TASKS: CareTask[] = [
  // ---- 1. DENTS ----
  {
    id: 'dents-programme',
    type: CareType.DENTS,
    name: 'Brossage des dents',
    description: 'Programme progressif sur 14 jours. Règle d\'or : 10 secondes positives valent mieux que 30 secondes de lutte.',
    frequencyPerWeek: 3,
    totalDays: 14,
    steps: [
      { instruction: 'Laisse le chien lécher le dentifrice sur ton doigt. Récompense. C\'est tout !', day: 1, durationSeconds: 10 },
      { instruction: 'Idem : dentifrice sur ton doigt → le chien lèche → récompense.', day: 2, durationSeconds: 10 },
      { instruction: 'Mets du dentifrice sur ton doigt et touche DOUCEMENT les dents de devant (2 secondes). Récompense.', day: 3, durationSeconds: 10 },
      { instruction: 'Touche les dents de devant avec ton doigt enduit de dentifrice, 5 secondes. Récompense.', day: 4, durationSeconds: 15 },
      { instruction: 'Masse doucement les gencives de devant avec ton doigt, 5 secondes. Récompense.', day: 5, durationSeconds: 15 },
      { instruction: 'Masse gencives de devant + côtés, 5 secondes de chaque. Récompense.', day: 6, durationSeconds: 20 },
      { instruction: 'Montre la brosse à dents au chien. Laisse-le la renifler. Récompense. Ne brosse pas encore.', day: 7, durationSeconds: 10 },
      { instruction: 'Mets du dentifrice sur la brosse, laisse le chien lécher. Récompense.', day: 8, durationSeconds: 10 },
      { instruction: 'Touche les dents de devant avec la brosse (pas de mouvement). 3 secondes. Récompense.', day: 9, durationSeconds: 10 },
      { instruction: 'Brosse doucement les dents de devant : 5 secondes. Récompense.', day: 10, durationSeconds: 15 },
      { instruction: 'Brosse dents de devant + un côté : 5 secondes chaque. Récompense.', day: 11, durationSeconds: 20 },
      { instruction: 'Brosse les deux côtés + devant : 5 secondes chaque zone. Récompense.', day: 12, durationSeconds: 25 },
      { instruction: 'Brossage complet léger : 10 secondes par zone. Récompense entre chaque zone.', day: 13, durationSeconds: 30 },
      { instruction: 'Brossage complet : 30 secondes total. Jackpot de récompenses à la fin !', day: 14, durationSeconds: 30 },
    ],
  },

  // ---- 2. ONGLES ----
  {
    id: 'ongles-programme',
    type: CareType.ONGLES,
    name: 'Coupe des ongles',
    description: 'Désensibilisation progressive. On ne coupe PAS le premier jour !',
    frequencyPerWeek: 1,
    totalDays: 10,
    steps: [
      { instruction: 'Touche la patte du chien 2 secondes. Récompense. Répète 5 fois.', day: 1, durationSeconds: 15 },
      { instruction: 'Tiens la patte 3 secondes. Touche chaque doigt. Récompense.', day: 2, durationSeconds: 20 },
      { instruction: 'Tiens la patte et presse doucement un doigt (comme si tu allais couper). Récompense.', day: 3, durationSeconds: 15 },
      { instruction: 'Montre le coupe-ongles. Laisse le chien le renifler. Récompense. Range-le.', day: 4, durationSeconds: 10 },
      { instruction: 'Touche la patte avec le coupe-ongles FERMÉ. Récompense.', day: 5, durationSeconds: 15 },
      { instruction: 'Fais le bruit du coupe-ongles (coupe dans l\'air). Récompense si le chien reste calme.', day: 6, durationSeconds: 10 },
      { instruction: 'Tiens la patte + touche un ongle avec l\'outil fermé. Récompense.', day: 7, durationSeconds: 15 },
      { instruction: 'Coupe UN SEUL ongle. Gâterie jackpot. C\'est fini pour aujourd\'hui !', day: 8, durationSeconds: 10 },
      { instruction: 'Coupe 2 ongles. Gâterie entre chaque. C\'est tout.', day: 9, durationSeconds: 15 },
      { instruction: 'Coupe 3–4 ongles. Pas besoin de tout faire en une fois !', day: 10, durationSeconds: 20 },
    ],
  },

  // ---- 3. OREILLES ----
  {
    id: 'oreilles-programme',
    type: CareType.OREILLES,
    name: 'Nettoyage des oreilles',
    description: 'Programme progressif pour que le chien accepte le nettoyage des oreilles.',
    frequencyPerWeek: 1,
    totalDays: 7,
    steps: [
      { instruction: 'Touche l\'oreille du chien 2 secondes. Récompense. Répète 5 fois.', day: 1, durationSeconds: 15 },
      { instruction: 'Soulève doucement le pavillon de l\'oreille. Regarde dedans. Récompense.', day: 2, durationSeconds: 15 },
      { instruction: 'Touche l\'intérieur du pavillon avec ton doigt (pas profond !). Récompense.', day: 3, durationSeconds: 15 },
      { instruction: 'Montre le produit nettoyant au chien. Laisse-le renifler. Récompense.', day: 4, durationSeconds: 10 },
      { instruction: 'Mets un peu de produit sur une compresse et touche le pavillon. Récompense.', day: 5, durationSeconds: 15 },
      { instruction: 'Nettoie doucement le pavillon de l\'oreille avec la compresse. 5 secondes. Récompense.', day: 6, durationSeconds: 15 },
      { instruction: 'Nettoyage complet d\'une oreille (pavillon seulement). Jackpot !', day: 7, durationSeconds: 20 },
    ],
  },

  // ---- 4. YEUX ----
  {
    id: 'yeux-programme',
    type: CareType.YEUX,
    name: 'Nettoyage des yeux',
    description: 'Habituer le chien à se faire nettoyer les yeux en douceur.',
    frequencyPerWeek: 2,
    totalDays: 5,
    steps: [
      { instruction: 'Touche le dessus de la tête et le contour des yeux (sans toucher l\'oeil). Récompense.', day: 1, durationSeconds: 10 },
      { instruction: 'Passe ton doigt doucement sous l\'oeil (zone des larmes). Récompense.', day: 2, durationSeconds: 10 },
      { instruction: 'Montre la compresse humide. Laisse renifler. Touche la joue avec. Récompense.', day: 3, durationSeconds: 15 },
      { instruction: 'Essuie doucement le coin de l\'oeil avec la compresse humide. 3 secondes. Récompense.', day: 4, durationSeconds: 10 },
      { instruction: 'Nettoyage complet des deux yeux. Compresse tiède, mouvements doux. Jackpot !', day: 5, durationSeconds: 20 },
    ],
  },

  // ---- 5. TOILETTAGE ----
  {
    id: 'toilettage-programme',
    type: CareType.TOILETTAGE,
    name: 'Brossage du pelage',
    description: 'Brossage progressif par zones pour les schnauzers (poil dur nécessitant un entretien régulier).',
    frequencyPerWeek: 3,
    totalDays: 7,
    steps: [
      { instruction: 'Montre la brosse au chien. Laisse-le renifler. Récompense. Range-la.', day: 1, durationSeconds: 10 },
      { instruction: 'Passe la brosse sur le DOS seulement, 5 secondes. Récompense.', day: 2, durationSeconds: 15 },
      { instruction: 'Brosse le dos + les flancs (côtés), 5 secondes chaque zone. Récompense entre zones.', day: 3, durationSeconds: 25 },
      { instruction: 'Brosse dos + flancs + poitrail. Récompense entre chaque zone.', day: 4, durationSeconds: 30 },
      { instruction: 'Ajoute les pattes (très doucement, 3 secondes par patte). Récompense.', day: 5, durationSeconds: 30 },
      { instruction: 'Brossage complet léger : dos, flancs, poitrail, pattes. Récompense souvent.', day: 6, durationSeconds: 40 },
      { instruction: 'Brossage complet incluant barbe et sourcils (caractéristique schnauzer). Jackpot !', day: 7, durationSeconds: 45 },
    ],
  },
];

export function getCareTaskById(id: string): CareTask | undefined {
  return CARE_TASKS.find((t) => t.id === id);
}

export function getCareTasksByType(type: CareType): CareTask[] {
  return CARE_TASKS.filter((t) => t.type === type);
}

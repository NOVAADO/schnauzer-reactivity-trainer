import { type ReactivityProtocol, Context } from '../types';

export const PROTOCOLS: ReactivityProtocol[] = [
  // ---- 1. COUR ARRIÈRE ----
  {
    id: 'cour-supervision',
    name: 'Cour arrière — Supervision active',
    context: Context.COUR,
    description:
      'Protocole pour les sorties dans la cour. Empêcher la répétition des aboiements, rediriger, et rentrer si explosion.',
    steps: [
      { instruction: 'Sors avec le chien. Reste avec lui (jamais seul dans la cour).', tip: 'Si tu le laisses seul, il pratique les aboiements sans toi.' },
      { instruction: 'Observe son langage corporel : oreilles dressées, corps rigide, queue haute = il monte en activation.' },
      { instruction: 'AVANT qu\'il réagisse, appelle-le : "[Nom] — regard !" et récompense quand il te regarde.' },
      { instruction: 'S\'il commence à aboyer : dis calmement "on rentre" et ramène-le à l\'intérieur. Pas de punition.', tip: 'Rentrer n\'est pas une punition, c\'est protéger son cerveau de la surcharge.' },
      { instruction: 'Attends 5 minutes, puis ressors. S\'il réagit à nouveau : fin de sortie pour cette période.' },
      { instruction: 'Quand il reste calme 2 minutes dans la cour : gâterie jackpot (3–5 gâteries) + félicitations.' },
    ],
    ifReaction: 'Rentre immédiatement sans crier. Attends que le chien se calme (couché, bâillement, soupir), puis réessaie avec une sortie plus courte.',
    successCriteria: '5 minutes dans la cour sans réaction aux stimuli habituels.',
  },

  // ---- 2. VISITEURS ----
  {
    id: 'visiteurs-protocole',
    name: 'Visiteurs — Protocole d\'accueil',
    context: Context.MAISON,
    description:
      'Protocole pour quand des gens arrivent chez vous. Le visiteur ignore le chien. Gâteries sans contact visuel.',
    steps: [
      {
        instruction: 'AVANT l\'arrivée : mets le chien à sa "place" (tapis). Donne des gâteries pour le calme.',
        tip: 'Envoie un message au visiteur : "Ignore les chiens en entrant, ne les regarde pas, ne leur parle pas."',
      },
      { instruction: 'Le visiteur entre et IGNORE complètement les chiens (pas de regard, pas de "allô le chien !").', },
      { instruction: 'Toi, tu récompenses le chien sur son tapis s\'il reste. Gâterie toutes les 5 secondes au début.' },
      { instruction: 'Après 2 minutes de calme : le visiteur LANCE une gâterie AU SOL vers le chien, sans le regarder.' },
      { instruction: 'Si le chien s\'approche calmement du visiteur (pas de saut, pas de jappement) : le visiteur peut tendre la main, paume vers le bas, et laisser le chien venir.', tip: 'Le chien choisit. S\'il ne s\'approche pas, c\'est OK.' },
      { instruction: 'Si le chien saute : le visiteur tourne le dos et s\'immobilise. Toi, tu rappelles "place" et récompenses quand il y retourne.' },
    ],
    ifReaction: 'Si le chien aboie ou s\'excite trop : emmène-le calmement dans une autre pièce avec un kong ou un os à mâcher. Réessaie dans 10 minutes avec plus de distance.',
    successCriteria: 'Le chien reste sur son tapis ou s\'approche calmement du visiteur sans sauter ni aboyer.',
  },

  // ---- 3. CHIENS DEHORS ----
  {
    id: 'chiens-dehors',
    name: 'Chiens dehors — Désensibilisation',
    context: Context.RUE_CALME,
    description:
      'Protocole pour croiser des chiens en promenade. Trouver la distance seuil, récompenser AVANT la réaction.',
    steps: [
      { instruction: 'Trouve un endroit où tu peux voir des chiens au loin (parc, trottoir d\'en face).', tip: 'Tu dois pouvoir augmenter la distance rapidement (faire demi-tour).' },
      { instruction: 'Quand tu vois un chien au loin : observe TON chien. S\'il regarde mais ne réagit pas, c\'est la bonne distance.' },
      { instruction: 'Dis son nom. S\'il te regarde : "BON CHIEN" + gâterie haute valeur (fromage, poulet). Répète.', tip: 'Récompense le fait de te regarder, pas de regarder l\'autre chien.' },
      { instruction: 'Si le chien fixe l\'autre chien (corps rigide, ne cligne plus des yeux) : tu es TROP PROCHE. Éloigne-toi.', },
      { instruction: 'Si le chien réagit (aboie, tire) : fais demi-tour calmement, éloigne-toi, et récompense dès qu\'il se calme.' },
      { instruction: 'Garde les sessions COURTES : 3–5 rencontres visuelles max puis rentre.', tip: 'Mieux vaut 3 bonnes expériences que 10 moyennes.' },
    ],
    ifReaction: 'Fais demi-tour immédiatement, sans tirer brusquement. Marche dans la direction opposée. Quand le chien se calme (bâillement, reniflage du sol), récompense. Prochaine fois, reste plus loin.',
    successCriteria: 'Le chien peut voir un autre chien à 15 mètres et te regarder quand tu dis son nom, sans réaction.',
  },
];

export function getProtocolById(id: string): ReactivityProtocol | undefined {
  return PROTOCOLS.find((p) => p.id === id);
}

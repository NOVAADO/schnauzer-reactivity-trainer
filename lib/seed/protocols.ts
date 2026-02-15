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
  // ---- 4. TÉLÉVISION / ÉCRANS ----
  {
    id: 'television-desensibilisation',
    name: 'Télévision — Désensibilisation aux écrans',
    context: Context.MAISON,
    description:
      'Protocole progressif pour les chiens qui réagissent aux animaux, sonnettes, ou bruits à la télévision. Très courant chez les schnauzers qui ont un instinct de garde prononcé.',
    steps: [
      {
        instruction: 'PRÉPARATION : Installe le tapis/place du chien à 3+ mètres de la télé. Prépare un sac de gâteries haute valeur et un Kong fourré.',
        tip: 'La distance est ta meilleure amie. Plus le chien est loin de l\'écran, moins le stimulus est intense.',
      },
      {
        instruction: 'ÉTAPE 1 — SON SEULEMENT : Mets la télé avec l\'image éteinte (ou écran caché). Volume au minimum. Récompense chaque seconde de calme.',
        tip: 'Les schnauzers réagissent souvent au SON avant l\'image. Commence par désensibiliser le son.',
      },
      {
        instruction: 'Monte le volume TRÈS graduellement (1 cran à la fois). Si le chien reste calme : gâterie. S\'il lève la tête : OK. S\'il se lève ou grogne : baisse le volume.',
      },
      {
        instruction: 'ÉTAPE 2 — IMAGE + SON BAS : Allume l\'image, volume bas. Choisis un programme CALME (pas d\'animaux au début). Récompense le calme toutes les 10 secondes.',
      },
      {
        instruction: 'ÉTAPE 3 — CONTENU DÉCLENCHEUR : Mets une vidéo YouTube d\'animaux (chiens, chats, oiseaux). Volume bas. Le chien est sur son tapis à distance.',
        tip: 'Cherche "dogs barking TV" ou "cats on screen" sur YouTube. Tu contrôles exactement ce qui passe.',
      },
      {
        instruction: 'Quand un animal apparaît : DIS SON NOM avant qu\'il réagisse. S\'il te regarde au lieu de la télé : JACKPOT de gâteries.',
      },
      {
        instruction: 'S\'il réagit (aboie, se lève, court vers la télé) : ÉTEINS la télé calmement. Attends 30 secondes de calme. Recommence à un niveau plus facile.',
        tip: 'Ne crie PAS "non" ou "arrête". Éteindre = le stimulus disparaît. Le chien apprend que réagir fait partir la chose intéressante.',
      },
      {
        instruction: 'ÉTAPE 4 — FILM/SÉRIE : Quand les étapes précédentes sont acquises (2+ semaines), essaie un vrai film. Garde les gâteries à portée. Récompense le calme pendant les scènes d\'animaux.',
      },
    ],
    ifReaction: 'Éteins immédiatement la télé sans réagir. Pas de "non", pas de correction. Attends que le chien se recouche, soupire, ou bâille. Rallume à volume plus bas. Si ça arrive 3 fois dans une session, c\'est trop difficile — reste au niveau précédent pendant 3 jours.',
    successCriteria: 'Le chien peut regarder une émission avec des animaux pendant 15 minutes en restant sur son tapis, avec seulement des regards curieux (pas de réaction vocale ou physique).',
  },

  // ---- 5. SOIRÉE TÉLÉ — ROUTINE DE GESTION ----
  {
    id: 'soiree-tele-routine',
    name: 'Soirée télé — Routine anti-réactivité',
    context: Context.MAISON,
    description:
      'Protocole pratique pour les soirées film/série. Comment préparer les chiens AVANT d\'allumer la télé pour une soirée calme.',
    steps: [
      {
        instruction: '30 MIN AVANT : Fais une session de reniflage (tapis de reniflage ou jeu "cherche !"). Le but est de fatiguer le cerveau.',
        tip: 'Un chien qui a reniflé 15 minutes est beaucoup plus calme devant la télé.',
      },
      {
        instruction: '15 MIN AVANT : Prépare et donne un Kong fourré congelé à CHAQUE chien, sur leur tapis respectif.',
      },
      {
        instruction: 'INSTALLATION : Les chiens sont sur leurs tapis avec les Kongs. Allume la télé à volume modéré.',
      },
      {
        instruction: 'PENDANT LE FILM : Garde un petit sac de gâteries à côté de toi. Récompense SILENCIEUSEMENT le calme de temps en temps (lance une gâterie sur le tapis sans parler).',
        tip: 'Si Thor est le déclencheur, surveille-le en priorité. Récompense-le quand il est couché, surtout pendant les scènes avec animaux.',
      },
      {
        instruction: 'SI UN CHIEN S\'AGITE : Dis calmement "[nom], place" et pointe le tapis. Quand il y retourne : gâterie.',
      },
      {
        instruction: 'SI EXPLOSION (aboiements intenses) : Mets la télé en pause. Emmène le chien dans une autre pièce calme avec un os à mâcher. Reprends dans 10 min.',
        tip: 'Si les deux réagissent : sépare-les. L\'effet duo amplifie toujours la réaction.',
      },
      {
        instruction: 'ASTUCE LONGUE DURÉE : Baisse le volume pendant les scènes d\'action/animaux. Les schnauzers réagissent autant au son qu\'à l\'image.',
      },
    ],
    ifReaction: 'Si un chien aboie à la télé : pause/mute immédiat. Pas de "CHUT" ou de punition. Redirige vers le tapis, récompense le calme, puis reprends. Si ça arrive plus de 3 fois par soirée, retourne au protocole de désensibilisation.',
    successCriteria: 'Soirée film complète (1h30+) sans que les chiens réagissent aux sons/images de la télé.',
  },
];

export function getProtocolById(id: string): ReactivityProtocol | undefined {
  return PROTOCOLS.find((p) => p.id === id);
}

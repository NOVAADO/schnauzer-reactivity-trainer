import { type EnrichmentActivity, EnrichmentCategory } from '../types';

export const ENRICHMENT_ACTIVITIES: EnrichmentActivity[] = [
  // =========================================
  // TRICKS — Apprentissages fun
  // =========================================
  {
    id: 'trick-touche',
    category: EnrichmentCategory.TRICK,
    name: 'Touche — Ciblage de la main',
    description: 'Le chien touche ta paume avec son nez. Un trick de base ultra utile pour rediriger l\'attention.',
    durationMinutes: 5,
    difficulty: 1,
    prerequisite: 'regard-base',
    materials: ['Gateries'],
    steps: [
      { instruction: 'Presente ta main ouverte, paume vers le chien, a 10 cm de son nez.', durationSeconds: 5 },
      { instruction: 'Quand il renifle ta main (naturellement curieux) : dis "OUI" + gaterie.', durationSeconds: 10, tip: 'Au debut, le moindre mouvement vers ta main compte !' },
      { instruction: 'Repete 5 fois. Il devrait toucher ta paume volontairement.', durationSeconds: 60 },
      { instruction: 'Ajoute le mot "touche" JUSTE AVANT de presenter la main.', durationSeconds: 10 },
      { instruction: 'Varie les positions : main en haut, en bas, sur le cote. Recompense chaque touche.', durationSeconds: 60 },
      { instruction: 'Augmente la distance : main a 30 cm, puis 1 metre. Le chien doit venir toucher.', durationSeconds: 60 },
    ],
    benefits: [
      'Redirige l\'attention loin d\'un stimulus',
      'Base pour plein d\'autres tricks',
      'Renforce la connexion chien-humain',
      'Utile chez le veterinaire (diriger la tete)',
    ],
    tip: 'Le "touche" est un super outil de redirection : quand tu vois un chien au loin, dis "touche" pour ramener l\'attention vers toi AVANT la reaction.',
  },
  {
    id: 'trick-tourne',
    category: EnrichmentCategory.TRICK,
    name: 'Tourne — Pirouette',
    description: 'Le chien fait un tour complet sur lui-meme. Impressionnant et facile a apprendre !',
    durationMinutes: 5,
    difficulty: 1,
    materials: ['Gateries appetissantes'],
    steps: [
      { instruction: 'Tiens une gaterie devant le nez du chien.', durationSeconds: 5 },
      { instruction: 'Deplace la gaterie en arc de cercle pour que le chien suive avec son nez et tourne son corps.', durationSeconds: 15, tip: 'Vas-y lentement, un quart de tour a la fois au debut.' },
      { instruction: 'Quand il fait un demi-tour : "OUI" + gaterie. C\'est deja bien !', durationSeconds: 10 },
      { instruction: 'Progressivement, guide-le pour un tour complet. Jackpot quand il y arrive !', durationSeconds: 30 },
      { instruction: 'Ajoute le mot "tourne" avant le mouvement de la main.', durationSeconds: 10 },
      { instruction: 'Reduis le leurre : fais le geste de la main SANS gaterie, puis recompense apres.', durationSeconds: 60 },
    ],
    benefits: [
      'Stimulation mentale',
      'Renforce la coordination',
      'Casse l\'excitation (mouvement different)',
      'Impressionne la visite !',
    ],
    tip: 'Apprends "tourne" dans les deux sens ! Ca fait travailler les deux cotes du cerveau.',
  },
  {
    id: 'trick-donne-patte',
    category: EnrichmentCategory.TRICK,
    name: 'Donne la patte — Shake',
    description: 'Le chien leve sa patte et la pose dans ta main. Classique et pratique pour les soins.',
    durationMinutes: 5,
    difficulty: 1,
    prerequisite: 'assis-base',
    materials: ['Gateries'],
    steps: [
      { instruction: 'Demande "assis".', durationSeconds: 5 },
      { instruction: 'Ferme une gaterie dans ton poing et presente-le devant le chien, pres du sol.', durationSeconds: 10 },
      { instruction: 'Attends. Quand il leve la patte pour gratter ton poing (frustration positive) : "OUI" + ouvre le poing.', durationSeconds: 30, tip: 'Sois patient ! Ca peut prendre 30 secondes la premiere fois.' },
      { instruction: 'Repete 5 fois. Le chien devrait lever la patte plus vite.', durationSeconds: 60 },
      { instruction: 'Presente ta main ouverte, paume vers le haut. Quand il pose sa patte dessus : "OUI" + gaterie.', durationSeconds: 30 },
      { instruction: 'Ajoute le mot "patte" ou "shake" avant de presenter la main.', durationSeconds: 60 },
    ],
    benefits: [
      'Preparation aux soins des pattes/ongles',
      'Trick social (les visiteurs adorent)',
      'Apprend au chien a offrir sa patte volontairement',
    ],
    tip: 'Ce trick facilite enormement la coupe des ongles : le chien apprend que donner sa patte = positif.',
  },
  {
    id: 'trick-fais-le-beau',
    category: EnrichmentCategory.TRICK,
    name: 'Fais le beau — Assis jolie',
    description: 'Le chien s\'assoit sur ses fesses et leve les pattes avant. Renforce les abdos et l\'equilibre.',
    durationMinutes: 5,
    difficulty: 2,
    prerequisite: 'assis-base',
    materials: ['Gateries', 'Mur pour support au debut'],
    steps: [
      { instruction: 'Demande "assis", dos du chien contre un mur (pour l\'aider a s\'equilibrer).', durationSeconds: 10 },
      { instruction: 'Tiens une gaterie au-dessus de son nez, monte-la doucement. Il va lever les pattes avant.', durationSeconds: 15 },
      { instruction: 'Des que les pattes se levent un tout petit peu : "OUI" + gaterie. Pas besoin qu\'il tienne longtemps !', durationSeconds: 10, tip: 'Meme une seconde de levee compte au debut.' },
      { instruction: 'Augmente progressivement la duree : 1 sec, 2 sec, 3 sec.', durationSeconds: 60 },
      { instruction: 'Eloigne du mur quand le chien tient 3 secondes avec support.', durationSeconds: 30 },
      { instruction: 'Ajoute le signal "beau" avant le geste.', durationSeconds: 60 },
    ],
    benefits: [
      'Renforce les muscles du tronc',
      'Ameliore l\'equilibre et la proprioception',
      'Stimulation mentale (concentration)',
    ],
    tip: 'Ne force pas la duree. Les schnauzers sont petits et ont besoin de muscles abdominaux pour cet exercice. Ca prend quelques semaines.',
  },

  // =========================================
  // STIMULATION MENTALE
  // =========================================
  {
    id: 'mental-cherche',
    category: EnrichmentCategory.MENTAL,
    name: 'Cherche ! — Jeu de flair maison',
    description: 'Cache des gateries dans la maison et laisse le chien les trouver avec son nez. Le meilleur anti-stress.',
    durationMinutes: 10,
    difficulty: 1,
    materials: ['Gateries odorantes (fromage, poulet)', '3-5 cachettes'],
    steps: [
      { instruction: 'Mets le chien en "reste" ou demande a quelqu\'un de le tenir.', durationSeconds: 10 },
      { instruction: 'NIVEAU 1 : Pose 3 gateries au sol, bien visibles. Dis "cherche !" et laisse-le les trouver.', durationSeconds: 30, tip: 'Premiere fois = ultra facile. Il doit comprendre le jeu.' },
      { instruction: 'Recompense quand il trouve chaque gaterie : "BON CHIEN !" avec enthousiasme.', durationSeconds: 15 },
      { instruction: 'NIVEAU 2 : Cache les gateries derriere des meubles, sous des coussins. Dis "cherche !"', durationSeconds: 60 },
      { instruction: 'NIVEAU 3 : Cache dans d\'autres pieces. Augmente la difficulte progressivement.', durationSeconds: 120 },
      { instruction: 'Termine toujours avec une cachette facile pour finir sur un succes.', durationSeconds: 30 },
    ],
    benefits: [
      '15 minutes de flair = 1 heure de promenade en depense mentale',
      'Reduit le stress et l\'anxiete naturellement',
      'Parfait les jours de pluie ou quand il fait trop froid',
      'Utilise l\'instinct naturel du schnauzer (chien de chasse)',
    ],
    tip: 'Le reniflage libere de la dopamine ET de la serotonine. C\'est l\'anti-stress naturel #1 du chien. Fais-le TOUS les jours.',
  },
  {
    id: 'mental-tapis-reniflage',
    category: EnrichmentCategory.MENTAL,
    name: 'Tapis de reniflage',
    description: 'Eparpille les croquettes dans un tapis a renifler au lieu du bol. Transforme le repas en activite mentale.',
    durationMinutes: 5,
    difficulty: 1,
    materials: ['Tapis de reniflage (ou serviette roulee)', 'Croquettes du repas'],
    steps: [
      { instruction: 'Prends la ration de croquettes du repas (ou une partie).', durationSeconds: 5 },
      { instruction: 'Eparpille les croquettes dans le tapis de reniflage / plis de serviette.', durationSeconds: 15 },
      { instruction: 'Pose le tapis au sol. Dis "cherche !" et laisse le chien renifler.', durationSeconds: 10 },
      { instruction: 'Observe : le chien devrait se concentrer, ralentir, utiliser son nez.', durationSeconds: 120, tip: 'Si le chien tire le tapis ou le retourne, c\'est trop facile. Enfonce les croquettes plus profond.' },
      { instruction: 'Quand il a fini : range le tapis (il ne doit pas le machouiller).', durationSeconds: 10 },
    ],
    benefits: [
      'Ralentit l\'ingestion (anti-glouton)',
      'Calme le chien avant ou apres une situation stimulante',
      'Remplace le bol ennuyant par une activite',
      'Ideal avant l\'arrivee de visiteurs',
    ],
    tip: 'PAS de tapis de reniflage : utilise une serviette de bain roulee et pliee avec des croquettes cachees dans les plis. Gratuit et aussi efficace !',
  },
  {
    id: 'mental-kong',
    category: EnrichmentCategory.MENTAL,
    name: 'Kong fourre — Occupation longue',
    description: 'Remplis un Kong de nourriture et congele-le. Occupe le chien 20 a 40 minutes et calme l\'anxiete.',
    durationMinutes: 5,
    difficulty: 1,
    materials: ['Kong ou jouet creux', 'Beurre d\'arachide (sans xylitol !)', 'Croquettes', 'Banane ou yogourt'],
    steps: [
      { instruction: 'Melange : croquettes + un peu de beurre d\'arachide + banane ecrasee.', durationSeconds: 30, tip: 'ATTENTION : le beurre d\'arachide ne doit PAS contenir de xylitol (toxique pour les chiens).' },
      { instruction: 'Remplis le Kong avec le melange. Tasse bien.', durationSeconds: 30 },
      { instruction: 'Mets au congelateur 2-4 heures (ou toute la nuit).', durationSeconds: 10 },
      { instruction: 'Donne le Kong au chien dans un endroit calme (son tapis, sa cage ouverte).', durationSeconds: 10 },
      { instruction: 'Laisse-le travailler. Ne l\'aide pas ! C\'est le defi qui est stimulant.', durationSeconds: 120 },
    ],
    benefits: [
      'Occupe le chien pendant 20-40 minutes',
      'Le lechage libere des endorphines (effet calmant)',
      'Ideal AVANT les situations stressantes (visiteurs, orage, depart)',
      'Remplace la mastication destructrice',
    ],
    tip: 'Prepare 3-4 Kongs d\'avance et garde-les au congelateur. Donne-en un 15 minutes avant l\'arrivee de visiteurs pour calmer le chien.',
  },

  // =========================================
  // TRAVAIL OLFACTIF AVANCE
  // =========================================
  {
    id: 'olfactif-boites',
    category: EnrichmentCategory.OLFACTIF,
    name: 'Jeu des boites — Discrimination olfactive',
    description: 'Le chien doit trouver dans quelle boite se cache la gaterie. Fait travailler le cerveau a fond.',
    durationMinutes: 7,
    difficulty: 2,
    prerequisite: 'mental-cherche',
    materials: ['3 boites/gobelets opaques', 'Gateries odorantes'],
    steps: [
      { instruction: 'Place 3 boites retournees au sol, en ligne.', durationSeconds: 10 },
      { instruction: 'DEVANT le chien, mets une gaterie sous UNE boite.', durationSeconds: 10, tip: 'Premiere fois : il doit te voir cacher la gaterie.' },
      { instruction: 'Dis "cherche !" et laisse le chien inspecter les boites.', durationSeconds: 30 },
      { instruction: 'Quand il touche/gratte la bonne boite : "OUI !" + souleve la boite + gaterie.', durationSeconds: 10 },
      { instruction: 'Repete 5 fois. Puis cache la gaterie SANS qu\'il voie.', durationSeconds: 60 },
      { instruction: 'Augmente a 5 boites quand il reussit 4/5 avec 3 boites.', durationSeconds: 90 },
    ],
    benefits: [
      'Stimulation mentale intense (fatigue sans effort physique)',
      'Renforce la confiance (il "resout un probleme")',
      'Calme les chiens reactifs (concentration vs hyper-vigilance)',
    ],
    tip: 'Les schnauzers ont un excellent nez. Ce jeu utilise leur instinct naturel de chien ratier. Ils ADORENT ca.',
  },

  // =========================================
  // CONFIANCE & PROPRIOCEPTION
  // =========================================
  {
    id: 'confiance-surfaces',
    category: EnrichmentCategory.CONFIANCE,
    name: 'Parcours de surfaces — Proprioception',
    description: 'Le chien marche sur differentes surfaces pour gagner en confiance et en conscience corporelle.',
    durationMinutes: 7,
    difficulty: 1,
    materials: ['Coussin', 'Planche de bois', 'Tapis de bain', 'Bache/sac plastique', 'Grille metalique (refroidissement patisserie)'],
    steps: [
      { instruction: 'Installe un "parcours" au sol : coussin, planche, tapis, bache en ligne.', durationSeconds: 30 },
      { instruction: 'Mets-toi au bout du parcours avec des gateries.', durationSeconds: 5 },
      { instruction: 'Attire le chien sur la premiere surface avec une gaterie. Recompense des qu\'il y met une patte.', durationSeconds: 30, tip: 'Ne le force JAMAIS sur une surface. Il doit choisir.' },
      { instruction: 'S\'il hesite : pose des gateries SUR la surface et attends.', durationSeconds: 30 },
      { instruction: 'Chaque surface traversee = jackpot de gateries + fete !', durationSeconds: 60 },
      { instruction: 'Ajoute de nouvelles surfaces chaque semaine. Le but est la variete.', durationSeconds: 60 },
    ],
    benefits: [
      'Augmente la confiance en soi (chiens craintifs)',
      'Ameliore la conscience corporelle (proprioception)',
      'Prepare aux surfaces inconnues en promenade (grilles, flaques)',
      'Reduit la reactivite par la confiance',
    ],
    tip: 'Un chien qui a confiance en ses pattes reagit moins aux stimuli. La proprioception est un outil sous-estime contre la reactivite.',
  },
  {
    id: 'confiance-tunnel',
    category: EnrichmentCategory.CONFIANCE,
    name: 'Passer dans un tunnel — Bravoure',
    description: 'Le chien traverse un tunnel improvise. Excellent pour la confiance et le fun.',
    durationMinutes: 5,
    difficulty: 2,
    materials: ['Chaises + couverture (tunnel maison)', 'Ou carton long de frigo/lave-vaisselle'],
    steps: [
      { instruction: 'Cree un tunnel : 2 chaises avec une couverture par-dessus, ou un grand carton ouvert des 2 cotes.', durationSeconds: 30 },
      { instruction: 'Commence COURT : tunnel de 50 cm seulement. Le chien doit voir la sortie.', durationSeconds: 10, tip: 'Si le tunnel est trop long, le chien ne verra pas la sortie et aura peur.' },
      { instruction: 'Mets-toi de l\'autre cote et montre une gaterie. Dis "viens !" joyeusement.', durationSeconds: 15 },
      { instruction: 'Quand il traverse : ENORME fete + jackpot de gateries.', durationSeconds: 10 },
      { instruction: 'Allonge progressivement le tunnel (ajoute des chaises).', durationSeconds: 60 },
      { instruction: 'Ajoute le mot "tunnel" avant l\'invitation.', durationSeconds: 60 },
    ],
    benefits: [
      'Enorme boost de confiance',
      'Apprend a gerer un espace confine (transport, veterinaire)',
      'Super fun — les chiens adorent une fois qu\'ils comprennent',
    ],
    tip: 'Si le chien refuse : enleve le toit du tunnel (juste les cotes). Puis remets le toit graduellement.',
  },

  // =========================================
  // FUN & JEUX INTERACTIFS
  // =========================================
  {
    id: 'fun-cache-cache',
    category: EnrichmentCategory.FUN,
    name: 'Cache-cache — Rappel fun',
    description: 'Tu te caches et le chien doit te retrouver. Renforce le rappel de maniere ludique.',
    durationMinutes: 7,
    difficulty: 1,
    prerequisite: 'regard-base',
    steps: [
      { instruction: 'Demande a quelqu\'un de tenir le chien (ou mets-le en "reste").', durationSeconds: 10 },
      { instruction: 'NIVEAU 1 : Cache-toi derriere un meuble, visible a moitie. Appelle son nom.', durationSeconds: 15, tip: 'Il doit gagner facilement les premieres fois !' },
      { instruction: 'Quand il te trouve : enorme fete + gateries + joie !', durationSeconds: 10 },
      { instruction: 'NIVEAU 2 : Cache-toi dans une autre piece, porte ouverte.', durationSeconds: 60 },
      { instruction: 'NIVEAU 3 : Cache-toi mieux (derriere un rideau, dans la douche). Appelle UNE fois.', durationSeconds: 120 },
      { instruction: 'Fais 3-5 tours puis arrete. Termine toujours sur un succes.', durationSeconds: 30 },
    ],
    benefits: [
      'Renforce le rappel (venir quand on appelle = super fun)',
      'Stimulation mentale + physique',
      'Renforce le lien d\'attachement',
      'Le chien apprend que te chercher est payant',
    ],
    tip: 'Joue a ca dans le jardin aussi ! C\'est un excellent exercice de rappel deguise en jeu.',
  },
  {
    id: 'fun-rangement',
    category: EnrichmentCategory.FUN,
    name: 'Range tes jouets — Trick pratique',
    description: 'Le chien prend un jouet et le depose dans un bac. Utile ET impressionnant.',
    durationMinutes: 10,
    difficulty: 3,
    prerequisite: 'trick-touche',
    materials: ['Bac/boite basse', 'Jouet que le chien aime prendre en gueule'],
    steps: [
      { instruction: 'Etape 1 — PREND : Presente le jouet. Quand il le prend en gueule : "OUI" + gaterie.', durationSeconds: 30 },
      { instruction: 'Repete 5 fois jusqu\'a ce qu\'il prenne le jouet volontairement.', durationSeconds: 60 },
      { instruction: 'Etape 2 — PORTE : Presente ta main. Quand il apporte le jouet vers ta main : "OUI" + gaterie.', durationSeconds: 60, tip: 'On decompose ! Chaque etape est un exercice separe.' },
      { instruction: 'Etape 3 — LACHE : Tiens le bac sous sa gueule. Quand il lache le jouet dedans : JACKPOT !', durationSeconds: 60 },
      { instruction: 'Etape 4 — ASSEMBLE : Jouet au sol + bac a 30 cm. Guide : prend → porte vers bac → lache dedans.', durationSeconds: 120 },
      { instruction: 'Ajoute le mot "range" quand la chaine est fluide. Un jouet a la fois !', durationSeconds: 60 },
    ],
    benefits: [
      'Stimulation mentale tres intense',
      'Enchainement de comportements (cognition avancee)',
      'Utile pour le quotidien !',
      'Impressionne enormement les visiteurs',
    ],
    tip: 'C\'est un trick AVANCE. Prends 2-3 semaines, avec des sessions de 3 minutes max. Le schnauzer est assez intelligent pour ca !',
  },
];

export function getEnrichmentById(id: string): EnrichmentActivity | undefined {
  return ENRICHMENT_ACTIVITIES.find((a) => a.id === id);
}

export function getEnrichmentByCategory(category: EnrichmentCategory): EnrichmentActivity[] {
  return ENRICHMENT_ACTIVITIES.filter((a) => a.category === category);
}

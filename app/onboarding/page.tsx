'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addDog, saveOnboardingProfile } from '@/lib/db/database';
import { Trigger } from '@/lib/types';
import { nowISO } from '@/lib/utils';

// ---- DONNÉES DES ÉTAPES ----

const TRIGGER_OPTIONS = [
  { value: Trigger.BRUIT, label: 'Bruits dans la maison', emoji: '🔊', example: 'Porte, aspirateur, objets qui tombent' },
  { value: Trigger.VISITEUR, label: 'Départ ou arrivée', emoji: '🚪', example: 'Quelqu\u2019un part ou arrive' },
  { value: Trigger.CHIEN, label: 'Chiens dehors', emoji: '🐕', example: 'En promenade ou par la fenêtre' },
  { value: Trigger.TELEVISION, label: 'Animaux à la télé', emoji: '📺', example: 'Images ou sons d\u2019animaux à l\u2019écran' },
  { value: Trigger.VELO, label: 'Vélos / joggers', emoji: '🚴', example: 'Mouvements rapides en promenade' },
  { value: Trigger.ENFANT, label: 'Enfants', emoji: '👶', example: 'Cris, mouvements brusques' },
];

const FIRST_HABITS: Record<string, { label: string; protocol: string }> = {
  capturer_calme: {
    label: 'Capturer le calme',
    protocol: 'Quand ton chien est calme, dis \u00ab oui \u00bb et donne une gâterie. Sans rien demander. Juste récompenser le calme.',
  },
  faux_departs: {
    label: 'Faux départs',
    protocol: 'Prends tes clés, touche la poignée, reviens t\u2019asseoir. Récompense le calme. Répète 3-5 fois.',
  },
  desensibilisation_bruits: {
    label: 'Micro-pauses après un bruit',
    protocol: 'Après un bruit, attends 1 seconde de calme. Marque (\u00ab oui ! \u00bb) et récompense. Le but : le bruit = une gâterie arrive.',
  },
  regard_chien: {
    label: 'Le jeu du regard',
    protocol: 'Quand ton chien voit un chien au loin et te regarde : \u00ab oui ! \u00bb + gâterie. La distance est ton amie.',
  },
  place_tele: {
    label: 'Place avant la télé',
    protocol: 'Avant d\u2019allumer, envoie-le sur son tapis avec un Kong. Récompense le calme pendant les scènes calmes.',
  },
};

// ---- COMPOSANT PRINCIPAL ----

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Step 1: Noms
  const [dog1Name, setDog1Name] = useState('');
  const [dog2Name, setDog2Name] = useState('');

  // Step 2: Focus
  const [focusDog, setFocusDog] = useState<'dog1' | 'dog2' | 'both' | ''>('');

  // Step 3: Triggers
  const [triggers, setTriggers] = useState<Trigger[]>([]);

  // Step 4: Time
  const [dailyMinutes, setDailyMinutes] = useState<5 | 10 | 15 | 0>(0);

  // Step 5: First habit (derived, but user can pick)
  const [firstHabit, setFirstHabit] = useState('');

  const hasTwoDogs = dog2Name.trim().length > 0;
  const totalSteps = hasTwoDogs ? 6 : 5;

  function toggleTrigger(t: Trigger) {
    setTriggers((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : prev.length < 3 ? [...prev, t] : prev
    );
  }

  function deriveFirstHabit(): string {
    if (triggers.includes(Trigger.VISITEUR)) return 'faux_departs';
    if (triggers.includes(Trigger.BRUIT)) return 'desensibilisation_bruits';
    if (triggers.includes(Trigger.CHIEN)) return 'regard_chien';
    if (triggers.includes(Trigger.TELEVISION)) return 'place_tele';
    return 'capturer_calme';
  }

  function getFocusDogName(): string {
    if (focusDog === 'dog1') return dog1Name;
    if (focusDog === 'dog2') return dog2Name;
    return 'les deux';
  }

  async function handleFinish() {
    // Si un seul chien, il est toujours le trigger dog
    const dog1IsTrigger = !hasTwoDogs || focusDog === 'dog1' || focusDog === 'both';
    await addDog({
      name: dog1Name.trim(),
      age: 36,
      weight: 8,
      particularities: '',
      isTriggerDog: dog1IsTrigger,
      sensitivities: triggers,
      masteredSkills: [],
      mainObjective: 'Réduire la réactivité',
      createdAt: nowISO(),
    });

    if (hasTwoDogs) {
      await addDog({
        name: dog2Name.trim(),
        age: 36,
        weight: 8,
        particularities: '',
        isTriggerDog: focusDog === 'dog2',
        sensitivities: triggers,
        masteredSkills: [],
        mainObjective: 'Réduire la réactivité',
        createdAt: nowISO(),
      });
    }

    const habit = firstHabit || deriveFirstHabit();
    const focusName = hasTwoDogs ? getFocusDogName() : dog1Name;
    await saveOnboardingProfile({
      focusDogName: focusName,
      mainTriggers: triggers,
      dailyMinutes: (dailyMinutes || 5) as 5 | 10 | 15,
      firstHabit: habit,
      suggestedProtocol: FIRST_HABITS[habit]?.protocol || FIRST_HABITS.capturer_calme.protocol,
      createdAt: nowISO(),
    });

    router.push('/');
  }

  // ---- STEP 0: BIENVENUE ----
  if (step === 0) {
    return (
      <div className="py-8 flex flex-col items-center text-center">
        <span className="text-5xl mb-4">🐾</span>
        <h1 className="text-2xl font-bold mb-3">
          On va t&apos;aider, pas à pas.
        </h1>
        <p className="text-gray-600 mb-2 max-w-xs">
          Ton chien réagit ? C&apos;est normal. Il n&apos;est pas méchant, il est dépassé.
        </p>
        <p className="text-gray-500 text-sm mb-8 max-w-xs">
          On va te donner un plan simple, réaliste, et adapté à ta réalité.
          Pas de jargon. Juste quoi faire, et quand.
        </p>
        <button
          onClick={() => setStep(1)}
          className="w-full max-w-xs p-4 bg-blue-600 text-white rounded-xl text-lg font-semibold active:bg-blue-700 transition-colors"
        >
          Commencer
        </button>
        <p className="text-xs text-gray-400 mt-4">5 questions rapides — moins de 2 minutes</p>
      </div>
    );
  }

  // ---- STEP 1: NOMS DES CHIENS ----
  if (step === 1) {
    return (
      <div className="py-6">
        <StepHeader step={1} total={totalSteps} title="Tes chiens" subtitle="Comment s&apos;appellent-ils ?" />

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Premier chien</label>
            <input
              type="text"
              value={dog1Name}
              onChange={(e) => setDog1Name(e.target.value)}
              placeholder="Ex : Thor"
              className="w-full p-4 rounded-xl border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deuxième chien (optionnel)</label>
            <input
              type="text"
              value={dog2Name}
              onChange={(e) => setDog2Name(e.target.value)}
              placeholder="Ex : Loki"
              className="w-full p-4 rounded-xl border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <NavButtons
          canGoBack={true}
          canGoNext={dog1Name.trim().length > 0}
          onBack={() => setStep(0)}
          onNext={() => setStep(dog2Name.trim() ? 2 : 3)}
          nextLabel="Suivant"
        />
      </div>
    );
  }

  // ---- STEP 2: QUI EN PREMIER (seulement si 2 chiens) ----
  if (step === 2) {
    return (
      <div className="py-6">
        <StepHeader
          step={2}
          total={totalSteps}
          title="Par qui on commence ?"
          subtitle="Avec deux chiens réactifs, c&apos;est plus efficace de se concentrer sur un seul au début."
        />

        <div className="flex flex-col gap-3 mb-6">
          <ChoiceButton
            selected={focusDog === 'dog1'}
            onClick={() => setFocusDog('dog1')}
            emoji="⚡"
            label={dog1Name}
            detail="Il déclenche le plus souvent"
          />
          <ChoiceButton
            selected={focusDog === 'dog2'}
            onClick={() => setFocusDog('dog2')}
            emoji="🐾"
            label={dog2Name}
            detail="Il déclenche le plus souvent"
          />
          <ChoiceButton
            selected={focusDog === 'both'}
            onClick={() => setFocusDog('both')}
            emoji="👥"
            label="Les deux en même temps"
            detail="Ils sont à peu près au même niveau"
          />
        </div>

        <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-700 mb-6">
          Pas de souci, tu pourras toujours changer plus tard. On te guide étape par étape.
        </div>

        <NavButtons
          canGoBack={true}
          canGoNext={focusDog !== ''}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      </div>
    );
  }

  // ---- STEP 3: DÉCLENCHEURS ----
  if (step === 3) {
    const stepNum = hasTwoDogs ? 3 : 2;
    return (
      <div className="py-6">
        <StepHeader
          step={stepNum}
          total={totalSteps}
          title="Qu&apos;est-ce qui déclenche le plus ?"
          subtitle="Choisis les 2-3 situations les plus fréquentes."
        />

        <div className="flex flex-col gap-2 mb-6">
          {TRIGGER_OPTIONS.map((opt) => {
            const selected = triggers.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggleTrigger(opt.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  selected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white'
                } ${!selected && triggers.length >= 3 ? 'opacity-40' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{opt.emoji}</span>
                  <div>
                    <div className="font-medium">{opt.label}</div>
                    <div className="text-xs text-gray-500">{opt.example}</div>
                  </div>
                  {selected && <span className="ml-auto text-blue-600 text-xl">✓</span>}
                </div>
              </button>
            );
          })}
        </div>

        {triggers.length > 0 && (
          <p className="text-xs text-gray-400 text-center mb-4">
            {triggers.length}/3 sélectionné{triggers.length > 1 ? 's' : ''}
          </p>
        )}

        <NavButtons
          canGoBack={true}
          canGoNext={triggers.length > 0}
          onBack={() => setStep(hasTwoDogs ? 2 : 1)}
          onNext={() => setStep(4)}
        />
      </div>
    );
  }

  // ---- STEP 4: TEMPS DISPONIBLE ----
  if (step === 4) {
    const stepNum = hasTwoDogs ? 4 : 3;
    return (
      <div className="py-6">
        <StepHeader
          step={stepNum}
          total={totalSteps}
          title="Combien de temps par jour ?"
          subtitle="Sois réaliste. La constance compte plus que la durée."
        />

        <div className="flex flex-col gap-3 mb-6">
          <ChoiceButton
            selected={dailyMinutes === 5}
            onClick={() => setDailyMinutes(5)}
            emoji="⏱️"
            label="5 minutes"
            detail="Parfait pour commencer. 1 micro-séance par jour."
          />
          <ChoiceButton
            selected={dailyMinutes === 10}
            onClick={() => setDailyMinutes(10)}
            emoji="⏱️"
            label="10 minutes"
            detail="2 micro-séances de 5 min. Très efficace."
          />
          <ChoiceButton
            selected={dailyMinutes === 15}
            onClick={() => setDailyMinutes(15)}
            emoji="⏱️"
            label="15 minutes"
            detail="3 micro-séances. Idéal si tu as le temps."
          />
        </div>

        <div className="bg-green-50 rounded-xl p-3 text-sm text-green-700 mb-6">
          5 minutes par jour, c&apos;est déjà énorme. Le cerveau du chien apprend mieux en séances courtes.
        </div>

        <NavButtons
          canGoBack={true}
          canGoNext={dailyMinutes > 0}
          onBack={() => setStep(3)}
          onNext={() => {
            if (!firstHabit) setFirstHabit(deriveFirstHabit());
            setStep(5);
          }}
        />
      </div>
    );
  }

  // ---- STEP 5: RÉSUMÉ + PLAN DE DÉPART ----
  if (step === 5) {
    const habit = firstHabit || deriveFirstHabit();
    const habitData = FIRST_HABITS[habit] || FIRST_HABITS.capturer_calme;
    const focusName = hasTwoDogs ? getFocusDogName() : dog1Name;

    return (
      <div className="py-6">
        <div className="text-center mb-6">
          <span className="text-5xl">✨</span>
          <h1 className="text-2xl font-bold mt-3">Ton plan de départ</h1>
          <p className="text-gray-500 text-sm mt-1">Simple, concret, réaliste.</p>
        </div>

        {/* Résumé visuel */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
          <div className="flex flex-col gap-3">
            <SummaryRow emoji="🎯" label="Focus" value={focusName} />
            <SummaryRow
              emoji="⚡"
              label="Déclencheurs"
              value={triggers.map((t) => TRIGGER_OPTIONS.find((o) => o.value === t)?.label || t).join(', ')}
            />
            <SummaryRow emoji="⏱️" label="Temps" value={`${dailyMinutes} min / jour`} />
            <SummaryRow emoji="🌱" label="Première habitude" value={habitData.label} />
          </div>
        </div>

        {/* Protocole du jour */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-blue-800 mb-2">Aujourd&apos;hui, fais juste ça :</h3>
          <p className="text-sm text-blue-700">{habitData.protocol}</p>
          <p className="text-xs text-blue-500 mt-2">
            C&apos;est tout. Pas besoin de plus pour aujourd&apos;hui.
          </p>
        </div>

        {/* Changer l'habitude */}
        <details className="mb-6">
          <summary className="text-sm text-gray-500 cursor-pointer">
            Changer la première habitude
          </summary>
          <div className="flex flex-col gap-2 mt-3">
            {Object.entries(FIRST_HABITS).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setFirstHabit(key)}
                className={`p-3 rounded-xl border-2 text-left text-sm transition-all ${
                  (firstHabit || deriveFirstHabit()) === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="font-medium">{data.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{data.protocol.slice(0, 80)}...</div>
              </button>
            ))}
          </div>
        </details>

        <button
          onClick={handleFinish}
          className="w-full p-4 bg-blue-600 text-white rounded-xl text-lg font-semibold active:bg-blue-700 transition-colors mb-3"
        >
          C&apos;est parti !
        </button>
        <button
          onClick={() => setStep(4)}
          className="w-full p-3 text-gray-500 text-sm"
        >
          Revenir en arrière
        </button>
      </div>
    );
  }

  return null;
}

// ---- COMPOSANTS RÉUTILISABLES ----

function StepHeader({ step, total, title, subtitle }: { step: number; total: number; title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        {Array.from({ length: total - 1 }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < step ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function ChoiceButton({
  selected,
  onClick,
  emoji,
  label,
  detail,
}: {
  selected: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
  detail: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
        selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <div className="flex-1">
          <div className="font-medium">{label}</div>
          <div className="text-xs text-gray-500">{detail}</div>
        </div>
        {selected && <span className="text-blue-600 text-xl">✓</span>}
      </div>
    </button>
  );
}

function NavButtons({
  canGoBack,
  canGoNext,
  onBack,
  onNext,
  nextLabel = 'Suivant',
}: {
  canGoBack: boolean;
  canGoNext: boolean;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="flex gap-3">
      {canGoBack && (
        <button
          onClick={onBack}
          className="px-6 py-4 rounded-xl border border-gray-300 text-gray-600 font-medium"
        >
          Retour
        </button>
      )}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="flex-1 p-4 bg-blue-600 text-white rounded-xl text-lg font-semibold disabled:opacity-40 active:bg-blue-700 transition-colors"
      >
        {nextLabel}
      </button>
    </div>
  );
}

function SummaryRow({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg">{emoji}</span>
      <div>
        <div className="text-xs text-gray-500 uppercase font-medium">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}

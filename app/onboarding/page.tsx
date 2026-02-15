'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addDog } from '@/lib/db/database';
import { Trigger, TRIGGER_LABELS } from '@/lib/types';
import { nowISO } from '@/lib/utils';

const SENSITIVITY_OPTIONS = [
  { value: Trigger.BRUIT, label: 'Bruits' },
  { value: Trigger.VISITEUR, label: 'Visiteurs' },
  { value: Trigger.CHIEN, label: 'Autres chiens' },
  { value: Trigger.CHAT, label: 'Chats' },
  { value: Trigger.VELO, label: 'Vélos' },
  { value: Trigger.ENFANT, label: 'Enfants' },
];

const SKILL_OPTIONS = [
  { id: 'assis-base', label: 'Assis' },
  { id: 'couche-base', label: 'Couché' },
  { id: 'reste-base', label: 'Reste' },
  { id: 'regard-base', label: 'Regard / Contact visuel' },
  { id: 'trick-touche', label: 'Touche (nez dans la main)' },
  { id: 'trick-donne-patte', label: 'Donne la patte' },
  { id: 'trick-tourne', label: 'Tourne / Pirouette' },
  { id: 'place-tapis', label: 'Place / Va au tapis' },
  { id: 'marche-exploratoire', label: 'Marche en laisse' },
];

interface DogForm {
  name: string;
  age: string;
  weight: string;
  particularities: string;
  isTriggerDog: boolean;
  sensitivities: Trigger[];
  masteredSkills: string[];
  mainObjective: string;
}

const emptyDog: DogForm = {
  name: '',
  age: '31',
  weight: '8',
  particularities: '',
  isTriggerDog: false,
  sensitivities: [],
  masteredSkills: [],
  mainObjective: '',
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [dogs, setDogs] = useState<DogForm[]>([
    { ...emptyDog, name: 'Thor', isTriggerDog: true, masteredSkills: ['assis-base', 'trick-touche', 'trick-donne-patte'] },
    { ...emptyDog, name: 'Loki', masteredSkills: ['assis-base', 'trick-touche', 'trick-donne-patte'] },
  ]);

  const currentDog = dogs[step < 2 ? step : 0];

  function updateDog(index: number, data: Partial<DogForm>) {
    setDogs((prev) => prev.map((d, i) => (i === index ? { ...d, ...data } : d)));
  }

  function toggleSensitivity(index: number, trigger: Trigger) {
    const current = dogs[index].sensitivities;
    const updated = current.includes(trigger)
      ? current.filter((t) => t !== trigger)
      : [...current, trigger];
    updateDog(index, { sensitivities: updated });
  }

  function toggleSkill(index: number, skillId: string) {
    const current = dogs[index].masteredSkills;
    const updated = current.includes(skillId)
      ? current.filter((s) => s !== skillId)
      : [...current, skillId];
    updateDog(index, { masteredSkills: updated });
  }

  async function handleFinish() {
    for (const dog of dogs) {
      if (!dog.name.trim()) continue;
      await addDog({
        name: dog.name.trim(),
        age: parseInt(dog.age) || 0,
        weight: parseFloat(dog.weight) || 0,
        particularities: dog.particularities,
        isTriggerDog: dog.isTriggerDog,
        sensitivities: dog.sensitivities,
        masteredSkills: dog.masteredSkills,
        mainObjective: dog.mainObjective || 'Réduire la réactivité',
        createdAt: nowISO(),
      });
    }
    router.push('/');
  }

  // Step 0 & 1: Dog profiles
  if (step < 2) {
    const i = step;
    const dog = dogs[i];
    return (
      <div className="py-6">
        <div className="text-center mb-6">
          <span className="text-4xl">{i === 0 ? '⚡' : '🐾'}</span>
          <h1 className="text-2xl font-bold mt-2">
            {i === 0 ? 'Chien 1 — Le déclencheur' : 'Chien 2 — Le partenaire'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Étape {step + 1} sur 3</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              value={dog.name}
              onChange={(e) => updateDog(i, { name: e.target.value })}
              placeholder="Ex : Thor"
              className="w-full p-4 rounded-xl border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Âge (mois)</label>
              <input
                type="number"
                value={dog.age}
                onChange={(e) => updateDog(i, { age: e.target.value })}
                placeholder="12"
                className="w-full p-4 rounded-xl border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg)</label>
              <input
                type="number"
                value={dog.weight}
                onChange={(e) => updateDog(i, { weight: e.target.value })}
                placeholder="8"
                className="w-full p-4 rounded-xl border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Particularités</label>
            <textarea
              value={dog.particularities}
              onChange={(e) => updateDog(i, { particularities: e.target.value })}
              placeholder="Ex : Peur des camions, tire en laisse..."
              rows={2}
              className="w-full p-4 rounded-xl border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sensibilités</label>
            <div className="flex flex-wrap gap-2">
              {SENSITIVITY_OPTIONS.map((opt) => {
                const selected = dog.sensitivities.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggleSensitivity(i, opt.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selected
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Commandes déjà acquises</label>
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map((opt) => {
                const selected = dog.masteredSkills.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleSkill(i, opt.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selected
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {selected ? '✓ ' : ''}{opt.label}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-1">Sélectionne ce que ce chien sait déjà faire</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Objectif principal</label>
            <input
              type="text"
              value={dog.mainObjective}
              onChange={(e) => updateDog(i, { mainObjective: e.target.value })}
              placeholder="Ex : Aboiements cour + visites"
              className="w-full p-4 rounded-xl border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {i === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800">
              Thor est identifié comme le <strong>chien déclencheur</strong>. L'app recommandera
              de l'entraîner en premier, séparément.
            </div>
          )}

          <button
            onClick={() => setStep(step + 1)}
            disabled={!dog.name.trim()}
            className="w-full p-4 bg-blue-600 text-white rounded-xl text-lg font-semibold disabled:opacity-40 active:bg-blue-700 transition-colors mt-2"
          >
            {i === 0 ? 'Suivant — Chien 2' : 'Suivant — Finaliser'}
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Confirmation
  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <span className="text-4xl">✅</span>
        <h1 className="text-2xl font-bold mt-2">Tout est prêt !</h1>
        <p className="text-gray-500 text-sm mt-1">Vos profils</p>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        {dogs.map((dog, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{dog.isTriggerDog ? '⚡' : '🐾'}</span>
              <div>
                <div className="font-bold text-lg">{dog.name || `Chien ${i + 1}`}</div>
                <div className="text-sm text-gray-500">
                  {dog.age ? `${dog.age} mois` : '?'} · {dog.weight ? `${dog.weight} kg` : '?'}
                  {dog.isTriggerDog && ' · Déclencheur'}
                </div>
              </div>
            </div>
            {dog.sensitivities.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {dog.sensitivities.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs">
                    {TRIGGER_LABELS[s]}
                  </span>
                ))}
              </div>
            )}
            {dog.masteredSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {dog.masteredSkills.map((skillId) => {
                  const skill = SKILL_OPTIONS.find((o) => o.id === skillId);
                  return (
                    <span key={skillId} className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                      ✓ {skill?.label || skillId}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 mb-6">
        <strong>Niveau : Débutant</strong>
        <p className="mt-1">L'app va te guider pas à pas. On commence doucement, à la maison.</p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleFinish}
          className="w-full p-4 bg-blue-600 text-white rounded-xl text-lg font-semibold active:bg-blue-700 transition-colors"
        >
          C'est parti !
        </button>
        <button
          onClick={() => setStep(0)}
          className="w-full p-3 text-gray-500 text-sm"
        >
          Modifier les profils
        </button>
      </div>
    </div>
  );
}

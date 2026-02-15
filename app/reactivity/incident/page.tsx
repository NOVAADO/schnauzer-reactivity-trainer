'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDogs } from '@/lib/hooks';
import { addIncident } from '@/lib/db/database';
import { Context, Trigger, Outcome, CONTEXT_LABELS, TRIGGER_LABELS, OUTCOME_LABELS } from '@/lib/types';
import { todayStr, nowISO } from '@/lib/utils';

const QUICK_ACTIONS = [
  'Place / tapis',
  'Regard / attention',
  'Éloignement',
  'Demi-tour',
  'Redirection jouet',
  'Rentre à la maison',
  'Ignore',
  'Assis / couche',
  'Tapis de léchage',
];

export default function IncidentPage() {
  const router = useRouter();
  const dogs = useDogs();

  const [dogId, setDogId] = useState<number>(0);
  const [context, setContext] = useState<Context>(Context.COUR);
  const [trigger, setTrigger] = useState<Trigger>(Trigger.CHIEN);
  const [intensity, setIntensity] = useState(3);
  const [action, setAction] = useState('');
  const [customAction, setCustomAction] = useState('');
  const [outcome, setOutcome] = useState<Outcome>(Outcome.PAREIL);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  // Fix: useEffect for default dog
  useEffect(() => {
    if (dogs.length > 0 && dogId === 0) {
      const triggerDog = dogs.find((d) => d.isTriggerDog);
      setDogId((triggerDog ?? dogs[0]).id!);
    }
  }, [dogs, dogId]);

  async function handleSave() {
    const finalAction = action === 'Autre' ? customAction : action || 'Non spécifié';
    await addIncident({
      dogId,
      context,
      trigger,
      intensity,
      actionTaken: finalAction,
      outcome,
      notes: notes || undefined,
      date: todayStr(),
      createdAt: nowISO(),
    });
    setSaved(true);
    setTimeout(() => router.push('/reactivity'), 1200);
  }

  if (saved) {
    return (
      <div className="py-16 text-center">
        <span className="text-5xl">✅</span>
        <p className="text-lg font-semibold mt-4">Incident enregistré !</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <button onClick={() => router.back()} className="text-blue-600 text-sm mb-4">
        ← Retour
      </button>

      <h1 className="text-xl font-bold mb-1">Noter un incident</h1>
      <p className="text-sm text-gray-500 mb-4">Rapide — remplis ce que tu peux</p>

      <div className="flex flex-col gap-5">
        {/* Dog */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Quel chien ?</label>
          <div className="flex gap-2">
            {dogs.map((dog) => (
              <button
                key={dog.id}
                onClick={() => setDogId(dog.id!)}
                className={`flex-1 p-3 rounded-xl border-2 text-center text-sm font-medium transition-all ${
                  dogId === dog.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                {dog.isTriggerDog ? '⚡ ' : ''}{dog.name}
              </button>
            ))}
          </div>
        </div>

        {/* Context */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Où ?</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(Context).map((c) => (
              <button
                key={c}
                onClick={() => setContext(c)}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  context === c ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                {CONTEXT_LABELS[c]}
              </button>
            ))}
          </div>
        </div>

        {/* Trigger */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Déclencheur ?</label>
          <div className="flex flex-wrap gap-2">
            {Object.values(Trigger).map((t) => (
              <button
                key={t}
                onClick={() => setTrigger(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  trigger === t ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {TRIGGER_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Intensity */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Intensité : <strong>{intensity}/5</strong>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setIntensity(n)}
                className={`flex-1 p-3 rounded-xl border-2 text-center text-lg transition-all ${
                  intensity === n
                    ? n <= 2
                      ? 'border-green-500 bg-green-50'
                      : n === 3
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
            <span>Léger</span>
            <span>Moyen</span>
            <span>Explosion</span>
          </div>
        </div>

        {/* Action taken */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Qu{"'"}as-tu fait ?</label>
          <div className="flex flex-wrap gap-2">
            {[...QUICK_ACTIONS, 'Autre'].map((a) => (
              <button
                key={a}
                onClick={() => setAction(a)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  action === a ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          {action === 'Autre' && (
            <input
              type="text"
              value={customAction}
              onChange={(e) => setCustomAction(e.target.value)}
              placeholder="Décris ton action..."
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Outcome */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Résultat ?</label>
          <div className="grid grid-cols-3 gap-2">
            {Object.values(Outcome).map((o) => (
              <button
                key={o}
                onClick={() => setOutcome(o)}
                className={`p-3 rounded-xl border-2 text-center text-sm font-semibold transition-all ${
                  outcome === o
                    ? o === Outcome.MIEUX
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : o === Outcome.PAREIL
                      ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                      : 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200'
                }`}
              >
                {o === Outcome.MIEUX ? '👍' : o === Outcome.PAREIL ? '😐' : '👎'}{' '}
                {OUTCOME_LABELS[o]}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Notes rapides (optionnel)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex : Le camion de poubelle est passé, Thor a déclenché puis Loki a amplifié"
            rows={2}
            className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full p-4 bg-blue-600 text-white rounded-xl text-lg font-semibold active:bg-blue-700 transition-colors mt-2"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDogs } from '@/lib/hooks';
import { addIncident } from '@/lib/db/database';
import { Trigger, Outcome, TRIGGER_LABELS } from '@/lib/types';
import { todayStr, nowISO } from '@/lib/utils';

const TRIGGER_QUICK = [
  { value: Trigger.BRUIT, emoji: '🔊' },
  { value: Trigger.VISITEUR, emoji: '🚪' },
  { value: Trigger.CHIEN, emoji: '🐕' },
  { value: Trigger.TELEVISION, emoji: '📺' },
  { value: Trigger.VELO, emoji: '🚴' },
  { value: Trigger.ENFANT, emoji: '👶' },
];

export default function IncidentPage() {
  const router = useRouter();
  const dogs = useDogs();

  const [dogId, setDogId] = useState<number>(0);
  const [trigger, setTrigger] = useState<Trigger | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [quickRecovery, setQuickRecovery] = useState<boolean | null>(null);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (dogs.length > 0 && dogId === 0) {
      const triggerDog = dogs.find((d) => d.isTriggerDog);
      setDogId((triggerDog ?? dogs[0]).id!);
    }
  }, [dogs, dogId]);

  async function handleSave() {
    if (!trigger) return;
    const outcome = quickRecovery === true ? Outcome.MIEUX : quickRecovery === false ? Outcome.PAREIL : Outcome.PAREIL;
    await addIncident({
      dogId,
      context: 'maison' as any, // simplifié
      trigger,
      intensity,
      actionTaken: quickRecovery !== null
        ? (quickRecovery ? 'Récupération rapide' : 'Récupération lente')
        : 'Non précisé',
      outcome,
      notes: notes || undefined,
      date: todayStr(),
      createdAt: nowISO(),
    });
    setSaved(true);
    setTimeout(() => router.back(), 1200);
  }

  if (saved) {
    return (
      <div className="py-16 text-center">
        <span className="text-5xl">✅</span>
        <p className="text-lg font-semibold mt-4">Noté !</p>
        <p className="text-sm text-gray-500 mt-1">Ça prend forme.</p>
      </div>
    );
  }

  return (
    <div className="py-4 pb-28">
      <button onClick={() => router.back()} className="text-blue-600 text-sm mb-3 p-2 -ml-2">
        ← Retour
      </button>

      <h1 className="text-xl font-bold mb-1">Journal rapide</h1>
      <p className="text-sm text-gray-500 mb-4">5 secondes. Juste l&apos;essentiel.</p>

      <div className="flex flex-col gap-4">
        {/* Chien */}
        {dogs.length > 1 && (
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
        )}

        {/* Déclencheur */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Qu&apos;est-ce qui a déclenché ?</label>
          <div className="grid grid-cols-3 gap-2">
            {TRIGGER_QUICK.map((t) => (
              <button
                key={t.value}
                onClick={() => setTrigger(t.value)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  trigger === t.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <span className="text-2xl block">{t.emoji}</span>
                <span className="text-xs text-gray-600">{TRIGGER_LABELS[t.value]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Intensité */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Intensité
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
            <span>Fort</span>
          </div>
        </div>

        {/* Récupération + Note sur une même ligne visuelle */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Récupération rapide ?</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setQuickRecovery(true)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                quickRecovery === true ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
            >
              <span className="text-xl">👍</span>
              <div className="text-sm font-medium mt-1">Oui</div>
            </button>
            <button
              onClick={() => setQuickRecovery(false)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                quickRecovery === false ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
              }`}
            >
              <span className="text-xl">😤</span>
              <div className="text-sm font-medium mt-1">Non</div>
            </button>
          </div>
        </div>

        {/* Note optionnelle */}
        <div>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Note rapide (optionnel)"
            className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Bouton Enregistrer sticky en bas */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-2 pt-2 bg-white border-t border-gray-100 z-40">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleSave}
            disabled={!trigger}
            className="w-full p-4 bg-blue-600 text-white rounded-xl text-lg font-semibold disabled:opacity-40 active:bg-blue-700 transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

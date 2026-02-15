'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCareTaskById } from '@/lib/seed/care';
import { useDogs } from '@/lib/hooks';
import { addCareEntry, getCareEntries } from '@/lib/db/database';
import { todayStr, nowISO } from '@/lib/utils';

export default function CareDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const task = getCareTaskById(id);
  const dogs = useDogs();

  const [dogId, setDogId] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [tolerance, setTolerance] = useState(3);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const [lastStepDone, setLastStepDone] = useState(-1);

  // Fix: useEffect for default dog
  useEffect(() => {
    if (dogs.length > 0 && dogId === 0) {
      const triggerDog = dogs.find((d) => d.isTriggerDog);
      setDogId((triggerDog ?? dogs[0]).id!);
    }
  }, [dogs, dogId]);

  // Load last step completed for this dog/task
  useEffect(() => {
    if (dogId > 0 && task) {
      getCareEntries(dogId).then((entries) => {
        const forTask = entries.filter((e) => e.careTaskId === task.id);
        if (forTask.length > 0) {
          const maxStep = Math.max(...forTask.map((e) => e.stepCompleted));
          setLastStepDone(maxStep);
          // Auto-set to next step
          const nextStep = Math.min(maxStep + 1, task.steps.length - 1);
          setCurrentStep(nextStep);
          // Use last tolerance as default
          setTolerance(forTask[0].toleranceLevel);
        }
      });
    }
  }, [dogId, task]);

  if (!task) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">Soin introuvable</p>
        <button onClick={() => router.back()} className="mt-4 text-blue-600 font-semibold">
          Retour
        </button>
      </div>
    );
  }

  async function handleSave() {
    await addCareEntry({
      dogId,
      careTaskId: task!.id,
      toleranceLevel: tolerance,
      stepCompleted: currentStep,
      notes: notes || undefined,
      date: todayStr(),
      createdAt: nowISO(),
    });
    setSaved(true);
    setTimeout(() => router.push('/care'), 1200);
  }

  if (saved) {
    return (
      <div className="py-16 text-center">
        <span className="text-5xl">✅</span>
        <p className="text-lg font-semibold mt-4">Soin enregistre !</p>
        <p className="text-sm text-gray-500 mt-1">Bravo, chaque petite etape compte.</p>
      </div>
    );
  }

  const step = task.steps[currentStep];
  const progressPercent = lastStepDone >= 0 ? Math.round(((lastStepDone + 1) / task.steps.length) * 100) : 0;

  return (
    <div className="py-4">
      <button onClick={() => router.back()} className="text-blue-600 text-sm mb-4">
        ← Retour
      </button>

      <h1 className="text-xl font-bold mb-1">{task.name}</h1>
      <p className="text-sm text-gray-500 mb-2">{task.description}</p>

      {/* Progress indicator */}
      {lastStepDone >= 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progression</span>
            <span>{progressPercent}% — Jour {lastStepDone + 1}/{task.steps.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Dog selector */}
      <div className="flex gap-2 mb-4">
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

      {/* Step selector */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Etape du programme (jour {step.day ?? currentStep + 1})
        </label>
        <div className="flex gap-1.5 flex-wrap">
          {task.steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
                currentStep === i
                  ? 'bg-blue-600 text-white'
                  : i <= lastStepDone
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {i <= lastStepDone ? '✓' : (s.day ?? i + 1)}
            </button>
          ))}
        </div>
      </div>

      {/* Current step instruction */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-sm">
            {step.day ?? currentStep + 1}
          </div>
          <div>
            <p className="font-medium leading-relaxed">{step.instruction}</p>
            <p className="text-xs text-gray-400 mt-2">Duree : ~{step.durationSeconds} secondes</p>
          </div>
        </div>
      </div>

      {/* Important reminder */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-xs text-amber-800">
        <strong>Rappel :</strong> 10 secondes positives valent mieux que 30 secondes de lutte.
        Si le chien montre du stress, arrete et recompense ce qui a ete bien fait.
      </div>

      {/* Tolerance level */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Tolerance du chien : <strong>{tolerance}/5</strong>
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setTolerance(n)}
              className={`flex-1 p-3 rounded-xl border-2 text-center transition-all ${
                tolerance === n
                  ? n <= 2
                    ? 'border-red-400 bg-red-50'
                    : n === 3
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-green-400 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="text-lg">{n <= 2 ? '😟' : n === 3 ? '😐' : n === 4 ? '🙂' : '😄'}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {n === 1 ? 'Panique' : n === 2 ? 'Inconfort' : n === 3 ? 'Neutre' : n === 4 ? 'OK' : 'Adore'}
              </div>
            </button>
          ))}
        </div>
        {tolerance <= 2 && (
          <p className="text-xs text-red-600 mt-2 bg-red-50 rounded-lg p-2">
            Tolerance faible — reviens a l{"'"}etape precedente la prochaine fois. Termine sur une note positive maintenant.
          </p>
        )}
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">Notes (optionnel)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ex : A bien accepte la brosse sur le dos"
          rows={2}
          className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full p-4 bg-green-600 text-white rounded-xl text-lg font-semibold active:bg-green-700 transition-colors"
      >
        Enregistrer ce soin
      </button>
    </div>
  );
}

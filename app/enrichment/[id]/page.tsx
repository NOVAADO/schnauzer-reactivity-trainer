'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getEnrichmentById } from '@/lib/seed/enrichment';
import { useDogs } from '@/lib/hooks';

export default function EnrichmentDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const activity = getEnrichmentById(id);
  const dogs = useDogs();

  const [dogId, setDogId] = useState<number>(0);
  const [phase, setPhase] = useState<'intro' | 'steps' | 'done'>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [materialsChecked, setMaterialsChecked] = useState<Set<number>>(new Set());
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Default dog
  useEffect(() => {
    if (dogs.length > 0 && dogId === 0) {
      const triggerDog = dogs.find((d) => d.isTriggerDog);
      setDogId((triggerDog ?? dogs[0]).id!);
    }
  }, [dogs, dogId]);

  // Timer logic
  useEffect(() => {
    if (timerRunning && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning, timeRemaining]);

  if (!activity) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">Activite introuvable</p>
        <button onClick={() => router.back()} className="mt-4 text-blue-600 font-semibold">
          Retour
        </button>
      </div>
    );
  }

  const steps = activity.steps;
  const step = steps[currentStep];
  const totalSteps = steps.length;

  function startStepTimer() {
    setTimeRemaining(step.durationSeconds);
    setTimerRunning(true);
  }

  function handleNextStep() {
    setTimerRunning(false);
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setTimeRemaining(0);
    } else {
      setPhase('done');
    }
  }

  function handlePrevStep() {
    if (currentStep > 0) {
      setTimerRunning(false);
      setTimeRemaining(0);
      setCurrentStep(currentStep - 1);
    }
  }

  function toggleMaterial(idx: number) {
    setMaterialsChecked((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  }

  const DIFFICULTY_LABELS: Record<number, string> = {
    1: 'Debutant',
    2: 'Intermediaire',
    3: 'Avance',
  };

  const DIFFICULTY_COLORS: Record<number, string> = {
    1: 'bg-green-100 text-green-700',
    2: 'bg-yellow-100 text-yellow-700',
    3: 'bg-red-100 text-red-700',
  };

  // ---- PHASE: DONE ----
  if (phase === 'done') {
    return (
      <div className="py-8 text-center">
        <span className="text-6xl block mb-4">🎉</span>
        <h1 className="text-2xl font-bold mb-2">Bravo !</h1>
        <p className="text-gray-600 mb-2">
          Activite « {activity.name} » terminee !
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Chaque repetition renforce l{"'"}apprentissage. Reviens demain !
        </p>

        {/* Benefits recap */}
        <div className="bg-green-50 rounded-2xl p-4 mb-4 text-left mx-4">
          <h3 className="font-semibold text-green-800 mb-2">Ce que ca apporte :</h3>
          <ul className="text-sm text-green-700 space-y-1">
            {activity.benefits.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-50 rounded-2xl p-4 mx-4 mb-6 text-left">
          <p className="text-sm text-purple-800">
            <strong>Astuce :</strong> {activity.tip}
          </p>
        </div>

        <div className="flex gap-3 mx-4">
          <button
            onClick={() => {
              setPhase('intro');
              setCurrentStep(0);
              setTimerRunning(false);
              setTimeRemaining(0);
            }}
            className="flex-1 p-3 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold"
          >
            Recommencer
          </button>
          <button
            onClick={() => router.push('/enrichment')}
            className="flex-1 p-3 bg-purple-600 text-white rounded-xl font-semibold"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  // ---- PHASE: INTRO ----
  if (phase === 'intro') {
    return (
      <div className="py-4">
        <button onClick={() => router.back()} className="text-blue-600 text-sm mb-4">
          ← Retour
        </button>

        <h1 className="text-xl font-bold mb-1">{activity.name}</h1>
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[activity.difficulty]}`}>
            {DIFFICULTY_LABELS[activity.difficulty]}
          </span>
          <span className="text-sm text-gray-400">{activity.durationMinutes} min</span>
        </div>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{activity.description}</p>

        {/* Materials checklist */}
        {activity.materials && activity.materials.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
            <h3 className="font-semibold text-amber-800 mb-2">Materiel necessaire</h3>
            <div className="space-y-2">
              {activity.materials.map((mat, i) => (
                <button
                  key={i}
                  onClick={() => toggleMaterial(i)}
                  className="flex items-center gap-3 w-full text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                      materialsChecked.has(i)
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {materialsChecked.has(i) && (
                      <span className="text-white text-sm">✓</span>
                    )}
                  </div>
                  <span className={`text-sm ${materialsChecked.has(i) ? 'text-gray-400 line-through' : 'text-amber-800'}`}>
                    {mat}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dog selector */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Avec quel chien ?</label>
          <div className="flex gap-2">
            {dogs.map((dog) => (
              <button
                key={dog.id}
                onClick={() => setDogId(dog.id!)}
                className={`flex-1 p-3 rounded-xl border-2 text-center text-sm font-medium transition-all ${
                  dogId === dog.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                }`}
              >
                {dog.isTriggerDog ? '⚡ ' : ''}{dog.name}
              </button>
            ))}
          </div>
        </div>

        {/* Benefits preview */}
        <div className="bg-green-50 rounded-2xl p-4 mb-4">
          <h3 className="font-semibold text-green-800 mb-2">Benefices</h3>
          <ul className="text-sm text-green-700 space-y-1">
            {activity.benefits.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro tip */}
        <div className="bg-purple-50 rounded-2xl p-4 mb-4">
          <p className="text-sm text-purple-800">
            <strong>Astuce :</strong> {activity.tip}
          </p>
        </div>

        {/* Start button */}
        <button
          onClick={() => setPhase('steps')}
          className="w-full p-4 bg-purple-600 text-white rounded-xl text-lg font-semibold active:bg-purple-700 transition-colors"
        >
          Commencer ({totalSteps} etapes)
        </button>
      </div>
    );
  }

  // ---- PHASE: STEPS ----
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="py-4">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{activity.name}</span>
          <span>Etape {currentStep + 1}/{totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold">
            {currentStep + 1}
          </div>
          <div className="flex-1">
            <p className="font-medium leading-relaxed text-gray-800">{step.instruction}</p>
            {step.tip && (
              <div className="mt-3 bg-amber-50 rounded-xl p-3">
                <p className="text-xs text-amber-700">
                  <strong>Conseil :</strong> {step.tip}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timer */}
      {step.durationSeconds > 0 && (
        <div className="bg-gray-50 rounded-2xl p-4 mb-4 text-center">
          {!timerRunning && timeRemaining === 0 ? (
            <button
              onClick={startStepTimer}
              className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-medium text-sm"
            >
              ⏲ Lancer le chrono ({step.durationSeconds}s)
            </button>
          ) : (
            <div>
              <div className="text-4xl font-bold text-purple-700 mb-2">
                {timeRemaining > 0 ? timeRemaining : '✓'}
              </div>
              <div className="text-sm text-gray-500">
                {timeRemaining > 0 ? 'secondes restantes' : 'Temps ecoule !'}
              </div>
              {timerRunning && (
                <button
                  onClick={() => setTimerRunning(false)}
                  className="mt-2 text-xs text-gray-400"
                >
                  Pause
                </button>
              )}
              {!timerRunning && timeRemaining > 0 && (
                <button
                  onClick={() => setTimerRunning(true)}
                  className="mt-2 text-xs text-purple-500 font-medium"
                >
                  Reprendre
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={handlePrevStep}
          disabled={currentStep === 0}
          className={`flex-1 p-4 rounded-xl font-semibold transition-colors ${
            currentStep === 0
              ? 'bg-gray-100 text-gray-400'
              : 'border-2 border-purple-500 text-purple-600 active:bg-purple-50'
          }`}
        >
          ← Precedent
        </button>
        <button
          onClick={handleNextStep}
          className="flex-1 p-4 bg-purple-600 text-white rounded-xl font-semibold active:bg-purple-700 transition-colors"
        >
          {currentStep < totalSteps - 1 ? 'Suivant ›' : 'Terminer ✓'}
        </button>
      </div>

      {/* Quick reminder */}
      <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-700 text-center">
        Recompense chaque petit progres ! Le plaisir est la cle de l{"'"}apprentissage.
      </div>
    </div>
  );
}

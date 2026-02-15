'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getExerciseById } from '@/lib/seed/exercises';
import { useDogs, useSessions } from '@/lib/hooks';
import { addSession } from '@/lib/db/database';
import { SessionResult, DogMode, Context, CONTEXT_LABELS } from '@/lib/types';
import { todayStr, nowISO, formatDuration } from '@/lib/utils';
import ActivationBarometer from '@/components/ui/ActivationBarometer';
import DogSelector from '@/components/ui/DogSelector';
import Timer from '@/components/ui/Timer';

type Phase = 'setup' | 'steps' | 'result';

export default function ExerciseSessionPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const exercise = getExerciseById(id);
  const dogs = useDogs();
  const allSessions = useSessions();

  const [phase, setPhase] = useState<Phase>('setup');
  const [activation, setActivation] = useState(2);
  const [activationAfter, setActivationAfter] = useState(2);
  const [dogSelection, setDogSelection] = useState<{ dogId: number; mode: DogMode }>({
    dogId: 0,
    mode: DogMode.SOLO_THOR,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(0);
  const [showCalm, setShowCalm] = useState(false);
  const [environment, setEnvironment] = useState<Context>(Context.MAISON);

  // Fix: useEffect instead of render-time setState
  useEffect(() => {
    if (dogs.length > 0 && dogSelection.dogId === 0) {
      const trigger = dogs.find((d) => d.isTriggerDog);
      setDogSelection({
        dogId: (trigger ?? dogs[0]).id!,
        mode: trigger ? DogMode.SOLO_THOR : DogMode.SOLO_AUTRE,
      });
    }
  }, [dogs, dogSelection.dogId]);

  // Check if last session on this exercise failed
  const lastSession = allSessions.find((s) => s.exerciseId === id);
  const lastFailed = lastSession && (lastSession.result === SessionResult.STRESS || lastSession.result === SessionResult.TROP_DIFFICILE);

  const handleTimerComplete = useCallback(() => {
    if (exercise && currentStep < exercise.steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setPhase('result');
    }
  }, [exercise, currentStep]);

  if (!exercise) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">Exercice introuvable</p>
        <button onClick={() => router.back()} className="mt-4 text-blue-600 font-semibold">
          Retour
        </button>
      </div>
    );
  }

  const isBlocked = activation > exercise.maxActivation;

  async function saveResult(result: SessionResult) {
    const duration = sessionStartTime > 0 ? Math.floor((Date.now() - sessionStartTime) / 1000) : 0;
    await addSession({
      dogId: dogSelection.dogId,
      exerciseId: exercise!.id,
      dogMode: dogSelection.mode,
      activationBefore: activation,
      activationAfter: activationAfter,
      result,
      environment,
      durationSeconds: duration,
      date: todayStr(),
      createdAt: nowISO(),
    });
    router.push('/education');
  }

  // ---- SETUP PHASE ----
  if (phase === 'setup') {
    return (
      <div className="py-4">
        <button onClick={() => router.back()} className="text-blue-600 text-sm mb-4">
          ← Retour
        </button>

        <h1 className="text-xl font-bold mb-1">{exercise.name}</h1>
        <p className="text-sm text-gray-500 mb-4">{exercise.objective}</p>

        {/* Warning if last session failed */}
        {lastFailed && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-4 mb-4">
            <p className="font-semibold text-yellow-800 text-sm">⚠️ La derniere session etait difficile</p>
            <p className="text-sm text-yellow-700 mt-1">{exercise.ifItFails}</p>
            <p className="text-xs text-yellow-600 mt-2">
              Essaie un environnement plus calme ou reduis la duree.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-5">
          <DogSelector
            value={dogSelection}
            onChange={setDogSelection}
            maxActivation={activation}
          />

          <ActivationBarometer value={activation} onChange={setActivation} />

          {/* Environment selector */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Environnement</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(Context).map((c) => (
                <button
                  key={c}
                  onClick={() => setEnvironment(c)}
                  className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    environment === c ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  {CONTEXT_LABELS[c]}
                </button>
              ))}
            </div>
          </div>

          {isBlocked && !showCalm && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <p className="font-semibold text-orange-800">Activation trop elevee</p>
              <p className="text-sm text-orange-700 mt-1">
                Cet exercice necessite une activation de {exercise.maxActivation} max.
                Ton chien est a {activation} — il n{"'"}est pas en etat d{"'"}apprendre.
              </p>
              <button
                onClick={() => setShowCalm(true)}
                className="mt-3 w-full p-3 bg-orange-100 text-orange-800 rounded-xl font-semibold active:bg-orange-200"
              >
                Voir la routine de retour au calme
              </button>
            </div>
          )}

          {showCalm && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <p className="font-semibold text-green-800 mb-3">Routine de retour au calme</p>
              <ol className="list-decimal list-inside text-sm text-green-700 space-y-2">
                <li><strong>Eloigne les stimuli</strong> — ferme la porte, la fenetre, eteins la TV</li>
                <li><strong>Baisse TON energie</strong> — parle doucement, bouge lentement</li>
                <li><strong>Propose un exutoire calme</strong> — tapis de lechage, kong fourre, os a macher</li>
                <li><strong>Ignore le chien</strong> — ne le touche pas, ne lui parle pas pendant 5 min</li>
                <li><strong>Attends les signaux de calme</strong> — baillement, soupir, couche volontaire</li>
                <li><strong>Recompense le calme</strong> — pose doucement une gaterie devant lui</li>
              </ol>
              <div className="mt-3 bg-green-100 rounded-xl p-3 text-xs text-green-800">
                Le reniflage, le lechage et la mastication liberent des endorphines qui calment naturellement le chien. Un tapis de lechage avec du beurre d{"'"}arachide est super efficace.
              </div>
              <button
                onClick={() => { setShowCalm(false); setActivation(2); }}
                className="mt-3 w-full p-3 bg-green-200 text-green-800 rounded-xl font-semibold"
              >
                C{"'"}est mieux, reevaluer
              </button>
            </div>
          )}

          {!isBlocked && (
            <button
              onClick={() => { setPhase('steps'); setSessionStartTime(Date.now()); }}
              className="w-full p-4 bg-blue-600 text-white rounded-xl text-lg font-semibold active:bg-blue-700 transition-colors"
            >
              Commencer la session
            </button>
          )}
        </div>
      </div>
    );
  }

  // ---- STEPS PHASE ----
  if (phase === 'steps') {
    const step = exercise.steps[currentStep];
    const isLast = currentStep === exercise.steps.length - 1;

    return (
      <div className="py-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            Etape {currentStep + 1} / {exercise.steps.length}
          </span>
          <span className="text-sm text-gray-400">{exercise.name}</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / exercise.steps.length) * 100}%` }}
          />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
          <p className="text-lg font-semibold leading-relaxed">{step.instruction}</p>
          {step.tip && (
            <div className="mt-4 bg-blue-50 rounded-xl p-3 text-sm text-blue-700">
              {step.tip}
            </div>
          )}
        </div>

        {step.durationSeconds > 10 && (
          <div className="mb-6">
            <Timer
              key={currentStep}
              durationSeconds={step.durationSeconds}
              onComplete={handleTimerComplete}
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              if (isLast) {
                setPhase('result');
              } else {
                setCurrentStep((s) => s + 1);
              }
            }}
            className="w-full p-4 bg-blue-600 text-white rounded-xl text-lg font-semibold active:bg-blue-700"
          >
            {isLast ? 'Terminer' : 'Etape suivante'}
          </button>

          <button
            onClick={() => setPhase('result')}
            className="w-full p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium"
          >
            Arreter — le chien est stresse
          </button>

          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              className="w-full p-3 text-gray-500 text-sm"
            >
              Etape precedente
            </button>
          )}
        </div>
      </div>
    );
  }

  // ---- RESULT PHASE ----
  return (
    <div className="py-4">
      <div className="text-center mb-6">
        <span className="text-5xl">&#127881;</span>
        <h1 className="text-xl font-bold mt-3">Session terminee !</h1>
        <p className="text-gray-500 text-sm mt-1">{exercise.name}</p>
        {sessionStartTime > 0 && (
          <p className="text-gray-400 text-xs mt-1">
            Duree : {formatDuration(Math.floor((Date.now() - sessionStartTime) / 1000))}
          </p>
        )}
      </div>

      <div className="mb-4">
        <ActivationBarometer
          value={activationAfter}
          onChange={setActivationAfter}
          label="Activation du chien APRES la session"
        />
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
        <p className="font-semibold mb-1">Critere de reussite :</p>
        <p className="text-sm text-gray-600">{exercise.successCriteria}</p>
      </div>

      <p className="font-semibold text-center mb-3">Comment ca s{"'"}est passe ?</p>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => saveResult(SessionResult.REUSSI)}
          className="w-full p-4 bg-green-500 text-white rounded-xl text-lg font-semibold active:bg-green-600"
        >
          Reussi — Le chien a compris
        </button>
        <button
          onClick={() => saveResult(SessionResult.TROP_DIFFICILE)}
          className="w-full p-4 bg-yellow-500 text-white rounded-xl text-lg font-semibold active:bg-yellow-600"
        >
          Trop difficile — A simplifier
        </button>
        <button
          onClick={() => saveResult(SessionResult.STRESS)}
          className="w-full p-4 bg-red-500 text-white rounded-xl text-lg font-semibold active:bg-red-600"
        >
          Stress / Trop de stimuli
        </button>
      </div>

      <div className="mt-6 bg-yellow-50 rounded-2xl p-4">
        <p className="font-semibold text-yellow-800 text-sm">Si ca n{"'"}a pas marche :</p>
        <p className="text-sm text-yellow-700 mt-1">{exercise.ifItFails}</p>
      </div>

      <div className="mt-3 bg-gray-50 rounded-2xl p-4">
        <p className="font-semibold text-gray-700 text-sm mb-2">Erreurs frequentes :</p>
        <ul className="text-sm text-gray-600 space-y-1">
          {exercise.commonMistakes.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

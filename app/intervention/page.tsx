'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDogs } from '@/lib/hooks';
import { addIncident } from '@/lib/db/database';
import { QUICK_INTERVENTIONS, Trigger, Context, Outcome } from '@/lib/types';
import { todayStr, nowISO } from '@/lib/utils';

const SCENARIO_TO_TRIGGER: Record<string, Trigger> = {
  depart: Trigger.VISITEUR,
  bruit: Trigger.BRUIT,
  tele: Trigger.TELEVISION,
  marche: Trigger.CHIEN,
  chien: Trigger.CHIEN,
};

const SCENARIO_TO_CONTEXT: Record<string, Context> = {
  depart: Context.MAISON,
  bruit: Context.MAISON,
  tele: Context.MAISON,
  marche: Context.RUE_CALME,
  chien: Context.RUE_CALME,
};

export default function InterventionPage() {
  const router = useRouter();
  const dogs = useDogs();
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  const scenario = QUICK_INTERVENTIONS.find((s) => s.id === activeScenario);

  // Log rapide après l'intervention
  async function handleQuickLog(outcome: Outcome) {
    if (!scenario) return;
    const triggerDog = dogs.find((d) => d.isTriggerDog) ?? dogs[0];
    if (triggerDog) {
      await addIncident({
        dogId: triggerDog.id!,
        context: SCENARIO_TO_CONTEXT[scenario.id] || Context.MAISON,
        trigger: SCENARIO_TO_TRIGGER[scenario.id] || Trigger.AUTRE,
        intensity: outcome === Outcome.MIEUX ? 2 : outcome === Outcome.PAREIL ? 3 : 4,
        actionTaken: scenario.label,
        outcome,
        date: todayStr(),
        createdAt: nowISO(),
      });
    }
    setDone(true);
    setTimeout(() => {
      setActiveScenario(null);
      setCurrentStep(0);
      setDone(false);
    }, 1500);
  }

  // ---- ÉCRAN SUCCÈS ----
  if (done) {
    return (
      <div className="py-16 text-center">
        <span className="text-6xl">✅</span>
        <p className="text-xl font-bold mt-4">Bravo, noté !</p>
        <p className="text-sm text-gray-500 mt-1">Chaque intervention compte.</p>
      </div>
    );
  }

  // ---- ÉCRAN ÉTAPES DU SCÉNARIO ----
  if (scenario) {
    const step = scenario.steps[currentStep];
    const isLast = currentStep === scenario.steps.length - 1;

    return (
      <div className="py-6">
        <button
          onClick={() => { setActiveScenario(null); setCurrentStep(0); }}
          className="text-blue-600 text-sm mb-3 p-2 -ml-2"
        >
          ← Retour
        </button>

        <div className="text-center mb-6">
          <span className="text-4xl">{scenario.emoji}</span>
          <h1 className="text-xl font-bold mt-2">{scenario.label}</h1>
          <div className="flex items-center justify-center gap-1 mt-2">
            {scenario.steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full transition-colors ${
                  i <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Instruction principale - très visible */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 text-center mb-6">
          <span className="text-5xl block mb-4">{step.emoji}</span>
          <p className="text-xl font-bold">{step.instruction}</p>
        </div>

        {!isLast ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="w-full p-4 bg-blue-600 text-white rounded-xl text-lg font-semibold active:bg-blue-700 transition-colors"
          >
            Suivant
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-500 text-center mb-1">Comment ça s&apos;est passé ?</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleQuickLog(Outcome.MIEUX)}
                className="p-4 bg-green-50 border-2 border-green-300 rounded-xl text-center active:bg-green-100 transition-colors"
              >
                <span className="text-2xl">👍</span>
                <div className="text-sm font-semibold text-green-700 mt-1">Mieux</div>
              </button>
              <button
                onClick={() => handleQuickLog(Outcome.PAREIL)}
                className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl text-center active:bg-yellow-100 transition-colors"
              >
                <span className="text-2xl">😐</span>
                <div className="text-sm font-semibold text-yellow-700 mt-1">Pareil</div>
              </button>
              <button
                onClick={() => handleQuickLog(Outcome.PIRE)}
                className="p-4 bg-red-50 border-2 border-red-300 rounded-xl text-center active:bg-red-100 transition-colors"
              >
                <span className="text-2xl">👎</span>
                <div className="text-sm font-semibold text-red-700 mt-1">Pire</div>
              </button>
            </div>
            <button
              onClick={() => { setActiveScenario(null); setCurrentStep(0); }}
              className="text-sm text-gray-400 mt-2"
            >
              Ne pas noter
            </button>
          </div>
        )}
      </div>
    );
  }

  // ---- ÉCRAN PRINCIPAL : GROS BOUTONS ----
  return (
    <div className="py-4">
      <button onClick={() => router.back()} className="text-blue-600 text-sm mb-3 p-2 -ml-2">
        ← Retour
      </button>

      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">Que se passe-t-il ?</h1>
        <p className="text-sm text-gray-500 mt-1">Appuie sur la situation. On te guide.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {QUICK_INTERVENTIONS.map((scenario, i) => (
          <button
            key={scenario.id}
            onClick={() => setActiveScenario(scenario.id)}
            className={`${scenario.color} rounded-2xl p-5 text-center text-white active:opacity-80 transition-all ${
              i === QUICK_INTERVENTIONS.length - 1 && QUICK_INTERVENTIONS.length % 2 !== 0
                ? 'col-span-2'
                : ''
            }`}
          >
            <span className="text-3xl block mb-1">{scenario.emoji}</span>
            <span className="text-base font-bold">{scenario.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

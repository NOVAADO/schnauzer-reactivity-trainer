'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useHasOnboarded, useDogs, useTodaySessions, useTodayIncidents, useTodayCare } from '@/lib/hooks';
import { EXERCISES } from '@/lib/seed/exercises';
import { CARE_TASKS } from '@/lib/seed/care';
import { ENRICHMENT_ACTIVITIES } from '@/lib/seed/enrichment';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const hasOnboarded = useHasOnboarded();
  const dogs = useDogs();
  const todaySessions = useTodaySessions();
  const todayIncidents = useTodayIncidents();
  const todayCare = useTodayCare();

  useEffect(() => {
    if (hasOnboarded === false) {
      router.push('/onboarding');
    }
  }, [hasOnboarded, router]);

  if (!hasOnboarded) return null;

  const triggerDog = dogs.find((d) => d.isTriggerDog);
  const todaySessionCount = todaySessions.length;
  const todayIncidentCount = todayIncidents.length;
  const todayCareCount = todayCare.length;

  const doneExerciseIds = new Set(todaySessions.map((s) => s.exerciseId));
  const suggestedExercise = EXERCISES.find((e) => !doneExerciseIds.has(e.id));

  const doneCareIds = new Set(todayCare.map((c) => c.careTaskId));
  const suggestedCare = CARE_TASKS.find((t) => !doneCareIds.has(t.id));

  // Pick a random enrichment suggestion (different each day)
  const dayIndex = new Date().getDate() % ENRICHMENT_ACTIVITIES.length;
  const suggestedEnrichment = ENRICHMENT_ACTIVITIES[dayIndex];

  return (
    <div className="py-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Bonjour ! 🐾</h1>
        <p className="text-gray-500 text-sm mt-1">
          {new Date().toLocaleDateString('fr-CA', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-blue-50 rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-blue-700">{todaySessionCount}</div>
          <div className="text-xs text-blue-600">Sessions</div>
        </div>
        <div className="bg-orange-50 rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-orange-700">{todayIncidentCount}</div>
          <div className="text-xs text-orange-600">Incidents</div>
        </div>
        <div className="bg-green-50 rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-green-700">{todayCareCount}</div>
          <div className="text-xs text-green-600">Soins</div>
        </div>
      </div>

      {triggerDog && todaySessionCount === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="font-semibold text-yellow-800">Commence par {triggerDog.name}</p>
              <p className="text-sm text-yellow-700 mt-1">
                Entraîne le chien déclencheur seul d'abord. C'est plus efficace.
              </p>
            </div>
          </div>
        </div>
      )}

      {suggestedExercise && (
        <Link href={`/education/${suggestedExercise.id}`}>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-3 active:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-blue-600 font-semibold uppercase">Prochaine session</div>
                <div className="font-bold mt-1">{suggestedExercise.name}</div>
                <div className="text-sm text-gray-500 mt-0.5">
                  {suggestedExercise.durationMinutes} min
                </div>
              </div>
              <div className="text-3xl">▶️</div>
            </div>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        <Link href="/reactivity/incident">
          <div className="bg-red-50 rounded-2xl p-4 text-center active:bg-red-100 transition-colors h-full">
            <span className="text-2xl">📝</span>
            <div className="text-sm font-semibold text-red-700 mt-1">Noter un incident</div>
            <div className="text-xs text-red-500 mt-0.5">10 secondes</div>
          </div>
        </Link>
        {suggestedCare && (
          <Link href={`/care/${suggestedCare.id}`}>
            <div className="bg-green-50 rounded-2xl p-4 text-center active:bg-green-100 transition-colors h-full">
              <span className="text-2xl">🩺</span>
              <div className="text-sm font-semibold text-green-700 mt-1">{suggestedCare.name}</div>
              <div className="text-xs text-green-500 mt-0.5">Soin du jour</div>
            </div>
          </Link>
        )}
      </div>

      {/* Enrichment suggestion */}
      {suggestedEnrichment && (
        <Link href={`/enrichment/${suggestedEnrichment.id}`}>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 mb-4 active:from-purple-100 active:to-pink-100 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-purple-600 font-semibold uppercase">Enrichissement du jour</div>
                <div className="font-bold mt-1">{suggestedEnrichment.name}</div>
                <div className="text-sm text-gray-500 mt-0.5">
                  {suggestedEnrichment.durationMinutes} min · {'⭐'.repeat(suggestedEnrichment.difficulty)}
                </div>
              </div>
              <div className="text-3xl">🎪</div>
            </div>
          </div>
        </Link>
      )}

      <div className="mb-4">
        <h2 className="font-semibold text-gray-700 mb-2">Vos chiens</h2>
        <div className="flex flex-col gap-2">
          {dogs.map((dog) => (
            <div key={dog.id} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3">
              <span className="text-3xl">{dog.isTriggerDog ? '⚡' : '🐾'}</span>
              <div className="flex-1">
                <div className="font-bold">{dog.name}</div>
                <div className="text-xs text-gray-500">
                  {dog.age ? `${dog.age} mois` : ''} {dog.weight ? `· ${dog.weight} kg` : ''}
                  {dog.isTriggerDog ? ' · Déclencheur' : ''}
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {todaySessions.filter((s) => s.dogId === dog.id).length} sessions
              </div>
            </div>
          ))}
        </div>
      </div>

      {todaySessionCount < 3 && (
        <div className="bg-blue-50 rounded-2xl p-4 text-center">
          <p className="text-sm text-blue-700">
            <strong>Rappel :</strong> 3 micro-séances de 5–7 min par jour. Il en reste{' '}
            <strong>{3 - todaySessionCount}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

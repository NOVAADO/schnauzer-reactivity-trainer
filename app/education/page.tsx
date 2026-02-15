'use client';

import Link from 'next/link';
import { EXERCISES } from '@/lib/seed/exercises';
import { useDogs } from '@/lib/hooks';
import { ExerciseCategory, ACTIVATION_EMOJIS, CONTEXT_LABELS, EnvironmentLevel } from '@/lib/types';

const CATEGORY_INFO: Record<ExerciseCategory, { label: string; icon: string }> = {
  [ExerciseCategory.REGARD]: { label: 'Regard', icon: '👀' },
  [ExerciseCategory.ASSIS]: { label: 'Assis', icon: '🐕' },
  [ExerciseCategory.COUCHE]: { label: 'Couché', icon: '😴' },
  [ExerciseCategory.RESTE]: { label: 'Reste', icon: '✋' },
  [ExerciseCategory.PLACE]: { label: 'Place / Tapis', icon: '🏠' },
  [ExerciseCategory.MARCHE]: { label: 'Marche', icon: '🚶' },
};

const ENV_LABELS: Record<number, string> = {
  [EnvironmentLevel.MAISON]: '🏠 Maison',
  [EnvironmentLevel.COUR]: '🌿 Cour',
  [EnvironmentLevel.RUE_CALME]: '🛤️ Rue calme',
  [EnvironmentLevel.RUE_STIMULANTE]: '🏙️ Rue animée',
};

export default function EducationPage() {
  const dogs = useDogs();
  const masteredSkills = new Set(dogs.flatMap((d) => d.masteredSkills || []));
  const categories = Object.values(ExerciseCategory);

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold mb-1">Apprendre</h1>
      <p className="text-sm text-gray-500 mb-4">Exercices de base et enrichissement</p>

      {/* Sub-navigation tabs */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 bg-blue-600 text-white rounded-xl p-3 text-center text-sm font-semibold">
          Education de base
        </div>
        <Link href="/enrichment" className="flex-1">
          <div className="bg-purple-50 border-2 border-purple-200 text-purple-700 rounded-xl p-3 text-center text-sm font-semibold active:bg-purple-100 transition-colors">
            Enrichissement
          </div>
        </Link>
      </div>

      {categories.map((cat) => {
        const exercises = EXERCISES.filter((e) => e.category === cat);
        if (exercises.length === 0) return null;
        const info = CATEGORY_INFO[cat];

        return (
          <div key={cat} className="mb-6">
            <h2 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span>{info.icon}</span> {info.label}
            </h2>
            <div className="flex flex-col gap-2">
              {exercises.map((ex) => {
                const isMastered = masteredSkills.has(ex.id);
                return (
                  <Link key={ex.id} href={`/education/${ex.id}`}>
                    <div className={`bg-white rounded-2xl p-4 border active:bg-gray-50 transition-colors ${isMastered ? 'border-green-200' : 'border-gray-100'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{ex.name}</span>
                            {isMastered && <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Acquis ✓</span>}
                          </div>
                          <div className="text-sm text-gray-500 mt-0.5 flex items-center gap-2">
                            <span>{ex.durationMinutes} min</span>
                            <span>·</span>
                            <span>{ENV_LABELS[ex.environmentLevel]}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-lg">{ACTIVATION_EMOJIS[ex.maxActivation]}</span>
                          <span className="text-xs text-gray-400">max {ex.maxActivation}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ENRICHMENT_ACTIVITIES } from '@/lib/seed/enrichment';
import { EXERCISES } from '@/lib/seed/exercises';
import { useDogs } from '@/lib/hooks';
import { EnrichmentCategory } from '@/lib/types';

const CATEGORY_INFO: Record<EnrichmentCategory, { label: string; icon: string; color: string; description: string }> = {
  [EnrichmentCategory.TRICK]: {
    label: 'Tricks',
    icon: '🎪',
    color: 'purple',
    description: 'Apprentissages fun et utiles',
  },
  [EnrichmentCategory.MENTAL]: {
    label: 'Stimulation mentale',
    icon: '🧠',
    color: 'blue',
    description: 'Fatiguer le cerveau sans effort physique',
  },
  [EnrichmentCategory.OLFACTIF]: {
    label: 'Travail olfactif',
    icon: '👃',
    color: 'amber',
    description: 'Utiliser le super-nez du schnauzer',
  },
  [EnrichmentCategory.CONFIANCE]: {
    label: 'Confiance',
    icon: '💪',
    color: 'teal',
    description: 'Renforcer la bravoure et la proprioception',
  },
  [EnrichmentCategory.FUN]: {
    label: 'Jeux',
    icon: '🎉',
    color: 'pink',
    description: 'S\'amuser ensemble et renforcer le lien',
  },
};

const DIFFICULTY_STARS: Record<number, string> = {
  1: '⭐',
  2: '⭐⭐',
  3: '⭐⭐⭐',
};

const DIFFICULTY_LABELS: Record<number, string> = {
  1: 'Débutant',
  2: 'Intermédiaire',
  3: 'Avancé',
};

function isPrerequisiteMet(prerequisite: string | undefined, completedExerciseIds: Set<string>): boolean {
  if (!prerequisite) return true;
  // Check if the prerequisite exercise has been done at least once
  return completedExerciseIds.has(prerequisite);
}

function getPrerequisiteName(prerequisiteId: string): string {
  const exercise = EXERCISES.find((e) => e.id === prerequisiteId);
  if (exercise) return exercise.name;
  const enrichment = ENRICHMENT_ACTIVITIES.find((a) => a.id === prerequisiteId);
  if (enrichment) return enrichment.name;
  return prerequisiteId;
}

export default function EnrichmentPage() {
  const dogs = useDogs();
  // Combine mastered skills from all dogs
  const masteredSkills = new Set(dogs.flatMap((d) => d.masteredSkills || []));

  const categories = Object.values(EnrichmentCategory);

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold mb-1">Apprendre</h1>
      <p className="text-sm text-gray-500 mb-4">Exercices de base et enrichissement</p>

      {/* Sub-navigation tabs */}
      <div className="flex gap-2 mb-4">
        <Link href="/education" className="flex-1">
          <div className="bg-blue-50 border-2 border-blue-200 text-blue-700 rounded-xl p-3 text-center text-sm font-semibold active:bg-blue-100 transition-colors">
            Education de base
          </div>
        </Link>
        <div className="flex-1 bg-purple-600 text-white rounded-xl p-3 text-center text-sm font-semibold">
          Enrichissement
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-2">Tricks, jeux et stimulation mentale</p>

      {/* Intro card */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-4 mb-6">
        <p className="text-sm text-purple-800">
          <strong>Au-delà de l{"'"}obeissance !</strong> Ces activités renforcent la confiance,
          fatiguent le cerveau et rendent ton chien plus heureux. 15 min de stimulation mentale
          = 1 heure de promenade en dépense.
        </p>
      </div>

      {categories.map((cat) => {
        const activities = ENRICHMENT_ACTIVITIES.filter((a) => a.category === cat);
        if (activities.length === 0) return null;
        const info = CATEGORY_INFO[cat];

        return (
          <div key={cat} className="mb-6">
            <h2 className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
              <span className="text-xl">{info.icon}</span> {info.label}
            </h2>
            <p className="text-xs text-gray-400 mb-3 ml-8">{info.description}</p>

            <div className="flex flex-col gap-2">
              {activities.map((activity) => {
                const unlocked = isPrerequisiteMet(activity.prerequisite, masteredSkills);

                return (
                  <Link key={activity.id} href={`/enrichment/${activity.id}`}>
                    <div
                      className={`bg-white rounded-2xl p-4 border transition-colors ${
                        unlocked
                          ? 'border-gray-100 active:bg-gray-50'
                          : 'border-gray-100 opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{activity.name}</span>
                            {!unlocked && <span className="text-xs">🔒</span>}
                          </div>
                          <div className="text-sm text-gray-500 mt-0.5 flex items-center gap-2">
                            <span>{activity.durationMinutes} min</span>
                            <span>·</span>
                            <span>{DIFFICULTY_STARS[activity.difficulty]}</span>
                            <span className="text-xs">{DIFFICULTY_LABELS[activity.difficulty]}</span>
                          </div>
                          {!unlocked && activity.prerequisite && (
                            <div className="text-xs text-amber-600 mt-1">
                              Prérequis : {getPrerequisiteName(activity.prerequisite)}
                            </div>
                          )}
                        </div>
                        <div className="text-gray-300 text-lg">›</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Tips section */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mt-2">
        <h3 className="font-bold text-green-800 mb-2">Conseils pour l{"'"}enrichissement</h3>
        <ul className="text-sm text-green-700 space-y-1.5">
          <li>Commence par les activités ⭐ (débutant)</li>
          <li>Sessions courtes : 3-5 minutes max pour les tricks</li>
          <li>Termine TOUJOURS sur un succes (meme petit)</li>
          <li>Varie les activités pour garder la motivation</li>
          <li>Le reniflage et le lechage calment naturellement le chien</li>
          <li>Un chien fatigue mentalement est un chien calme !</li>
        </ul>
      </div>
    </div>
  );
}

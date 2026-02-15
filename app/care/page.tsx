'use client';

import Link from 'next/link';
import { CARE_TASKS } from '@/lib/seed/care';
import { CareType } from '@/lib/types';

const CARE_ICONS: Record<CareType, string> = {
  [CareType.DENTS]: '🦷',
  [CareType.ONGLES]: '✂️',
  [CareType.OREILLES]: '👂',
  [CareType.YEUX]: '👁️',
  [CareType.TOILETTAGE]: '🪮',
};

export default function CarePage() {
  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold mb-1">Soins</h1>
      <p className="text-sm text-gray-500 mb-6">
        Programmes progressifs — 10 secondes positives valent mieux que 30 de lutte
      </p>

      <div className="flex flex-col gap-3">
        {CARE_TASKS.map((task) => (
          <Link key={task.id} href={`/care/${task.id}`}>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 active:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{CARE_ICONS[task.type]}</span>
                <div className="flex-1">
                  <div className="font-semibold">{task.name}</div>
                  <div className="text-sm text-gray-500 mt-0.5">
                    Programme {task.totalDays} jours · {task.frequencyPerWeek}x/semaine
                  </div>
                </div>
                <span className="text-gray-300 text-xl">›</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 bg-green-50 rounded-2xl p-4">
        <p className="font-semibold text-green-800 text-sm mb-2">Règle d'or</p>
        <p className="text-sm text-green-700">
          Arrête TOUJOURS sur une note positive. Si le chien montre du stress, reviens à l'étape
          précédente. Chaque soin doit être associé à du plaisir (gâteries, voix douce).
        </p>
      </div>
    </div>
  );
}

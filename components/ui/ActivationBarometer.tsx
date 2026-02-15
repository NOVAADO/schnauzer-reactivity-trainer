'use client';

import { ACTIVATION_LABELS, ACTIVATION_COLORS, ACTIVATION_EMOJIS } from '@/lib/types';

interface ActivationBarometerProps {
  value: number;
  onChange: (val: number) => void;
  label?: string;
}

export default function ActivationBarometer({
  value,
  onChange,
  label = "Niveau d'activation",
}: ActivationBarometerProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2 justify-between">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => onChange(level)}
            className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
              value === level
                ? 'border-current shadow-md scale-105'
                : 'border-gray-200 opacity-60'
            }`}
            style={{ color: ACTIVATION_COLORS[level], borderColor: value === level ? ACTIVATION_COLORS[level] : undefined }}
          >
            <span className="text-2xl">{ACTIVATION_EMOJIS[level]}</span>
            <span className="text-xs font-medium">{ACTIVATION_LABELS[level]}</span>
          </button>
        ))}
      </div>
      {value > 3 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm text-orange-800">
          <strong>Activation élevée !</strong> On recommande une routine de retour au calme avant
          tout exercice. Les exercices complexes seront bloqués.
        </div>
      )}
    </div>
  );
}

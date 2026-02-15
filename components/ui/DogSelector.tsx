'use client';

import { useDogs } from '@/lib/hooks';
import { DogMode } from '@/lib/types';

interface DogSelectorProps {
  value: { dogId: number; mode: DogMode };
  onChange: (val: { dogId: number; mode: DogMode }) => void;
  maxActivation?: number;
}

export default function DogSelector({ value, onChange, maxActivation }: DogSelectorProps) {
  const dogs = useDogs();
  const duoBlocked = maxActivation !== undefined && maxActivation > 3;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Qui entraîne-t-on ?</label>
      <div className="grid grid-cols-2 gap-2">
        {dogs.map((dog) => {
          const mode = dog.isTriggerDog ? DogMode.SOLO_THOR : DogMode.SOLO_AUTRE;
          const isSelected = value.dogId === dog.id && value.mode !== DogMode.DUO;
          return (
            <button
              key={dog.id}
              onClick={() => onChange({ dogId: dog.id!, mode })}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 font-semibold'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <span className="text-lg">{dog.isTriggerDog ? '⚡' : '🐾'}</span>
              <div className="text-sm mt-1">{dog.name} seul</div>
            </button>
          );
        })}
      </div>
      {dogs.length >= 2 && (
        <button
          onClick={() => {
            if (!duoBlocked) {
              onChange({ dogId: dogs[0].id!, mode: DogMode.DUO });
            }
          }}
          disabled={duoBlocked}
          className={`p-3 rounded-xl border-2 text-center transition-all ${
            value.mode === DogMode.DUO
              ? 'border-purple-500 bg-purple-50 font-semibold'
              : duoBlocked
              ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
              : 'border-gray-200 bg-white'
          }`}
        >
          <span className="text-lg">👥</span>
          <div className="text-sm mt-1">
            En duo
            {duoBlocked && (
              <span className="block text-xs text-orange-500 mt-1">
                Activation trop haute pour le duo
              </span>
            )}
          </div>
        </button>
      )}
    </div>
  );
}

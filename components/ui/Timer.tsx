'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface TimerProps {
  durationSeconds: number;
  onComplete: () => void;
  autoStart?: boolean;
}

export default function Timer({ durationSeconds, onComplete, autoStart = false }: TimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stop = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            stop();
            onComplete();
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, remaining, onComplete, stop]);

  const progress = ((durationSeconds - remaining) / durationSeconds) * 100;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Progress ring */}
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-800">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold active:bg-blue-700 transition-colors"
          >
            {remaining === durationSeconds ? 'Démarrer' : 'Reprendre'}
          </button>
        ) : (
          <button
            onClick={stop}
            className="px-8 py-3 bg-gray-200 text-gray-800 rounded-xl text-lg font-semibold active:bg-gray-300 transition-colors"
          >
            Pause
          </button>
        )}
        {remaining < durationSeconds && remaining > 0 && (
          <button
            onClick={() => {
              stop();
              setRemaining(durationSeconds);
            }}
            className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl text-lg active:bg-gray-200 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

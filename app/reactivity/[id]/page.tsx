'use client';

import { useRouter, useParams } from 'next/navigation';
import { getProtocolById } from '@/lib/seed/protocols';

export default function ProtocolDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const protocol = getProtocolById(id);

  if (!protocol) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">Protocole introuvable</p>
        <button onClick={() => router.back()} className="mt-4 text-blue-600 font-semibold">
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="py-4">
      <button onClick={() => router.back()} className="text-blue-600 text-sm mb-4">
        ← Retour
      </button>

      <h1 className="text-xl font-bold mb-2">{protocol.name}</h1>
      <p className="text-sm text-gray-500 mb-6">{protocol.description}</p>

      {/* Steps */}
      <div className="flex flex-col gap-3 mb-6">
        {protocol.steps.map((step, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium leading-relaxed">{step.instruction}</p>
                {step.tip && (
                  <p className="text-xs text-blue-600 mt-2 bg-blue-50 rounded-lg p-2">
                    💡 {step.tip}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* If reaction */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
        <p className="font-semibold text-red-800 text-sm mb-1">Si le chien réagit :</p>
        <p className="text-sm text-red-700">{protocol.ifReaction}</p>
      </div>

      {/* Success criteria */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
        <p className="font-semibold text-green-800 text-sm mb-1">Critère de réussite :</p>
        <p className="text-sm text-green-700">{protocol.successCriteria}</p>
      </div>
    </div>
  );
}

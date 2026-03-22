'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  useHasOnboarded,
  useDogs,
  useTodaySessions,
  useTodayIncidents,
  useOnboardingProfile,
  useWeekIncidents,
  useWeekSessions,
} from '@/lib/hooks';
import { Outcome } from '@/lib/types';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const hasOnboarded = useHasOnboarded();
  const dogs = useDogs();
  const todaySessions = useTodaySessions();
  const todayIncidents = useTodayIncidents();
  const profile = useOnboardingProfile();
  const weekIncidents = useWeekIncidents();
  const weekSessions = useWeekSessions();

  useEffect(() => {
    if (hasOnboarded === false) {
      router.push('/onboarding');
    }
  }, [hasOnboarded, router]);

  if (!hasOnboarded) return null;

  const triggerDog = dogs.find((d) => d.isTriggerDog) ?? dogs[0];
  const todaySessionCount = todaySessions.length;
  const todayIncidentCount = todayIncidents.length;

  // ---- MICRO-VICTOIRES ----
  const victories = computeVictories();

  function computeVictories(): { emoji: string; text: string }[] {
    const v: { emoji: string; text: string }[] = [];

    // Victoire: incidents "mieux" aujourd'hui
    const mieuxToday = todayIncidents.filter((i) => i.outcome === Outcome.MIEUX).length;
    if (mieuxToday > 0) {
      v.push({
        emoji: '🌟',
        text: `${mieuxToday} intervention${mieuxToday > 1 ? 's' : ''} avec amélioration aujourd\u2019hui`,
      });
    }

    // Victoire: sessions faites aujourd'hui
    if (todaySessionCount > 0) {
      v.push({
        emoji: '✅',
        text: `${todaySessionCount} exercice${todaySessionCount > 1 ? 's' : ''} fait${todaySessionCount > 1 ? 's' : ''} aujourd\u2019hui`,
      });
    }

    // Victoire: constance sur la semaine
    const daysWithActivity = new Set([
      ...weekSessions.map((s) => s.date),
      ...weekIncidents.map((i) => i.date),
    ]).size;
    if (daysWithActivity >= 3) {
      v.push({
        emoji: '🔥',
        text: `${daysWithActivity} jours actifs cette semaine. Continue !`,
      });
    }

    // Victoire: amélioration de l'intensité cette semaine
    if (weekIncidents.length >= 3) {
      const halfIndex = Math.floor(weekIncidents.length / 2);
      const oldAvg = weekIncidents.slice(halfIndex).reduce((s, i) => s + i.intensity, 0) / (weekIncidents.length - halfIndex);
      const newAvg = weekIncidents.slice(0, halfIndex).reduce((s, i) => s + i.intensity, 0) / halfIndex;
      if (newAvg < oldAvg - 0.3) {
        v.push({
          emoji: '📉',
          text: `L\u2019intensité des réactions diminue. Ça progresse !`,
        });
      }
    }

    // Victoire: moins d'incidents que la première moitié de semaine
    const weekMieux = weekIncidents.filter((i) => i.outcome === Outcome.MIEUX).length;
    if (weekMieux >= 2) {
      v.push({
        emoji: '💪',
        text: `${weekMieux} améliorations notées cette semaine`,
      });
    }

    return v.slice(0, 3); // Max 3 victoires affichées
  }

  return (
    <div className="py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Bonjour{triggerDog ? `, équipe ${triggerDog.name}` : ''} !
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {new Date().toLocaleDateString('fr-CA', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>

      {/* BOUTON INTERVENTION RAPIDE — toujours visible en haut */}
      <Link href="/intervention">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-4 mb-4 active:opacity-90 transition-all">
          <div className="flex items-center gap-3 text-white">
            <span className="text-3xl">⚡</span>
            <div>
              <div className="font-bold text-lg">Intervention rapide</div>
              <div className="text-sm opacity-90">Ton chien réagit ? Appuie ici.</div>
            </div>
          </div>
        </div>
      </Link>

      {/* Stats du jour — simplifiées */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-blue-50 rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-blue-700">{todaySessionCount}</div>
          <div className="text-xs text-blue-600">Exercices</div>
        </div>
        <div className="bg-orange-50 rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-orange-700">{todayIncidentCount}</div>
          <div className="text-xs text-orange-600">Interventions</div>
        </div>
      </div>

      {/* MICRO-VICTOIRES */}
      {victories.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4">
          <h2 className="font-bold text-green-800 text-sm mb-2">Tes victoires</h2>
          <div className="flex flex-col gap-2">
            {victories.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-lg">{v.emoji}</span>
                <span className="text-sm text-green-700">{v.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROTOCOLE DU JOUR — issu de l'onboarding */}
      {profile && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
          <h2 className="font-bold text-blue-800 text-sm mb-1">Ton exercice du jour</h2>
          <p className="text-sm text-blue-700">{profile.suggestedProtocol}</p>
          <p className="text-xs text-blue-500 mt-2">{profile.dailyMinutes} min / jour</p>
        </div>
      )}

      {/* Accès rapides */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Link href="/reactivity/incident">
          <div className="bg-white rounded-2xl p-4 border border-gray-200 text-center active:bg-gray-50 transition-colors h-full">
            <span className="text-2xl">📝</span>
            <div className="text-sm font-semibold text-gray-700 mt-1">Journal</div>
            <div className="text-xs text-gray-400">Noter un incident</div>
          </div>
        </Link>
        <Link href="/education">
          <div className="bg-white rounded-2xl p-4 border border-gray-200 text-center active:bg-gray-50 transition-colors h-full">
            <span className="text-2xl">🎓</span>
            <div className="text-sm font-semibold text-gray-700 mt-1">Exercices</div>
            <div className="text-xs text-gray-400">Entraînement du jour</div>
          </div>
        </Link>
      </div>

      {/* Message de constance si pas encore d'activité */}
      {todaySessionCount === 0 && todayIncidentCount === 0 && victories.length === 0 && (
        <div className="bg-gray-50 rounded-2xl p-4 text-center">
          <span className="text-3xl">🌱</span>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            Chaque petite action compte.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Fais un exercice de {profile?.dailyMinutes || 5} min ou utilise l&apos;intervention rapide quand ton chien réagit.
          </p>
        </div>
      )}

      {/* Rappel doux */}
      {todaySessionCount > 0 && todaySessionCount < (profile ? Math.floor(profile.dailyMinutes / 5) : 1) && (
        <div className="bg-blue-50 rounded-2xl p-3 text-center">
          <p className="text-sm text-blue-700">
            Encore {Math.max(1, Math.floor((profile?.dailyMinutes || 5) / 5) - todaySessionCount)} micro-séance{Math.floor((profile?.dailyMinutes || 5) / 5) - todaySessionCount > 1 ? 's' : ''} pour atteindre ton objectif.
            Tu peux le faire !
          </p>
        </div>
      )}
    </div>
  );
}

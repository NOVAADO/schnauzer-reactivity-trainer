'use client';

import { useState, useEffect } from 'react';
import { getWeeklyStats, getDailySummary } from '@/lib/db/database';
import { BarChart, StatCard } from '@/components/ui/SimpleChart';
import { todayStr, formatDate, shortDay } from '@/lib/utils';
import { ACTIVATION_COLORS } from '@/lib/types';

interface WeeklyData {
  days: { date: string; incidents: number; avgIntensity: number; sessions: number }[];
  topInterventions: { action: string; count: number; avgOutcome: number }[];
  totalSessions: number;
  totalIncidents: number;
}

interface TodayData {
  sessionsCount: number;
  incidentsCount: number;
  avgActivation: number;
  careTasksDone: number;
  topInterventions: { action: string; count: number; avgOutcome: number }[];
}

export default function ProgressionPage() {
  const [weekly, setWeekly] = useState<WeeklyData | null>(null);
  const [today, setToday] = useState<TodayData | null>(null);

  useEffect(() => {
    const load = async () => {
      const [w, t] = await Promise.all([
        getWeeklyStats(todayStr()),
        getDailySummary(todayStr()),
      ]);
      setWeekly(w);
      setToday(t);
    };
    load();
  }, []);

  if (!weekly || !today) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold mb-1">Progression</h1>
      <p className="text-sm text-gray-500 mb-6">Tendances sur 7 jours</p>

      {/* Today summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard label="Sessions aujourd'hui" value={today.sessionsCount} icon="🎯" color="bg-blue-50 text-blue-700" />
        <StatCard label="Incidents" value={today.incidentsCount} icon="⚡" color="bg-orange-50 text-orange-700" />
        <StatCard label="Activation moy." value={today.avgActivation || '—'} icon="📊" color="bg-purple-50 text-purple-700" />
        <StatCard label="Soins faits" value={today.careTasksDone} icon="🩺" color="bg-green-50 text-green-700" />
      </div>

      {/* Sessions chart */}
      <div className="mb-4">
        <BarChart
          title="Sessions par jour"
          data={weekly.days.map((d) => ({
            label: shortDay(d.date),
            value: d.sessions,
            color: '#3b82f6',
          }))}
          maxValue={Math.max(...weekly.days.map((d) => d.sessions), 3)}
        />
      </div>

      {/* Incidents chart */}
      <div className="mb-4">
        <BarChart
          title="Incidents par jour"
          data={weekly.days.map((d) => ({
            label: shortDay(d.date),
            value: d.incidents,
            color: d.incidents === 0 ? '#22c55e' : d.incidents <= 2 ? '#eab308' : '#ef4444',
          }))}
          maxValue={Math.max(...weekly.days.map((d) => d.incidents), 5)}
        />
      </div>

      {/* Intensity chart */}
      <div className="mb-4">
        <BarChart
          title="Intensité moyenne des incidents"
          data={weekly.days.map((d) => ({
            label: shortDay(d.date),
            value: d.avgIntensity,
            color:
              d.avgIntensity === 0
                ? '#d1d5db'
                : d.avgIntensity <= 2
                ? '#22c55e'
                : d.avgIntensity <= 3
                ? '#eab308'
                : '#ef4444',
          }))}
          maxValue={5}
        />
      </div>

      {/* Week totals */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Bilan de la semaine</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{weekly.totalSessions}</div>
            <div className="text-xs text-gray-500">Sessions totales</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{weekly.totalIncidents}</div>
            <div className="text-xs text-gray-500">Incidents totaux</div>
          </div>
        </div>
      </div>

      {/* Top interventions */}
      {weekly.topInterventions.length > 0 && (
        <div className="bg-green-50 rounded-2xl p-4 mb-4">
          <h3 className="font-semibold text-green-800 mb-2">Ce qui fonctionne</h3>
          <div className="flex flex-col gap-2">
            {weekly.topInterventions.map((inter, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                  <span className="text-sm font-medium text-green-700">{inter.action}</span>
                </div>
                <div className="text-xs text-green-600">
                  {inter.count}x · {inter.avgOutcome > 0 ? '↗️' : inter.avgOutcome === 0 ? '➡️' : '↘️'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No data message */}
      {weekly.totalSessions === 0 && weekly.totalIncidents === 0 && (
        <div className="bg-gray-50 rounded-2xl p-6 text-center">
          <span className="text-4xl">📈</span>
          <p className="font-semibold text-gray-700 mt-3">Pas encore de données</p>
          <p className="text-sm text-gray-500 mt-1">
            Fais ta première session d'éducation ou note ton premier incident pour voir les
            tendances apparaître ici.
          </p>
        </div>
      )}
    </div>
  );
}

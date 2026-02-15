import Dexie, { type Table } from 'dexie';
import type { Dog, TrainingSession, IncidentLog, CareEntry } from '../types';

class SchnauzDB extends Dexie {
  dogs!: Table<Dog, number>;
  sessions!: Table<TrainingSession, number>;
  incidents!: Table<IncidentLog, number>;
  careEntries!: Table<CareEntry, number>;

  constructor() {
    super('SchnauzTrainerDB');
    this.version(1).stores({
      dogs: '++id, name, isTriggerDog',
      sessions: '++id, dogId, exerciseId, date, result',
      incidents: '++id, dogId, date, context, trigger, intensity',
      careEntries: '++id, dogId, careTaskId, date',
    });
  }
}

export const db = new SchnauzDB();

// ---- DOG CRUD ----

export async function getDogs(): Promise<Dog[]> {
  return db.dogs.toArray();
}

export async function getDog(id: number): Promise<Dog | undefined> {
  return db.dogs.get(id);
}

export async function addDog(dog: Omit<Dog, 'id'>): Promise<number> {
  return db.dogs.add(dog as Dog);
}

export async function updateDog(id: number, data: Partial<Dog>): Promise<number> {
  return db.dogs.update(id, data);
}

export async function deleteDog(id: number): Promise<void> {
  return db.dogs.delete(id);
}

// ---- SESSION CRUD ----

export async function getSessions(dogId?: number): Promise<TrainingSession[]> {
  if (dogId) return db.sessions.where('dogId').equals(dogId).reverse().toArray();
  return db.sessions.reverse().toArray();
}

export async function getSessionsByDate(date: string): Promise<TrainingSession[]> {
  return db.sessions.where('date').equals(date).toArray();
}

export async function getSessionsInRange(from: string, to: string): Promise<TrainingSession[]> {
  return db.sessions.where('date').between(from, to, true, true).toArray();
}

export async function addSession(session: Omit<TrainingSession, 'id'>): Promise<number> {
  return db.sessions.add(session as TrainingSession);
}

// ---- INCIDENT CRUD ----

export async function getIncidents(dogId?: number): Promise<IncidentLog[]> {
  if (dogId) return db.incidents.where('dogId').equals(dogId).reverse().toArray();
  return db.incidents.reverse().toArray();
}

export async function getIncidentsByDate(date: string): Promise<IncidentLog[]> {
  return db.incidents.where('date').equals(date).toArray();
}

export async function getIncidentsInRange(from: string, to: string): Promise<IncidentLog[]> {
  return db.incidents.where('date').between(from, to, true, true).toArray();
}

export async function addIncident(incident: Omit<IncidentLog, 'id'>): Promise<number> {
  return db.incidents.add(incident as IncidentLog);
}

// ---- CARE CRUD ----

export async function getCareEntries(dogId?: number): Promise<CareEntry[]> {
  if (dogId) return db.careEntries.where('dogId').equals(dogId).reverse().toArray();
  return db.careEntries.reverse().toArray();
}

export async function getCareEntriesByDate(date: string): Promise<CareEntry[]> {
  return db.careEntries.where('date').equals(date).toArray();
}

export async function getCareEntriesInRange(from: string, to: string): Promise<CareEntry[]> {
  return db.careEntries.where('date').between(from, to, true, true).toArray();
}

export async function addCareEntry(entry: Omit<CareEntry, 'id'>): Promise<number> {
  return db.careEntries.add(entry as CareEntry);
}

// ---- ANALYTICS ----

export async function getDailySummary(date: string) {
  const [sessions, incidents, careEntries] = await Promise.all([
    getSessionsByDate(date),
    getIncidentsByDate(date),
    getCareEntriesByDate(date),
  ]);

  const avgActivation =
    sessions.length > 0
      ? sessions.reduce((sum, s) => sum + s.activationBefore, 0) / sessions.length
      : 0;

  // Count interventions and their outcomes
  const interventionMap = new Map<string, { count: number; outcomes: number[] }>();
  incidents.forEach((inc) => {
    const existing = interventionMap.get(inc.actionTaken) || { count: 0, outcomes: [] };
    existing.count++;
    existing.outcomes.push(inc.outcome === 'mieux' ? 1 : inc.outcome === 'pareil' ? 0 : -1);
    interventionMap.set(inc.actionTaken, existing);
  });

  const topInterventions = Array.from(interventionMap.entries())
    .map(([action, data]) => ({
      action,
      count: data.count,
      avgOutcome: data.outcomes.reduce((a, b) => a + b, 0) / data.outcomes.length,
    }))
    .sort((a, b) => b.avgOutcome - a.avgOutcome)
    .slice(0, 3);

  return {
    date,
    sessionsCount: sessions.length,
    incidentsCount: incidents.length,
    avgActivation: Math.round(avgActivation * 10) / 10,
    careTasksDone: careEntries.length,
    topInterventions,
  };
}

export async function getWeeklyStats(endDate: string) {
  const end = new Date(endDate);
  const start = new Date(end);
  start.setDate(start.getDate() - 6);

  const startStr = start.toISOString().split('T')[0];
  const endStr = end.toISOString().split('T')[0];

  const [sessions, incidents] = await Promise.all([
    getSessionsInRange(startStr, endStr),
    getIncidentsInRange(startStr, endStr),
  ]);

  // Group by date
  const days: {
    date: string;
    incidents: number;
    avgIntensity: number;
    sessions: number;
  }[] = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const dayIncidents = incidents.filter((i) => i.date === dateStr);
    const daySessions = sessions.filter((s) => s.date === dateStr);

    days.push({
      date: dateStr,
      incidents: dayIncidents.length,
      avgIntensity:
        dayIncidents.length > 0
          ? Math.round(
              (dayIncidents.reduce((sum, i) => sum + i.intensity, 0) / dayIncidents.length) * 10
            ) / 10
          : 0,
      sessions: daySessions.length,
    });
  }

  // Top interventions across the week
  const interventionMap = new Map<string, { count: number; outcomes: number[] }>();
  incidents.forEach((inc) => {
    const existing = interventionMap.get(inc.actionTaken) || { count: 0, outcomes: [] };
    existing.count++;
    existing.outcomes.push(inc.outcome === 'mieux' ? 1 : inc.outcome === 'pareil' ? 0 : -1);
    interventionMap.set(inc.actionTaken, existing);
  });

  const topInterventions = Array.from(interventionMap.entries())
    .map(([action, data]) => ({
      action,
      count: data.count,
      avgOutcome: data.outcomes.reduce((a, b) => a + b, 0) / data.outcomes.length,
    }))
    .sort((a, b) => b.avgOutcome - a.avgOutcome)
    .slice(0, 3);

  return { days, topInterventions, totalSessions: sessions.length, totalIncidents: incidents.length };
}

// Check if onboarding is done
export async function hasCompletedOnboarding(): Promise<boolean> {
  const count = await db.dogs.count();
  return count >= 1;
}

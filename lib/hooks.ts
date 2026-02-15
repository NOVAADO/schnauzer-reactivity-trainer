import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db/database';

export function useDogs() {
  return useLiveQuery(() => db.dogs.toArray(), []) ?? [];
}

export function useDog(id: number | undefined) {
  return useLiveQuery(() => (id ? db.dogs.get(id) : undefined), [id]);
}

export function useSessions(dogId?: number) {
  return (
    useLiveQuery(
      () =>
        dogId
          ? db.sessions.where('dogId').equals(dogId).reverse().toArray()
          : db.sessions.reverse().toArray(),
      [dogId]
    ) ?? []
  );
}

export function useTodaySessions() {
  const today = new Date().toISOString().split('T')[0];
  return useLiveQuery(() => db.sessions.where('date').equals(today).toArray(), []) ?? [];
}

export function useTodayIncidents() {
  const today = new Date().toISOString().split('T')[0];
  return useLiveQuery(() => db.incidents.where('date').equals(today).toArray(), []) ?? [];
}

export function useTodayCare() {
  const today = new Date().toISOString().split('T')[0];
  return useLiveQuery(() => db.careEntries.where('date').equals(today).toArray(), []) ?? [];
}

export function useHasOnboarded() {
  return useLiveQuery(async () => {
    const count = await db.dogs.count();
    return count >= 1;
  }, []);
}

export function useLatestCareEntries(careTaskId: string, dogId: number) {
  return (
    useLiveQuery(
      () =>
        db.careEntries
          .where('[dogId+careTaskId]')
          .equals([dogId, careTaskId])
          .reverse()
          .limit(10)
          .toArray()
          .catch(() =>
            db.careEntries
              .where('dogId')
              .equals(dogId)
              .filter((e) => e.careTaskId === careTaskId)
              .reverse()
              .limit(10)
              .toArray()
          ),
      [careTaskId, dogId]
    ) ?? []
  );
}

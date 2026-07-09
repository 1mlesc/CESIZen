export interface StressEvent {
  points: number;
}

export function calculateStressScore(events: StressEvent[]): number {
  if (!events || events.length === 0) return 0;
  const score = events.reduce((sum, event) => sum + Math.max(0, event.points), 0);
  return Math.round(score);
}

export function getStressLevel(score: number): string {
  if (score === 0) return 'Pas de stress';
  if (score < 150) return 'Faible risque';
  if (score < 300) return 'Risque modéré';
  return 'Risque élevé';
}

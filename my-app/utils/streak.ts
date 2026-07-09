export interface LogEntry {
  date: string;
}

export function getStreakDays(logs: LogEntry[]): number {
  if (!logs || logs.length === 0) return 0;
  
  const uniqueDates = [...new Set(logs.map(log => new Date(log.date).toDateString()))]
    .map(dateStr => new Date(dateStr))
    .sort((a, b) => b.getTime() - a.getTime());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDate = today;

  // Check if first entry is today or yesterday to start streak
  if (uniqueDates[0].getTime() === currentDate.getTime()) {
      streak++;
  } else {
      currentDate.setDate(currentDate.getDate() - 1);
      if (uniqueDates[0].getTime() === currentDate.getTime()) {
          streak++;
      } else {
          return 0; // Streak broken
      }
  }

  for (let i = 1; i < uniqueDates.length; i++) {
    currentDate.setDate(currentDate.getDate() - 1);
    if (uniqueDates[i].getTime() === currentDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

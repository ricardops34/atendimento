export function composeDateTime(dateStr: string | Date, timeStr: string): Date {
  const dateObj = new Date(dateStr);
  const [hours, minutes] = (timeStr || '00:00').split(':').map(Number);
  dateObj.setUTCHours(hours || 0, minutes || 0, 0, 0);
  return dateObj;
}

export function parseDurationToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.split(':');
  if (parts.length !== 2) return 0;
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

export function calculateDuration(start: string, end: string, intStart: string, intEnd: string): number {
  const startMins = parseDurationToMinutes(start);
  const endMins = parseDurationToMinutes(end);
  const intStartMins = parseDurationToMinutes(intStart);
  const intEndMins = parseDurationToMinutes(intEnd);

  const total = endMins - startMins;
  const interval = intEndMins - intStartMins;
  
  return Math.max(0, total - Math.max(0, interval));
}

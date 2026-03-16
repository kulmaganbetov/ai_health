// Mock health data for 30 days
export type DailyHeartRate = {
  time: string;
  bpm: number;
  min: number;
  max: number;
};

export type DailyActivity = {
  date: string;
  day: string;
  steps: number;
  calories: number;
  activeMinutes: number;
  distance: number;
};

export type DailySleep = {
  date: string;
  day: string;
  duration: number;
  deep: number;
  light: number;
  rem: number;
  awake: number;
  quality: number;
};

export type HRVData = {
  date: string;
  day: string;
  hrv: number;
};

export type OxygenData = {
  date: string;
  day: string;
  spo2: number;
};

export type BloodPressure = {
  date: string;
  day: string;
  systolic: number;
  diastolic: number;
};

export type WeeklyHeartRate = {
  time: string;
  morning: number;
  afternoon: number;
  evening: number;
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const kazakDays = ["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жк"];
const kazakMonths = [
  "Қаң", "Ақп", "Нау", "Сәу", "Мам", "Мау",
  "Шіл", "Там", "Қыр", "Қаз", "Қар", "Жел"
];

function formatKazakDate(daysAgo: number): { date: string; day: string } {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const day = kazakDays[d.getDay()];
  const dateStr = `${d.getDate()} ${kazakMonths[d.getMonth()]}`;
  return { date: dateStr, day };
}

// 30-day heart rate data (hourly for last 24h)
export const heartRateData: DailyHeartRate[] = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const baseRate = hour >= 23 || hour < 6 ? 58 : hour < 9 ? 72 : hour < 12 ? 82 : hour < 14 ? 88 : hour < 18 ? 85 : 75;
  const variation = Math.round((seededRandom(i * 7 + 3) - 0.5) * 12);
  return {
    time: `${String(hour).padStart(2, "0")}:00`,
    bpm: baseRate + variation,
    min: baseRate + variation - 8,
    max: baseRate + variation + 10,
  };
});

// 30-day activity data
export const activityData: DailyActivity[] = Array.from({ length: 30 }, (_, i) => {
  const { date, day } = formatKazakDate(29 - i);
  const isWeekend = (i % 7 === 5 || i % 7 === 6);
  const baseSteps = isWeekend ? 12000 : 8500;
  const r = seededRandom(i * 13 + 5);
  const steps = Math.round(baseSteps + (r - 0.5) * 4000);
  return {
    date,
    day,
    steps: Math.max(2000, steps),
    calories: Math.round(steps * 0.04 + 1400 + seededRandom(i * 11) * 200),
    activeMinutes: Math.round(30 + seededRandom(i * 17) * 60),
    distance: parseFloat((steps * 0.00078).toFixed(2)),
  };
});

// 30-day sleep data
export const sleepData: DailySleep[] = Array.from({ length: 30 }, (_, i) => {
  const { date, day } = formatKazakDate(29 - i);
  const baseDuration = 7.2 + (seededRandom(i * 3 + 1) - 0.5) * 1.5;
  const duration = parseFloat(Math.max(5.5, Math.min(9, baseDuration)).toFixed(1));
  const deep = parseFloat((duration * (0.15 + seededRandom(i * 7) * 0.08)).toFixed(1));
  const rem = parseFloat((duration * (0.18 + seededRandom(i * 11) * 0.07)).toFixed(1));
  const awake = parseFloat((duration * 0.05).toFixed(1));
  const light = parseFloat((duration - deep - rem - awake).toFixed(1));
  const quality = Math.round(60 + (deep / duration) * 100 + (rem / duration) * 80);
  return {
    date,
    day,
    duration,
    deep,
    light: Math.max(0.5, light),
    rem,
    awake,
    quality: Math.min(100, quality),
  };
});

// HRV data
export const hrvData: HRVData[] = Array.from({ length: 30 }, (_, i) => {
  const { date, day } = formatKazakDate(29 - i);
  return {
    date,
    day,
    hrv: Math.round(45 + (seededRandom(i * 19 + 2) - 0.5) * 20),
  };
});

// SpO2 data
export const oxygenData: OxygenData[] = Array.from({ length: 30 }, (_, i) => {
  const { date, day } = formatKazakDate(29 - i);
  return {
    date,
    day,
    spo2: parseFloat((97.5 + (seededRandom(i * 23 + 4) - 0.5) * 2).toFixed(1)),
  };
});

// Blood pressure data
export const bloodPressureData: BloodPressure[] = Array.from({ length: 30 }, (_, i) => {
  const { date, day } = formatKazakDate(29 - i);
  return {
    date,
    day,
    systolic: Math.round(118 + (seededRandom(i * 29 + 6) - 0.5) * 14),
    diastolic: Math.round(76 + (seededRandom(i * 31 + 8) - 0.5) * 10),
  };
});

// Weekly heart rate by time of day
export const weeklyHeartRate: WeeklyHeartRate[] = Array.from({ length: 7 }, (_, i) => {
  const { day } = formatKazakDate(6 - i);
  return {
    time: day,
    morning: Math.round(68 + (seededRandom(i * 41) - 0.5) * 12),
    afternoon: Math.round(85 + (seededRandom(i * 43 + 1) - 0.5) * 14),
    evening: Math.round(74 + (seededRandom(i * 47 + 2) - 0.5) * 10),
  };
});

// Summary stats
export const healthSummary = {
  healthScore: 82,
  heartHealth: 78,
  sleepQuality: 85,
  activityLevel: 88,
  stressLevel: 62,
  biologicalAge: 26,
  chronologicalAge: 30,
  avgHeartRate: 72,
  avgHRV: 52,
  avgSpo2: 97.8,
  avgSleep: 7.3,
  avgSteps: 9200,
  avgCalories: 2180,
};

// Risk predictions (simulated)
export const riskPredictions = [
  {
    id: "heart",
    nameKz: "Жүрек ауруы қаупі",
    risk: 12,
    level: "low" as const,
    description: "Жүрек соғу жиілігі мен HRV деректері негізінде",
    trend: -2,
  },
  {
    id: "hypertension",
    nameKz: "Гипертония қаупі",
    risk: 18,
    level: "low" as const,
    description: "Қан қысымы деректері негізінде",
    trend: 1,
  },
  {
    id: "diabetes",
    nameKz: "Қант диабеті қаупі",
    risk: 9,
    level: "low" as const,
    description: "Белсенділік пен калория деректері негізінде",
    trend: -3,
  },
  {
    id: "sleep_apnea",
    nameKz: "Ұйқы апноэ қаупі",
    risk: 23,
    level: "moderate" as const,
    description: "Ұйқы фазалары мен SpO2 деректері негізінде",
    trend: 3,
  },
];

export const last7DaysActivity = activityData.slice(-7);
export const last7DaysSleep = sleepData.slice(-7);
export const last7DaysHRV = hrvData.slice(-7);
export const last30DaysActivity = activityData;
export const last30DaysSleep = sleepData;

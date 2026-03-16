"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { activityData, sleepData, heartRateData, bloodPressureData } from "./mockData";

const kazakDays = ["Жк", "Дс", "Сс", "Ср", "Бс", "Жм", "Сб"];
const kazakMonths = ["Қаң", "Ақп", "Нау", "Сәу", "Мам", "Мау", "Шіл", "Там", "Қыр", "Қаз", "Қар", "Жел"];

function getTodayKazak() {
  const d = new Date();
  return {
    date: `${d.getDate()} ${kazakMonths[d.getMonth()]}`,
    day: kazakDays[d.getDay()],
  };
}

export interface HeartRateEntry {
  id: string;
  time: string;
  bpm: number;
  timestamp: number;
}

export interface ActivityEntry {
  id: string;
  date: string;
  day: string;
  steps: number;
  calories: number;
  activeMinutes: number;
  distance: number;
  timestamp: number;
}

export interface SleepEntry {
  id: string;
  date: string;
  day: string;
  duration: number;
  quality: number;
  deep: number;
  rem: number;
  light: number;
  awake: number;
  timestamp: number;
}

export interface BloodPressureEntry {
  id: string;
  date: string;
  day: string;
  systolic: number;
  diastolic: number;
  timestamp: number;
}

export interface UserData {
  heartRate: HeartRateEntry[];
  activity: ActivityEntry[];
  sleep: SleepEntry[];
  bloodPressure: BloodPressureEntry[];
}

interface DataContextValue {
  userData: UserData;
  addHeartRate: (bpm: number) => void;
  addActivity: (data: { steps: number; calories: number; activeMinutes: number }) => void;
  addSleep: (data: { duration: number; quality: number }) => void;
  addBloodPressure: (data: { systolic: number; diastolic: number }) => void;
  clearUserData: () => void;
  mergedHeartRate: typeof heartRateData;
  mergedActivity: typeof activityData;
  mergedSleep: typeof sleepData;
  mergedBloodPressure: typeof bloodPressureData;
  latestStats: {
    bpm: number;
    steps: number;
    sleepHours: number;
    systolic: number;
    diastolic: number;
  };
  lastAddedType: string | null;
}

const STORAGE_KEY = "healthai_user_data";

const emptyData: UserData = {
  heartRate: [],
  activity: [],
  sleep: [],
  bloodPressure: [],
};

function loadFromStorage(): UserData {
  if (typeof window === "undefined") return emptyData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return emptyData;
}

function saveToStorage(data: UserData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>(emptyData);
  const [lastAddedType, setLastAddedType] = useState<string | null>(null);

  useEffect(() => {
    setUserData(loadFromStorage());
  }, []);

  const update = useCallback((updater: (prev: UserData) => UserData) => {
    setUserData((prev) => {
      const next = updater(prev);
      saveToStorage(next);
      return next;
    });
  }, []);

  const addHeartRate = useCallback((bpm: number) => {
    const now = new Date();
    const entry: HeartRateEntry = {
      id: crypto.randomUUID(),
      time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
      bpm,
      timestamp: Date.now(),
    };
    update((prev) => ({ ...prev, heartRate: [...prev.heartRate, entry] }));
    setLastAddedType("heartRate");
    setTimeout(() => setLastAddedType(null), 3000);
  }, [update]);

  const addActivity = useCallback((data: { steps: number; calories: number; activeMinutes: number }) => {
    const { date, day } = getTodayKazak();
    const entry: ActivityEntry = {
      id: crypto.randomUUID(),
      date,
      day,
      steps: data.steps,
      calories: data.calories,
      activeMinutes: data.activeMinutes,
      distance: parseFloat((data.steps * 0.00078).toFixed(2)),
      timestamp: Date.now(),
    };
    update((prev) => ({ ...prev, activity: [...prev.activity, entry] }));
    setLastAddedType("activity");
    setTimeout(() => setLastAddedType(null), 3000);
  }, [update]);

  const addSleep = useCallback((data: { duration: number; quality: number }) => {
    const { date, day } = getTodayKazak();
    const deep = parseFloat((data.duration * 0.2).toFixed(1));
    const rem = parseFloat((data.duration * 0.2).toFixed(1));
    const awake = parseFloat((data.duration * 0.05).toFixed(1));
    const light = parseFloat((data.duration - deep - rem - awake).toFixed(1));
    const entry: SleepEntry = {
      id: crypto.randomUUID(),
      date,
      day,
      duration: data.duration,
      quality: data.quality,
      deep,
      rem,
      light: Math.max(0.5, light),
      awake,
      timestamp: Date.now(),
    };
    update((prev) => ({ ...prev, sleep: [...prev.sleep, entry] }));
    setLastAddedType("sleep");
    setTimeout(() => setLastAddedType(null), 3000);
  }, [update]);

  const addBloodPressure = useCallback((data: { systolic: number; diastolic: number }) => {
    const { date, day } = getTodayKazak();
    const entry: BloodPressureEntry = {
      id: crypto.randomUUID(),
      date,
      day,
      systolic: data.systolic,
      diastolic: data.diastolic,
      timestamp: Date.now(),
    };
    update((prev) => ({ ...prev, bloodPressure: [...prev.bloodPressure, entry] }));
    setLastAddedType("bloodPressure");
    setTimeout(() => setLastAddedType(null), 3000);
  }, [update]);

  const clearUserData = useCallback(() => {
    setUserData(emptyData);
    saveToStorage(emptyData);
  }, []);

  // Merge user data with mock data for charts
  const mergedHeartRate = React.useMemo(() => {
    if (userData.heartRate.length === 0) return heartRateData;
    const userPoints = userData.heartRate.map((e) => ({
      time: e.time,
      bpm: e.bpm,
      min: e.bpm - 8,
      max: e.bpm + 10,
    }));
    // Replace last N points in the data with user entries
    const base = [...heartRateData];
    userPoints.forEach((point) => {
      const idx = base.findIndex((b) => b.time === point.time);
      if (idx >= 0) base[idx] = point;
      else base.push(point);
    });
    return base.slice(-24);
  }, [userData.heartRate]);

  const mergedActivity = React.useMemo(() => {
    if (userData.activity.length === 0) return activityData;
    const base = activityData.slice(0, -userData.activity.length);
    const userMapped = userData.activity.map((e) => ({
      date: e.date,
      day: e.day,
      steps: e.steps,
      calories: e.calories,
      activeMinutes: e.activeMinutes,
      distance: e.distance,
    }));
    return [...base, ...userMapped].slice(-30);
  }, [userData.activity]);

  const mergedSleep = React.useMemo(() => {
    if (userData.sleep.length === 0) return sleepData;
    const base = sleepData.slice(0, -userData.sleep.length);
    const userMapped = userData.sleep.map((e) => ({
      date: e.date,
      day: e.day,
      duration: e.duration,
      deep: e.deep,
      light: e.light,
      rem: e.rem,
      awake: e.awake,
      quality: e.quality,
    }));
    return [...base, ...userMapped].slice(-30);
  }, [userData.sleep]);

  const mergedBloodPressure = React.useMemo(() => {
    if (userData.bloodPressure.length === 0) return bloodPressureData;
    const base = bloodPressureData.slice(0, -userData.bloodPressure.length);
    const userMapped = userData.bloodPressure.map((e) => ({
      date: e.date,
      day: e.day,
      systolic: e.systolic,
      diastolic: e.diastolic,
    }));
    return [...base, ...userMapped].slice(-30);
  }, [userData.bloodPressure]);

  const latestStats = React.useMemo(() => {
    const bpm =
      userData.heartRate.length > 0
        ? userData.heartRate[userData.heartRate.length - 1].bpm
        : 72;
    const steps =
      userData.activity.length > 0
        ? userData.activity[userData.activity.length - 1].steps
        : 9200;
    const sleepHours =
      userData.sleep.length > 0
        ? userData.sleep[userData.sleep.length - 1].duration
        : 7.3;
    const lastBP =
      userData.bloodPressure.length > 0
        ? userData.bloodPressure[userData.bloodPressure.length - 1]
        : null;
    return {
      bpm,
      steps,
      sleepHours,
      systolic: lastBP?.systolic ?? 118,
      diastolic: lastBP?.diastolic ?? 76,
    };
  }, [userData]);

  return (
    <DataContext.Provider
      value={{
        userData,
        addHeartRate,
        addActivity,
        addSleep,
        addBloodPressure,
        clearUserData,
        mergedHeartRate,
        mergedActivity,
        mergedSleep,
        mergedBloodPressure,
        latestStats,
        lastAddedType,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}

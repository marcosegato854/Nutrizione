export interface MealTime {
  id: string
  name: string
  timeRange: string
  startHour: number
  endHour: number
  order: number // Aggiungiamo un campo per l'ordinamento
}

export function getAllMealTimes(): MealTime[] {
  return [
    {
      id: "colazione",
      name: "Colazione",
      timeRange: "06:00 - 09:00",
      startHour: 6,
      endHour: 9,
      order: 1,
    },
    {
      id: "spuntino_mattina",
      name: "Spuntino Mattina", // Nome più descrittivo
      timeRange: "10:00 - 11:30",
      startHour: 10,
      endHour: 11.5,
      order: 2,
    },
    {
      id: "pranzo",
      name: "Pranzo",
      timeRange: "12:30 - 14:00",
      startHour: 12.5,
      endHour: 14,
      order: 3,
    },
    {
      id: "spuntino_pomeriggio",
      name: "Spuntino Pomeriggio", // Nome più descrittivo
      timeRange: "16:00 - 17:30",
      startHour: 16,
      endHour: 17.5,
      order: 4,
    },
    {
      id: "cena",
      name: "Cena",
      timeRange: "19:00 - 20:30",
      startHour: 19,
      endHour: 20.5,
      order: 5,
    },
  ]
}

export function getCurrentMealTime(): MealTime {
  const now = new Date()
  const currentHour = now.getHours() + now.getMinutes() / 60
  const mealTimes = getAllMealTimes()

  // Trova il pasto corrente in base all'ora
  const currentMeal = mealTimes.find((meal) => currentHour >= meal.startHour && currentHour <= meal.endHour)

  // Se non è l'ora di nessun pasto, mostra il prossimo pasto
  if (!currentMeal) {
    // Trova il prossimo pasto
    const nextMeal = mealTimes.find((meal) => currentHour < meal.startHour)

    // Se non ci sono pasti successivi oggi, mostra la colazione
    return nextMeal || mealTimes[0]
  }

  return currentMeal
}

// Aggiungi questa funzione per normalizzare i nomi dei giorni
export function normalizeDay(day: string): string {
  // Rimuovi accenti e normalizza
  const normalized = day
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

  // Mappa per gestire le variazioni dei nomi dei giorni
  const dayMap: Record<string, string> = {
    lunedi: "lunedi",
    lunedì: "lunedi",
    martedi: "martedi",
    martedì: "martedi",
    mercoledi: "mercoledi",
    mercoledì: "mercoledi",
    giovedi: "giovedi",
    giovedì: "giovedi",
    venerdi: "venerdi",
    venerdì: "venerdi",
    sabato: "sabato",
    domenica: "domenica",
  }

  return dayMap[normalized] || normalized
}

// Funzione per calcolare le calorie di un pasto
export function calculateMealCalories(macros: { protein: number; carbs: number; fat: number }): number {
  if (!macros) return 0
  return macros.protein * 4 + macros.carbs * 4 + macros.fat * 9
}

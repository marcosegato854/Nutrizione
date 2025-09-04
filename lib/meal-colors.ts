// Definizione dei colori per i diversi tipi di pasto
export const mealColors = {
  colazione: {
    light: "border-amber-400",
    dark: "dark:border-amber-600",
  },
  spuntino_mattina: {
    light: "border-green-400",
    dark: "dark:border-green-600",
  },
  pranzo: {
    light: "border-blue-400",
    dark: "dark:border-blue-600",
  },
  spuntino_pomeriggio: {
    light: "border-purple-400",
    dark: "dark:border-purple-600",
  },
  cena: {
    light: "border-red-400",
    dark: "dark:border-red-600",
  },
}

// Funzione per ottenere la classe di colore per un pasto
export function getMealColorClass(mealId: string): string {
  const colorSet = mealColors[mealId as keyof typeof mealColors] || {
    light: "border-gray-200",
    dark: "dark:border-gray-700",
  }

  return `${colorSet.light} ${colorSet.dark}`
}

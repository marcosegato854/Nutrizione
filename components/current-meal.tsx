"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { it } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentMealTime, type MealTime, normalizeDay } from "@/lib/meal-utils"
import { getMealColorClass } from "@/lib/meal-colors"

interface CurrentMealProps {
  userData: any
  selectedDay: Date
}

export default function CurrentMeal({ userData, selectedDay }: CurrentMealProps) {
  const [currentMealTime, setCurrentMealTime] = useState<MealTime>(getCurrentMealTime())

  // Aggiorna il pasto corrente ogni minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMealTime(getCurrentMealTime())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const dayOfWeek = normalizeDay(format(selectedDay, "EEEE", { locale: it }))
  const isToday = format(selectedDay, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")

  // Determina se è un giorno di allenamento
  const isTrainingDay = userData.trainingDays?.includes(dayOfWeek) || false
  const dayType = isTrainingDay ? "training" : "rest"

  // Ottieni i dati del pasto corrente
  const mealData = userData.days?.[dayOfWeek]?.meals?.[currentMealTime.id] || {
    foods: [],
    macros: { protein: 0, carbs: 0, fat: 0 },
  }

  // Ottieni la classe di colore per il pasto corrente
  const mealColorClass = getMealColorClass(currentMealTime.id)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold capitalize">{dayOfWeek}</h2>
          <p className="text-sm text-muted-foreground">{format(selectedDay, "d MMMM yyyy", { locale: it })}</p>
        </div>
        <div className="text-right">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isTrainingDay
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
            }`}
          >
            {isTrainingDay ? "Con allenamento" : "Senza allenamento"}
          </span>
        </div>
      </div>

      <Card className={`border-2 ${mealColorClass} lg:text-lg`}>
        <CardHeader className="pb-2">
          <CardTitle className="lg:text-2xl">{currentMealTime.name}</CardTitle>
          <CardDescription className="lg:text-base">{currentMealTime.timeRange}</CardDescription>
        </CardHeader>
        <CardContent>
          {mealData.foods && mealData.foods.length > 0 ? (
            <ul className="space-y-2 lg:space-y-3">
              {mealData.foods.map((food: string, index: number) => (
                <li key={`current-meal-food-${index}`} className="flex items-center">
                  <span className="mr-2">•</span>
                  {food}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Nessun dato disponibile per questo pasto</p>
          )}

          {mealData.macros && (
            <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Proteine</p>
                <p className="font-medium lg:text-xl">{mealData.macros.protein}g</p>
              </div>
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Carboidrati</p>
                <p className="font-medium lg:text-xl">{mealData.macros.carbs}g</p>
              </div>
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Grassi</p>
                <p className="font-medium lg:text-xl">{mealData.macros.fat}g</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {!isToday && (
        <div className="bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 p-3 rounded-md text-sm lg:text-base">
          Stai visualizzando un pasto per {format(selectedDay, "EEEE d MMMM", { locale: it })}
        </div>
      )}
    </div>
  )
}

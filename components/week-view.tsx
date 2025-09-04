"use client"

import { format, addDays, startOfWeek } from "date-fns"
import { it } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllMealTimes, normalizeDay } from "@/lib/meal-utils"
import { getMealColorClass } from "@/lib/meal-colors"

interface WeekViewProps {
  userData: any
  selectedDay: Date
  onSelectDay: (day: Date) => void
}

export default function WeekView({ userData, selectedDay, onSelectDay }: WeekViewProps) {
  const dayOfWeek = normalizeDay(format(selectedDay, "EEEE", { locale: it }))
  const isTrainingDay = userData.trainingDays?.includes(dayOfWeek) || false

  // Ottieni tutti i pasti per il giorno selezionato
  const dayMeals = userData.days?.[dayOfWeek]?.meals || {}

  // Ottieni tutti i tipi di pasto e ordinali per orario
  const mealTimes = getAllMealTimes()

  // Filtra solo i pasti esistenti per il giorno selezionato e ordinali
  const orderedMeals = mealTimes.filter((mealTime) => dayMeals[mealTime.id]).sort((a, b) => a.order - b.order)

  // Genera i giorni della settimana
  const weekStart = startOfWeek(selectedDay, { weekStartsOn: 1 }) // Inizia da lunedì
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(weekStart, i)
    const dayName = normalizeDay(format(date, "EEEE", { locale: it }))
    const isSelected = format(date, "yyyy-MM-dd") === format(selectedDay, "yyyy-MM-dd")
    const isToday = format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
    const isTraining = userData.trainingDays?.includes(dayName) || false

    return {
      date,
      dayName,
      shortName: format(date, "EEE", { locale: it }),
      dayNumber: format(date, "d"),
      isSelected,
      isToday,
      isTraining,
    }
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-7 gap-1 text-center">
        {weekDays.map((day) => (
          <div
            key={day.dayName}
            onClick={() => onSelectDay(day.date)}
            className={`
              cursor-pointer p-2 rounded-md relative
              ${day.isSelected ? "bg-primary text-primary-foreground" : ""}
              ${day.isToday && !day.isSelected ? "border border-primary" : ""}
            `}
          >
            <div className="text-xs lg:text-sm font-medium">{day.shortName}</div>
            <div className="text-sm lg:text-base">{day.dayNumber}</div>
            {day.isTraining && !day.isSelected && (
              <div className="absolute top-0 right-0 w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mb-2">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm lg:text-base font-medium ${
            isTrainingDay
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
          }`}
        >
          {isTrainingDay ? "Con allenamento" : "Senza allenamento"}
        </span>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg lg:text-2xl capitalize">{dayOfWeek}</CardTitle>
            <p className="text-sm lg:text-base text-muted-foreground">
              {format(selectedDay, "d MMMM yyyy", { locale: it })}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {orderedMeals.length > 0 ? (
              orderedMeals.map((meal) => {
                const mealData = dayMeals[meal.id]
                const mealColorClass = getMealColorClass(meal.id)

                return (
                  <div key={meal.id} className={`border-l-4 ${mealColorClass} pl-4 py-2`}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-medium text-base lg:text-lg">{meal.name}</h3>
                        <p className="text-xs lg:text-sm text-muted-foreground">{meal.timeRange}</p>
                      </div>
                      {mealData.macros && (
                        <div className="text-sm lg:text-base text-right">
                          <span className="font-medium">
                            P: {mealData.macros.protein}g | C: {mealData.macros.carbs}g | G: {mealData.macros.fat}g
                          </span>
                        </div>
                      )}
                    </div>

                    {mealData.foods && mealData.foods.length > 0 ? (
                      <ul className="space-y-1 lg:space-y-2">
                        {mealData.foods.map((food: string, index: number) => (
                          <li key={`${meal.id}-food-${index}`} className="flex items-center text-sm lg:text-base">
                            <span className="mr-2">•</span>
                            {food}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm lg:text-base text-muted-foreground">Nessun dato disponibile</p>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">Nessun pasto configurato per questo giorno</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

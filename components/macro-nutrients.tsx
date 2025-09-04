import { format } from "date-fns"
import { it } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { normalizeDay, getAllMealTimes, calculateMealCalories } from "@/lib/meal-utils"

interface MacroNutrientsProps {
  userData: any
  selectedDay: Date
}

export default function MacroNutrients({ userData, selectedDay }: MacroNutrientsProps) {
  const dayOfWeek = normalizeDay(format(selectedDay, "EEEE", { locale: it }))
  const isTrainingDay = userData.trainingDays?.includes(dayOfWeek) || false
  const dayType = isTrainingDay ? "training" : "rest"

  // Ottieni i macronutrienti giornalieri
  const dailyMacros = userData.macros?.[dayType] || {
    protein: 0,
    carbs: 0,
    fat: 0,
    calories: 0,
  }

  // Calcola le calorie totali
  const totalCalories = dailyMacros.calories || dailyMacros.protein * 4 + dailyMacros.carbs * 4 + dailyMacros.fat * 9

  // Calcola le percentuali
  const proteinPercentage = Math.round(((dailyMacros.protein * 4) / totalCalories) * 100) || 0
  const carbsPercentage = Math.round(((dailyMacros.carbs * 4) / totalCalories) * 100) || 0
  const fatPercentage = Math.round(((dailyMacros.fat * 9) / totalCalories) * 100) || 0

  // Ottieni tutti i pasti per il giorno selezionato
  const dayMeals = userData.days?.[dayOfWeek]?.meals || {}

  // Ottieni tutti i tipi di pasto e ordinali
  const mealTimes = getAllMealTimes()

  // Prepara i dati dei pasti in ordine cronologico
  const orderedMeals = mealTimes
    .filter((mealTime) => dayMeals[mealTime.id]) // Filtra solo i pasti esistenti
    .sort((a, b) => a.order - b.order) // Ordina per l'ordine cronologico
    .map((mealTime) => {
      const meal = dayMeals[mealTime.id]
      const calories = calculateMealCalories(meal.macros)
      return {
        id: mealTime.id,
        name: mealTime.name, // Usa il nome aggiornato
        macros: meal.macros,
        calories,
      }
    })

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg lg:text-2xl">Macronutrienti</CardTitle>
        <p className="text-sm lg:text-base text-muted-foreground">
          Giornata {isTrainingDay ? "con" : "senza"} allenamento
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="summary">Riepilogo</TabsTrigger>
            <TabsTrigger value="details">Dettagli</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm lg:text-base text-muted-foreground">Calorie</p>
                <p className="text-xl lg:text-3xl font-bold">{totalCalories}</p>
                <p className="text-xs lg:text-sm text-muted-foreground">kcal</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm lg:text-base text-muted-foreground">Proteine</p>
                <p className="text-xl lg:text-3xl font-bold">{dailyMacros.protein}</p>
                <p className="text-xs lg:text-sm text-muted-foreground">g ({proteinPercentage}%)</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm lg:text-base text-muted-foreground">Carboidrati</p>
                <p className="text-xl lg:text-3xl font-bold">{dailyMacros.carbs}</p>
                <p className="text-xs lg:text-sm text-muted-foreground">g ({carbsPercentage}%)</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm lg:text-base text-muted-foreground">Grassi</p>
                <p className="text-xl lg:text-3xl font-bold">{dailyMacros.fat}</p>
                <p className="text-xs lg:text-sm text-muted-foreground">g ({fatPercentage}%)</p>
              </div>
            </div>

            <div className="space-y-2 lg:space-y-4 lg:mt-6">
              <div className="space-y-1">
                <div className="flex justify-between text-xs lg:text-sm">
                  <span>Proteine</span>
                  <span>{proteinPercentage}%</span>
                </div>
                <Progress value={proteinPercentage} className="h-2 lg:h-3" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs lg:text-sm">
                  <span>Carboidrati</span>
                  <span>{carbsPercentage}%</span>
                </div>
                <Progress value={carbsPercentage} className="h-2 lg:h-3" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs lg:text-sm">
                  <span>Grassi</span>
                  <span>{fatPercentage}%</span>
                </div>
                <Progress value={fatPercentage} className="h-2 lg:h-3" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-4">
            <div className="space-y-4">
              {orderedMeals.map((meal) => (
                <div key={meal.id} className="border rounded-lg p-3 lg:p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium lg:text-lg">{meal.name}</h4>
                    <span className="text-sm lg:text-base">{meal.calories} kcal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm lg:text-base">
                    <div>
                      <p className="text-xs lg:text-sm text-muted-foreground">Proteine</p>
                      <p className="lg:text-lg">{meal.macros.protein}g</p>
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-muted-foreground">Carboidrati</p>
                      <p className="lg:text-lg">{meal.macros.carbs}g</p>
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-muted-foreground">Grassi</p>
                      <p className="lg:text-lg">{meal.macros.fat}g</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

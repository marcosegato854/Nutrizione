"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { getAllMealTimes, normalizeDay } from "@/lib/meal-utils"

interface DataEntryProps {
  mealData: any
  selectedUser: string
  onUpdate: (data: any) => void
}

export default function DataEntry({ mealData, selectedUser, onUpdate }: DataEntryProps) {
  const [activeTab, setActiveTab] = useState("macros")
  const userData = mealData[selectedUser] || {}
  const weekDays = ["lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato", "domenica"]
  const mealTimes = getAllMealTimes()

  // Stato per i giorni di allenamento
  const [trainingDays, setTrainingDays] = useState<string[]>(userData.trainingDays || [])

  // Stato per i macronutrienti
  const [macros, setMacros] = useState({
    training: {
      protein: userData.macros?.training?.protein || 0,
      carbs: userData.macros?.training?.carbs || 0,
      fat: userData.macros?.training?.fat || 0,
      calories: userData.macros?.training?.calories || 0,
    },
    rest: {
      protein: userData.macros?.rest?.protein || 0,
      carbs: userData.macros?.rest?.carbs || 0,
      fat: userData.macros?.rest?.fat || 0,
      calories: userData.macros?.rest?.calories || 0,
    },
  })

  // Stato per i pasti
  const [meals, setMeals] = useState<any>({})

  // Gestisci il cambiamento dei giorni di allenamento
  const handleTrainingDayChange = (day: string, checked: boolean) => {
    if (checked) {
      setTrainingDays([...trainingDays, day])
    } else {
      setTrainingDays(trainingDays.filter((d) => d !== day))
    }
  }

  // Gestisci il cambiamento dei macronutrienti
  const handleMacroChange = (type: "training" | "rest", macro: string, value: string) => {
    setMacros({
      ...macros,
      [type]: {
        ...macros[type],
        [macro]: Number.parseInt(value) || 0,
      },
    })
  }

  // Gestisci il cambiamento dei pasti
  const handleMealChange = (day: string, mealId: string, field: string, value: string) => {
    setMeals({
      ...meals,
      [day]: {
        ...meals[day],
        [mealId]: {
          ...meals[day]?.[mealId],
          [field]: value,
        },
      },
    })
  }

  // Salva i dati
  const handleSave = () => {
    // Prepara i dati aggiornati
    const updatedData = {
      ...mealData,
      [selectedUser]: {
        ...userData,
        trainingDays,
        macros,
        days: {
          ...userData.days,
        },
      },
    }

    // Aggiorna i pasti per ogni giorno
    Object.entries(meals).forEach(([day, dayMeals]: [string, any]) => {
      const normalizedDay = normalizeDay(day)
      if (!updatedData[selectedUser].days[normalizedDay]) {
        updatedData[selectedUser].days[normalizedDay] = { meals: {} }
      }

      Object.entries(dayMeals).forEach(([mealId, mealData]: [string, any]) => {
        // Converti il testo dei cibi in un array
        const foods = mealData.foods?.split("\n").filter((food: string) => food.trim() !== "") || []

        // Converti i macronutrienti in numeri
        const protein = Number.parseInt(mealData.protein) || 0
        const carbs = Number.parseInt(mealData.carbs) || 0
        const fat = Number.parseInt(mealData.fat) || 0

        updatedData[selectedUser].days[normalizedDay].meals[mealId] = {
          ...updatedData[selectedUser].days[normalizedDay].meals[mealId],
          name: mealTimes.find((m) => m.id === mealId)?.name || mealId,
          foods,
          macros: {
            protein,
            carbs,
            fat,
          },
        }
      })
    })

    onUpdate(updatedData)
    alert("Dati salvati con successo!")
  }

  // Modifica la funzione prepareMealData per usare la funzione normalizeDay
  const prepareMealData = (day: string, mealId: string) => {
    const normalizedDay = normalizeDay(day)
    const mealData = userData.days?.[normalizedDay]?.meals?.[mealId] || {}

    if (!meals[day]?.[mealId]) {
      // Inizializza i dati del pasto se non esistono
      setMeals((prev: any) => ({
        ...prev,
        [day]: {
          ...prev[day],
          [mealId]: {
            foods: mealData.foods?.join("\n") || "",
            protein: mealData.macros?.protein || 0,
            carbs: mealData.macros?.carbs || 0,
            fat: mealData.macros?.fat || 0,
          },
        },
      }))
    }

    return (
      meals[day]?.[mealId] || {
        foods: mealData.foods?.join("\n") || "",
        protein: mealData.macros?.protein || 0,
        carbs: mealData.macros?.carbs || 0,
        fat: mealData.macros?.fat || 0,
      }
    )
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="macros">Macronutrienti</TabsTrigger>
          <TabsTrigger value="training">Allenamento</TabsTrigger>
          <TabsTrigger value="meals">Pasti</TabsTrigger>
        </TabsList>

        <TabsContent value="macros" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Macronutrienti</CardTitle>
              <CardDescription>Imposta i macronutrienti per le giornate con e senza allenamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Giornata con allenamento</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="training-protein">Proteine (g)</Label>
                    <Input
                      id="training-protein"
                      type="number"
                      value={macros.training.protein}
                      onChange={(e) => handleMacroChange("training", "protein", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="training-carbs">Carboidrati (g)</Label>
                    <Input
                      id="training-carbs"
                      type="number"
                      value={macros.training.carbs}
                      onChange={(e) => handleMacroChange("training", "carbs", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="training-fat">Grassi (g)</Label>
                    <Input
                      id="training-fat"
                      type="number"
                      value={macros.training.fat}
                      onChange={(e) => handleMacroChange("training", "fat", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="training-calories">Calorie (kcal)</Label>
                    <Input
                      id="training-calories"
                      type="number"
                      value={macros.training.calories}
                      onChange={(e) => handleMacroChange("training", "calories", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Giornata senza allenamento</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rest-protein">Proteine (g)</Label>
                    <Input
                      id="rest-protein"
                      type="number"
                      value={macros.rest.protein}
                      onChange={(e) => handleMacroChange("rest", "protein", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rest-carbs">Carboidrati (g)</Label>
                    <Input
                      id="rest-carbs"
                      type="number"
                      value={macros.rest.carbs}
                      onChange={(e) => handleMacroChange("rest", "carbs", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rest-fat">Grassi (g)</Label>
                    <Input
                      id="rest-fat"
                      type="number"
                      value={macros.rest.fat}
                      onChange={(e) => handleMacroChange("rest", "fat", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rest-calories">Calorie (kcal)</Label>
                    <Input
                      id="rest-calories"
                      type="number"
                      value={macros.rest.calories}
                      onChange={(e) => handleMacroChange("rest", "calories", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Giorni di allenamento</CardTitle>
              <CardDescription>Seleziona i giorni in cui svolgi attività fisica</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 lg:grid-cols-2">
                {weekDays.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={`training-${day}`}
                      checked={trainingDays.includes(day)}
                      onCheckedChange={(checked) => handleTrainingDayChange(day, checked as boolean)}
                    />
                    <Label htmlFor={`training-${day}`} className="capitalize">
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meals" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pasti</CardTitle>
              <CardDescription>Inserisci i dettagli dei pasti per ogni giorno della settimana</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={weekDays[0]}>
                <TabsList className="grid grid-cols-7 w-full">
                  {weekDays.map((day) => (
                    <TabsTrigger key={day} value={day} className="text-xs capitalize">
                      {day.slice(0, 3)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {weekDays.map((day) => (
                  <TabsContent key={day} value={day} className="mt-4 space-y-6">
                    {mealTimes.map((meal) => {
                      const mealData = prepareMealData(day, meal.id)

                      return (
                        <div key={`${day}-${meal.id}`} className="space-y-4">
                          <h3 className="text-lg font-medium">{meal.name}</h3>
                          <p className="text-sm text-muted-foreground">{meal.timeRange}</p>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor={`${day}-${meal.id}-foods`}>Alimenti</Label>
                              <Textarea
                                id={`${day}-${meal.id}-foods`}
                                placeholder="Inserisci un alimento per riga"
                                value={mealData.foods}
                                onChange={(e) => handleMealChange(day, meal.id, "foods", e.target.value)}
                                className="min-h-[100px]"
                              />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`${day}-${meal.id}-protein`}>Proteine (g)</Label>
                                <Input
                                  id={`${day}-${meal.id}-protein`}
                                  type="number"
                                  value={mealData.protein}
                                  onChange={(e) => handleMealChange(day, meal.id, "protein", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`${day}-${meal.id}-carbs`}>Carboidrati (g)</Label>
                                <Input
                                  id={`${day}-${meal.id}-carbs`}
                                  type="number"
                                  value={mealData.carbs}
                                  onChange={(e) => handleMealChange(day, meal.id, "carbs", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`${day}-${meal.id}-fat`}>Grassi (g)</Label>
                                <Input
                                  id={`${day}-${meal.id}-fat`}
                                  type="number"
                                  value={mealData.fat}
                                  onChange={(e) => handleMealChange(day, meal.id, "fat", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} className="w-full">
        Salva dati
      </Button>
    </div>
  )
}

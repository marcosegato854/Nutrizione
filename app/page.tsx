"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, addDays } from "date-fns"
import { it } from "date-fns/locale"
import CurrentMeal from "@/components/current-meal"
import WeekView from "@/components/week-view"
import MacroNutrients from "@/components/macro-nutrients"
import DataEntry from "@/components/data-entry"
import ShoppingList from "@/components/shopping-list"
import { defaultMealData } from "@/lib/default-data"
import UserSelection from "@/components/user-selection"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageTitle } from "@/components/page-title"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Calendar, ShoppingCart, Settings, HomeIcon } from "lucide-react"

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [mealData, setMealData, isInitialized] = useLocalStorage("mealData", defaultMealData)
  const [selectedDay, setSelectedDay] = useState<Date>(new Date())
  const [activeTab, setActiveTab] = useState("oggi")

  // Imposta il titolo della pagina in base all'utente selezionato
  const pageTitle = selectedUser ? `Piano Alimentare - ${selectedUser}` : "Piano Alimentare"

  // Se non è ancora inizializzato, mostra un loader
  if (!isInitialized) {
    return (
      <>
        <PageTitle title="Piano Alimentare - Caricamento..." />
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Caricamento dati...</p>
        </div>
      </>
    )
  }

  // Se non c'è un utente selezionato, mostra la selezione utente
  if (!selectedUser) {
    return (
      <>
        <PageTitle title="Piano Alimentare - Seleziona Profilo" />
        <UserSelection onUserSelected={setSelectedUser} />
      </>
    )
  }

  const today = new Date()
  const dayOfWeek = format(selectedDay, "EEEE", { locale: it })
  const formattedDate = format(selectedDay, "d MMMM", { locale: it })

  const handlePreviousDay = () => {
    setSelectedDay((prev) => addDays(prev, -1))
    setActiveTab("settimana")
  }

  const handleNextDay = () => {
    setSelectedDay((prev) => addDays(prev, 1))
    setActiveTab("settimana")
  }

  const handleTodayClick = () => {
    setSelectedDay(new Date())
    setActiveTab("oggi")
  }

  // Ottieni i dati dell'utente selezionato
  const userData = mealData[selectedUser] || {
    trainingDays: [],
    macros: {
      training: { protein: 0, carbs: 0, fat: 0, calories: 0 },
      rest: { protein: 0, carbs: 0, fat: 0, calories: 0 },
    },
    days: {},
  }

  const handleDataUpdate = (newData: any) => {
    setMealData(newData)
  }

  return (
    <>
      <PageTitle title={pageTitle} />
      <div className="flex flex-col lg:flex-row min-h-screen bg-background">
        {/* Sidebar per desktop */}
        <div className="hidden lg:flex lg:w-64 border-r p-4 flex-col">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Piano Alimentare</h1>
            <ThemeToggle />
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
              <span className="text-lg font-medium">{selectedUser}</span>
              <Button variant="outline" size="sm" onClick={() => setSelectedUser(null)}>
                Cambia
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              variant={activeTab === "oggi" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("oggi")
                setSelectedDay(new Date())
              }}
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              Oggi
            </Button>
            <Button
              variant={activeTab === "settimana" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("settimana")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Settimana
            </Button>
            <Button
              variant={activeTab === "spesa" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("spesa")}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Lista Spesa
            </Button>
            <Button
              variant={activeTab === "dati" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("dati")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Dati
            </Button>
          </div>

          <div className="mt-auto pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">Dati salvati localmente</p>
          </div>
        </div>

        {/* Contenuto principale */}
        <main className="flex-1 p-4 lg:flex lg:justify-center lg:items-start lg:pt-8">
          <div className="max-w-md mx-auto lg:max-w-4xl lg:w-full lg:mx-auto">
            {/* Header per mobile */}
            <div className="flex lg:hidden items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Piano Alimentare</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{selectedUser}</span>
                <Button variant="outline" size="sm" onClick={() => setSelectedUser(null)}>
                  Cambia
                </Button>
                <ThemeToggle />
              </div>
            </div>

            {/* Tabs per mobile */}
            <div className="lg:hidden mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="oggi" className="flex items-center gap-1">
                    <HomeIcon className="h-3.5 w-3.5" />
                    <span className="hidden xs:inline">Oggi</span>
                  </TabsTrigger>
                  <TabsTrigger value="settimana" className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="hidden xs:inline">Settimana</span>
                  </TabsTrigger>
                  <TabsTrigger value="spesa" className="flex items-center gap-1">
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span className="hidden xs:inline">Spesa</span>
                  </TabsTrigger>
                  <TabsTrigger value="dati" className="flex items-center gap-1">
                    <Settings className="h-3.5 w-3.5" />
                    <span className="hidden xs:inline">Dati</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Contenuto centrale - adattato per desktop e mobile */}
            {activeTab === "oggi" && (
              <div className="mt-4 lg:grid lg:grid-cols-1 lg:gap-6">
                <Card className="lg:p-2">
                  <CardContent className="pt-6">
                    <CurrentMeal userData={userData} selectedDay={selectedDay} />
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <MacroNutrients userData={userData} selectedDay={selectedDay} />
                </div>
              </div>
            )}

            {activeTab === "settimana" && (
              <div className="mt-4">
                <Card className="lg:p-2">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <Button variant="outline" size="sm" onClick={handlePreviousDay}>
                        Precedente
                      </Button>
                      <div className="text-center">
                        <div className="font-medium capitalize">{dayOfWeek}</div>
                        <div className="text-sm text-muted-foreground">{formattedDate}</div>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleNextDay}>
                        Successivo
                      </Button>
                    </div>

                    <Button variant="secondary" className="w-full mb-4" onClick={handleTodayClick}>
                      Oggi
                    </Button>

                    <WeekView userData={userData} selectedDay={selectedDay} onSelectDay={setSelectedDay} />
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "spesa" && (
              <div className="mt-4">
                <ShoppingList userData={userData} selectedUser={selectedUser} />
              </div>
            )}

            {activeTab === "dati" && (
              <div className="mt-4">
                <DataEntry mealData={mealData} selectedUser={selectedUser} onUpdate={handleDataUpdate} />
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  type ShoppingItem,
  type ShoppingList as ShoppingListType,
  loadShoppingList,
  saveShoppingList,
  updateShoppingItemStatus,
  addCustomShoppingItem,
  removeShoppingItem,
  generateShoppingList,
  mergeShoppingLists,
  clearShoppingList,
} from "@/lib/shopping-list-utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ShoppingCart, RefreshCw, Plus, Trash2, Info, ChevronDown, ChevronUp, Trash } from "lucide-react"

interface ShoppingListProps {
  userData: any
  selectedUser: string
}

export default function ShoppingList({ userData, selectedUser }: ShoppingListProps) {
  const [shoppingList, setShoppingList] = useState<ShoppingListType>({ items: [], lastUpdated: "" })
  const [newItemName, setNewItemName] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState("")
  const [newItemCategory, setNewItemCategory] = useState("")
  const [daysToInclude, setDaysToInclude] = useState(7)
  const [isGenerating, setIsGenerating] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [showClearDialog, setShowClearDialog] = useState(false)
  const { toast } = useToast()

  // Memorizza l'ultimo userData per confronto
  const [lastUserDataHash, setLastUserDataHash] = useState<string>("")

  // Funzione per generare un hash semplice dei dati utente
  const generateUserDataHash = useCallback((data: any) => {
    if (!data) return ""
    try {
      // Creiamo un hash semplice basato sui pasti dell'utente
      const mealsData = Object.values(data.days || {})
        .map((day: any) =>
          Object.values(day.meals || {})
            .map((meal: any) => (meal.foods || []).join(","))
            .join(";"),
        )
        .join("|")
      return mealsData
    } catch (e) {
      console.error("Errore nel generare hash dei dati:", e)
      return Date.now().toString() // Fallback per forzare l'aggiornamento
    }
  }, [])

  // Carica la lista della spesa salvata
  useEffect(() => {
    if (!selectedUser) return

    const loadList = () => {
      const localList = loadShoppingList(selectedUser)
      setShoppingList(localList)

      // Espandi tutte le categorie per impostazione predefinita
      const categories = getCategories(localList.items)
      const initialExpandedState: Record<string, boolean> = {}
      categories.forEach((category) => {
        initialExpandedState[category] = true
      })
      setExpandedCategories(initialExpandedState)

      // Salva l'hash dei dati utente correnti
      setLastUserDataHash(generateUserDataHash(userData))
    }

    loadList()
  }, [selectedUser, generateUserDataHash, userData])

  // Controlla se i dati utente sono cambiati e rigenera la lista se necessario
  useEffect(() => {
    if (!userData || !selectedUser) return

    const currentHash = generateUserDataHash(userData)

    // Se i dati sono cambiati e abbiamo già un hash precedente (non è il primo caricamento)
    if (lastUserDataHash && currentHash !== lastUserDataHash) {
      console.log("Dati utente modificati, aggiornamento lista della spesa...")

      // Rigenera la lista della spesa con i nuovi dati
      const newList = generateShoppingList(userData, daysToInclude)

      // Unisci con la lista esistente per mantenere gli elementi spuntati
      const mergedList = mergeShoppingLists(shoppingList, newList)

      setShoppingList(mergedList)
      setLastUserDataHash(currentHash)

      toast({
        title: "Lista della spesa aggiornata",
        description: "La lista è stata aggiornata in base alle modifiche ai pasti",
      })
    } else if (!lastUserDataHash) {
      // Primo caricamento, salva solo l'hash
      setLastUserDataHash(currentHash)
    }
  }, [userData, selectedUser, lastUserDataHash, generateUserDataHash, daysToInclude, shoppingList, toast])

  // Salva la lista della spesa quando cambia
  useEffect(() => {
    if (!selectedUser || !shoppingList.lastUpdated) return

    // Salva in localStorage
    saveShoppingList(selectedUser, shoppingList)
  }, [shoppingList, selectedUser])

  // Ottieni tutte le categorie uniche
  const getCategories = (items: ShoppingItem[]): string[] => {
    const categories = new Set(items.map((item) => item.category || "Altro"))
    return Array.from(categories).sort()
  }

  // Raggruppa gli elementi per categoria
  const groupedItems = shoppingList.items.reduce(
    (acc, item) => {
      const category = item.category || "Altro"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(item)
      return acc
    },
    {} as Record<string, ShoppingItem[]>,
  )

  // Gestisci il cambio di stato di un elemento
  const handleItemCheck = (itemId: string, checked: boolean) => {
    const updatedList = updateShoppingItemStatus(shoppingList, itemId, checked)
    setShoppingList(updatedList)
  }

  // Aggiungi un nuovo elemento personalizzato
  const handleAddItem = () => {
    if (!newItemName.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci il nome dell'articolo",
        variant: "destructive",
      })
      return
    }

    const updatedList = addCustomShoppingItem(
      shoppingList,
      newItemName.trim(),
      newItemQuantity.trim() || undefined,
      newItemCategory || undefined,
    )

    setShoppingList(updatedList)
    setNewItemName("")
    setNewItemQuantity("")
    setNewItemCategory("")

    toast({
      title: "Articolo aggiunto",
      description: `${newItemName} è stato aggiunto alla lista della spesa`,
    })
  }

  // Rimuovi un elemento dalla lista
  const handleRemoveItem = (itemId: string, itemName: string) => {
    const updatedList = removeShoppingItem(shoppingList, itemId)
    setShoppingList(updatedList)

    toast({
      title: "Articolo rimosso",
      description: `${itemName} è stato rimosso dalla lista della spesa`,
    })
  }

  // Genera una nuova lista della spesa
  const handleGenerateList = () => {
    setIsGenerating(true)

    try {
      // Genera una nuova lista
      const newList = generateShoppingList(userData, daysToInclude)

      // Unisci con la lista esistente per mantenere gli elementi spuntati
      const mergedList = mergeShoppingLists(shoppingList, newList)

      setShoppingList(mergedList)

      // Aggiorna l'hash dei dati utente
      setLastUserDataHash(generateUserDataHash(userData))

      toast({
        title: "Lista della spesa generata",
        description: `Lista generata con ${mergedList.items.length} articoli per ${daysToInclude} giorni`,
      })
    } catch (error) {
      console.error("Errore nella generazione della lista:", error)
      toast({
        title: "Errore",
        description: "Si è verificato un errore nella generazione della lista della spesa",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Cancella l'intera lista della spesa
  const handleClearList = () => {
    setShowClearDialog(true)
  }

  // Conferma la cancellazione della lista
  const confirmClearList = () => {
    const emptyList = clearShoppingList()
    setShoppingList(emptyList)
    setShowClearDialog(false)

    toast({
      title: "Lista cancellata",
      description: "La lista della spesa è stata cancellata completamente",
    })
  }

  // Calcola statistiche della lista
  const totalItems = shoppingList.items.length
  const checkedItems = shoppingList.items.filter((item) => item.checked).length
  const progress = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0

  // Gestisci l'espansione/compressione delle categorie
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  // Formatta la data dell'ultimo aggiornamento
  const formatLastUpdated = () => {
    if (!shoppingList.lastUpdated) return "Mai"

    try {
      const date = new Date(shoppingList.lastUpdated)
      return date.toLocaleString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch (e) {
      return "Data non valida"
    }
  }

  // Formatta la visualizzazione delle fonti dei pasti
  const formatMealSources = (sources: string[]) => {
    if (!sources || sources.length === 0) return ""

    // Rimuovi i duplicati
    const uniqueSources = [...new Set(sources)]

    if (uniqueSources.length <= 2) {
      return uniqueSources.join(", ")
    } else {
      return `${uniqueSources[0]}, ${uniqueSources[1]} e altri ${uniqueSources.length - 2}`
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Lista della Spesa
              </CardTitle>
              <CardDescription>Gestisci gli articoli da acquistare per i tuoi pasti</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{progress}%</div>
              <div className="text-xs text-muted-foreground">
                {checkedItems}/{totalItems} articoli
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="list">Lista</TabsTrigger>
              <TabsTrigger value="add">Aggiungi</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <div className="grid grid-cols-3 gap-2 w-full">
                <Select
                  value={daysToInclude.toString()}
                  onValueChange={(value) => setDaysToInclude(Number.parseInt(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Giorni da includere" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 giorno</SelectItem>
                    <SelectItem value="3">3 giorni</SelectItem>
                    <SelectItem value="5">5 giorni</SelectItem>
                    <SelectItem value="7">7 giorni</SelectItem>
                    <SelectItem value="14">14 giorni</SelectItem>
                  </SelectContent>
                </Select>

                {totalItems > 0 ? (
                  <Button
                    onClick={handleClearList}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 bg-transparent"
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                    Cancella Lista
                  </Button>
                ) : (
                  <div></div> // Placeholder vuoto quando non ci sono elementi
                )}

                <Button
                  onClick={handleGenerateList}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  Genera Lista
                </Button>
              </div>

              {shoppingList.lastUpdated && (
                <div className="text-xs text-muted-foreground text-right">
                  Ultimo aggiornamento: {formatLastUpdated()}
                </div>
              )}

              {totalItems === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <p className="mt-2 text-muted-foreground">
                    La tua lista della spesa è vuota. Genera una nuova lista o aggiungi articoli manualmente.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} className="border rounded-lg overflow-hidden">
                      <div
                        className="flex items-center justify-between p-3 bg-muted cursor-pointer"
                        onClick={() => toggleCategory(category)}
                      >
                        <h3 className="font-medium">{category}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {items.filter((item) => item.checked).length}/{items.length}
                          </span>
                          {expandedCategories[category] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>

                      {expandedCategories[category] && (
                        <div className="divide-y">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className={`p-3 flex items-start gap-3 ${item.checked ? "bg-muted/50" : ""}`}
                            >
                              <Checkbox
                                id={`item-${item.id}`}
                                checked={item.checked}
                                onCheckedChange={(checked) => handleItemCheck(item.id, checked === true)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <Label
                                    htmlFor={`item-${item.id}`}
                                    className={`font-medium ${item.checked ? "line-through text-muted-foreground" : ""}`}
                                  >
                                    {item.name}
                                    {item.quantity && (
                                      <span className="ml-1 font-normal text-muted-foreground">({item.quantity})</span>
                                    )}
                                  </Label>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveItem(item.id, item.name)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                                  </Button>
                                </div>
                                {item.mealSources && item.mealSources.length > 0 && (
                                  <div className="mt-1 text-xs text-muted-foreground">
                                    {formatMealSources(item.mealSources)}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="item-name">Nome articolo</Label>
                  <Input
                    id="item-name"
                    placeholder="Es. Mele"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="item-quantity">Quantità (opzionale)</Label>
                  <Input
                    id="item-quantity"
                    placeholder="Es. 500g"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="item-category">Categoria (opzionale)</Label>
                  <Select value={newItemCategory} onValueChange={setNewItemCategory}>
                    <SelectTrigger id="item-category">
                      <SelectValue placeholder="Seleziona una categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Frutta e Verdura">Frutta e Verdura</SelectItem>
                      <SelectItem value="Carne e Pesce">Carne e Pesce</SelectItem>
                      <SelectItem value="Latticini e Uova">Latticini e Uova</SelectItem>
                      <SelectItem value="Cereali e Pasta">Cereali e Pasta</SelectItem>
                      <SelectItem value="Legumi e Frutta Secca">Legumi e Frutta Secca</SelectItem>
                      <SelectItem value="Condimenti e Spezie">Condimenti e Spezie</SelectItem>
                      <SelectItem value="Bevande">Bevande</SelectItem>
                      <SelectItem value="Integratori">Integratori</SelectItem>
                      <SelectItem value="Altro">Altro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleAddItem} className="w-full flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Aggiungi Articolo
                </Button>
              </div>

              <div className="bg-muted p-4 rounded-lg flex gap-3">
                <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium">Suggerimento</p>
                  <p>
                    Puoi aggiungere articoli manualmente qui o generare automaticamente una lista basata sui tuoi pasti
                    pianificati.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog di conferma per cancellare la lista */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancellare la lista della spesa?</AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione rimuoverà tutti gli articoli dalla tua lista della spesa. Questa operazione non può essere
              annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClearList} className="bg-destructive text-destructive-foreground">
              Cancella lista
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

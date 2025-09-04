// Interfaccia per gli elementi della lista della spesa
export interface ShoppingItem {
  id: string
  name: string
  quantity?: string
  parsedQuantity?: {
    value: number
    unit: string
  }
  category?: string
  checked: boolean
  mealSources: string[] // Da quali pasti proviene questo ingrediente
}

// Interfaccia per la lista della spesa completa
export interface ShoppingList {
  items: ShoppingItem[]
  lastUpdated: string
}

// Funzione per estrarre gli ingredienti dai pasti
export function extractIngredientsFromMeals(userData: any, days = 7): ShoppingItem[] {
  if (!userData || !userData.days) return []

  const items: Map<string, ShoppingItem> = new Map()
  const today = new Date()
  const daysOfWeek = ["lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato", "domenica"]

  // Determina il giorno della settimana corrente (0 = lunedì, 6 = domenica)
  const currentDayIndex = (today.getDay() + 6) % 7 // Converte da 0=domenica a 0=lunedì

  // Debug log
  console.log("Estrazione ingredienti per", days, "giorni a partire da", daysOfWeek[currentDayIndex])

  // Processa i giorni richiesti
  for (let i = 0; i < days; i++) {
    const dayIndex = (currentDayIndex + i) % 7
    const dayName = daysOfWeek[dayIndex]
    const dayData = userData.days[dayName]

    if (dayData && dayData.meals) {
      // Per ogni pasto del giorno
      Object.entries(dayData.meals).forEach(([mealId, mealData]: [string, any]) => {
        if (mealData.foods && Array.isArray(mealData.foods)) {
          // Per ogni alimento nel pasto
          mealData.foods.forEach((food: string) => {
            // Normalizza e pulisci il nome dell'alimento
            const cleanedFood = normalizeIngredient(food)
            if (!cleanedFood) return

            // Estrai quantità e nome
            const { name, quantity, parsedQuantity } = extractQuantityAndName(cleanedFood)

            // Crea un ID univoco basato sul nome normalizzato
            const itemId = name.toLowerCase().replace(/\s+/g, "_")

            // Debug log per tracciare l'estrazione
            console.log(`Estratto: "${name}" (${quantity || "no qty"}) da ${dayName} - ${mealData.name}`)

            // Aggiungi o aggiorna l'elemento nella mappa
            if (items.has(itemId)) {
              const existingItem = items.get(itemId)!

              // Aggiungi la fonte del pasto se non è già presente
              const mealSource = `${dayName} - ${mealData.name}`
              if (!existingItem.mealSources.includes(mealSource)) {
                existingItem.mealSources.push(mealSource)
              }

              // Somma le quantità se possibile
              if (
                parsedQuantity &&
                existingItem.parsedQuantity &&
                parsedQuantity.unit === existingItem.parsedQuantity.unit
              ) {
                // Se le unità sono compatibili, somma i valori
                existingItem.parsedQuantity.value += parsedQuantity.value
                // Aggiorna la stringa della quantità
                existingItem.quantity = `${existingItem.parsedQuantity.value}${existingItem.parsedQuantity.unit}`

                // Debug log per la somma
                console.log(`Somma quantità per "${name}": nuovo totale = ${existingItem.quantity}`)
              } else if (quantity && !existingItem.quantity) {
                // Se l'elemento esistente non ha quantità ma il nuovo sì
                existingItem.quantity = quantity
                existingItem.parsedQuantity = parsedQuantity
              } else if (quantity && existingItem.quantity && (!existingItem.parsedQuantity || !parsedQuantity)) {
                // Se non possiamo sommare, concateniamo le quantità
                existingItem.quantity = `${existingItem.quantity} + ${quantity}`
              }
            } else {
              // Crea un nuovo elemento
              const newItem: ShoppingItem = {
                id: itemId,
                name,
                quantity,
                parsedQuantity,
                category: guessCategory(name),
                checked: false,
                mealSources: [`${dayName} - ${mealData.name}`],
              }

              items.set(itemId, newItem)
              console.log(`Nuovo item: "${name}" (${quantity || "no qty"})`)
            }
          })
        }
      })
    }
  }

  // Converti la mappa in array e ordina per categoria
  return Array.from(items.values()).sort((a, b) => {
    if (a.category === b.category) {
      return a.name.localeCompare(b.name)
    }
    return (a.category || "").localeCompare(b.category || "")
  })
}

// Funzione per normalizzare un ingrediente
function normalizeIngredient(ingredient: string): string {
  // Rimuovi spazi extra e converti in minuscolo
  return ingredient.trim()
}

// Funzione per estrarre quantità e nome da un ingrediente
function extractQuantityAndName(ingredient: string): {
  name: string
  quantity?: string
  parsedQuantity?: { value: number; unit: string }
} {
  // Regex migliorata per trovare quantità all'inizio dell'ingrediente
  // Esempi: "2 uova", "200g farina", "1/2 tazza di latte", "150g petto di pollo"
  const quantityRegex =
    /^(\d+(?:[.,]\d+)?(?:\s*[xX])?\s*(?:g|kg|ml|l|tazza|cucchiaio|cucchiaino|pz|pezzo|pezzi)?\s*(?:di)?)/i

  const match = ingredient.match(quantityRegex)

  if (match) {
    const quantity = match[0].trim()
    const name = ingredient.substring(match[0].length).trim()

    // Prova a estrarre il valore numerico e l'unità di misura
    const parsedQuantity = parseQuantity(quantity)

    // Debug log per l'estrazione
    console.log(`Estratto da "${ingredient}": quantità = "${quantity}", nome = "${name}"`)
    if (parsedQuantity) {
      console.log(`Parsed: valore = ${parsedQuantity.value}, unità = "${parsedQuantity.unit}"`)
    }

    return { name, quantity, parsedQuantity }
  }

  return { name: ingredient }
}

// Funzione per analizzare la quantità e separare valore e unità
function parseQuantity(quantityStr: string): { value: number; unit: string } | undefined {
  // Regex migliorata per estrarre il valore numerico
  const valueRegex = /^(\d+(?:[.,]\d+)?)/
  const valueMatch = quantityStr.match(valueRegex)

  if (!valueMatch) return undefined

  // Converti il valore in numero
  const valueStr = valueMatch[0].replace(",", ".")
  const value = Number.parseFloat(valueStr)

  if (isNaN(value)) return undefined

  // Estrai l'unità di misura
  const unitStr = quantityStr.substring(valueMatch[0].length).trim()

  // Normalizza l'unità di misura
  let unit = ""

  if (unitStr) {
    // Rimuovi "di" alla fine se presente
    const cleanUnit = unitStr.replace(/\s+di$/i, "").trim()

    // Mappa delle unità comuni
    const unitMap: Record<string, string> = {
      g: "g",
      gr: "g",
      grammi: "g",
      grammo: "g",
      kg: "kg",
      kilo: "kg",
      chilo: "kg",
      ml: "ml",
      millilitri: "ml",
      l: "l",
      litro: "l",
      litri: "l",
      tazza: "tazza",
      tazze: "tazza",
      cucchiaio: "cucchiaio",
      cucchiai: "cucchiaio",
      cucchiaino: "cucchiaino",
      cucchiaini: "cucchiaino",
      pz: "pz",
      pezzo: "pz",
      pezzi: "pz",
    }

    // Cerca l'unità nella mappa
    for (const [key, mappedUnit] of Object.entries(unitMap)) {
      if (cleanUnit.toLowerCase().includes(key.toLowerCase())) {
        unit = mappedUnit
        break
      }
    }

    // Se non troviamo un'unità specifica, usa l'unità originale
    if (!unit && cleanUnit) {
      unit = cleanUnit
    }
  }

  return { value, unit }
}

// Funzione per indovinare la categoria di un ingrediente
function guessCategory(name: string): string {
  name = name.toLowerCase()

  // Categorie comuni
  const categories: Record<string, string[]> = {
    "Frutta e Verdura": [
      "mela",
      "banana",
      "pera",
      "arancia",
      "limone",
      "fragola",
      "frutti di bosco",
      "frutto",
      "frutta",
      "insalata",
      "pomodor",
      "carota",
      "zucchina",
      "melanzana",
      "peperone",
      "cipolla",
      "aglio",
      "patata",
      "patate",
      "verdur",
      "lattuga",
      "spinaci",
      "rucola",
      "broccoli",
      "cavolfiore",
      "zucca",
    ],
    "Carne e Pesce": [
      "pollo",
      "tacchino",
      "manzo",
      "vitello",
      "maiale",
      "salmone",
      "tonno",
      "merluzzo",
      "pesce",
      "carne",
      "bistecca",
      "petto",
      "coscia",
      "filetto",
      "hamburger",
      "polpette",
    ],
    "Latticini e Uova": [
      "latte",
      "yogurt",
      "formaggio",
      "mozzarella",
      "parmigiano",
      "ricotta",
      "burro",
      "uova",
      "uovo",
      "albume",
      "tuorlo",
      "panna",
    ],
    "Cereali e Pasta": [
      "pane",
      "pasta",
      "riso",
      "farina",
      "avena",
      "cereali",
      "muesli",
      "granola",
      "quinoa",
      "couscous",
      "orzo",
      "farro",
      "mais",
      "tortilla",
    ],
    "Legumi e Frutta Secca": [
      "fagioli",
      "ceci",
      "lenticchie",
      "piselli",
      "soia",
      "tofu",
      "mandorle",
      "noci",
      "nocciole",
      "pistacchi",
      "arachidi",
      "frutta secca",
      "semi",
    ],
    "Condimenti e Spezie": [
      "olio",
      "aceto",
      "sale",
      "pepe",
      "zucchero",
      "miele",
      "sciroppo",
      "salsa",
      "maionese",
      "ketchup",
      "senape",
      "spezie",
      "erbe",
      "basilico",
      "prezzemolo",
      "rosmarino",
      "origano",
    ],
    Bevande: ["acqua", "succo", "tè", "caffè", "vino", "birra", "bevanda", "bibita"],
    Integratori: ["proteine", "whey", "protein", "creatina", "bcaa", "aminoacidi", "integratore"],
  }

  // Cerca corrispondenze nelle categorie
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some((keyword) => name.includes(keyword))) {
      return category
    }
  }

  // Categoria predefinita
  return "Altro"
}

// Funzione per salvare la lista della spesa nel localStorage
export function saveShoppingList(userId: string, list: ShoppingList): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(`shopping_list_${userId}`, JSON.stringify(list))
  } catch (error) {
    console.error("Errore nel salvare la lista della spesa:", error)
  }
}

// Funzione per caricare la lista della spesa dal localStorage
export function loadShoppingList(userId: string): ShoppingList {
  if (typeof window === "undefined") {
    return { items: [], lastUpdated: new Date().toISOString() }
  }

  try {
    const savedList = localStorage.getItem(`shopping_list_${userId}`)
    if (savedList) {
      return JSON.parse(savedList)
    }
  } catch (error) {
    console.error("Errore nel caricare la lista della spesa:", error)
  }

  return { items: [], lastUpdated: new Date().toISOString() }
}

// Funzione per aggiornare lo stato di un elemento della lista
export function updateShoppingItemStatus(list: ShoppingList, itemId: string, checked: boolean): ShoppingList {
  const updatedItems = list.items.map((item) => (item.id === itemId ? { ...item, checked } : item))

  return {
    items: updatedItems,
    lastUpdated: new Date().toISOString(),
  }
}

// Funzione per aggiungere un elemento personalizzato alla lista
export function addCustomShoppingItem(
  list: ShoppingList,
  name: string,
  quantity?: string,
  category?: string,
): ShoppingList {
  const itemId = name.toLowerCase().replace(/\s+/g, "_")
  const parsedQuantity = quantity ? parseQuantity(quantity) : undefined

  // Verifica se l'elemento esiste già
  const existingItem = list.items.find((item) => item.id === itemId)
  if (existingItem) {
    // Se l'elemento esiste e ha una quantità compatibile, aggiornala
    if (parsedQuantity && existingItem.parsedQuantity && parsedQuantity.unit === existingItem.parsedQuantity.unit) {
      existingItem.parsedQuantity.value += parsedQuantity.value
      existingItem.quantity = `${existingItem.parsedQuantity.value}${existingItem.parsedQuantity.unit}`

      return {
        items: [...list.items],
        lastUpdated: new Date().toISOString(),
      }
    }

    // Altrimenti, non fare nulla
    return list
  }

  // Aggiungi il nuovo elemento
  return {
    items: [
      ...list.items,
      {
        id: itemId,
        name,
        quantity,
        parsedQuantity,
        category: category || guessCategory(name),
        checked: false,
        mealSources: ["Aggiunto manualmente"],
      },
    ],
    lastUpdated: new Date().toISOString(),
  }
}

// Funzione per rimuovere un elemento dalla lista
export function removeShoppingItem(list: ShoppingList, itemId: string): ShoppingList {
  return {
    items: list.items.filter((item) => item.id !== itemId),
    lastUpdated: new Date().toISOString(),
  }
}

// Funzione per generare una nuova lista della spesa
export function generateShoppingList(userData: any, days = 7): ShoppingList {
  return {
    items: extractIngredientsFromMeals(userData, days),
    lastUpdated: new Date().toISOString(),
  }
}

// Funzione per unire una lista esistente con una nuova lista generata
export function mergeShoppingLists(existingList: ShoppingList, newList: ShoppingList): ShoppingList {
  // Crea una mappa degli elementi esistenti per un accesso rapido
  const existingItemsMap = new Map(existingList.items.map((item) => [item.id, item]))

  // Unisci le liste mantenendo lo stato di spunta degli elementi esistenti
  const mergedItems = newList.items.map((newItem) => {
    const existingItem = existingItemsMap.get(newItem.id)
    if (existingItem) {
      // Mantieni lo stato di spunta e unisci le fonti dei pasti
      const mealSources = [...new Set([...existingItem.mealSources, ...newItem.mealSources])]

      // Gestisci le quantità
      let quantity = newItem.quantity
      let parsedQuantity = newItem.parsedQuantity

      if (
        newItem.parsedQuantity &&
        existingItem.parsedQuantity &&
        newItem.parsedQuantity.unit === existingItem.parsedQuantity.unit
      ) {
        // Se le unità sono compatibili, usa la quantità del nuovo item
        // poiché dovrebbe già contenere la somma corretta
        parsedQuantity = newItem.parsedQuantity
        quantity = newItem.quantity
      }

      return {
        ...newItem,
        checked: existingItem.checked,
        mealSources,
        quantity,
        parsedQuantity,
      }
    }
    return newItem
  })

  // Aggiungi elementi personalizzati che potrebbero non essere nella nuova lista
  existingList.items.forEach((existingItem) => {
    if (
      existingItem.mealSources.includes("Aggiunto manualmente") &&
      !mergedItems.some((item) => item.id === existingItem.id)
    ) {
      mergedItems.push(existingItem)
    }
  })

  return {
    items: mergedItems,
    lastUpdated: new Date().toISOString(),
  }
}

// Funzione per cancellare l'intera lista della spesa
export function clearShoppingList(): ShoppingList {
  return {
    items: [],
    lastUpdated: new Date().toISOString(),
  }
}

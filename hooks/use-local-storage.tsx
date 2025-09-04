"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Stato per memorizzare il valore
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isInitialized, setIsInitialized] = useState(false)

  // Inizializza lo stato con il valore da localStorage
  useEffect(() => {
    // Ottieni il valore da localStorage
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key)
        // Analizza il valore memorizzato o restituisci initialValue
        setStoredValue(item ? JSON.parse(item) : initialValue)
      } catch (error) {
        console.log(error)
        setStoredValue(initialValue)
      }
      setIsInitialized(true)
    }
  }, [key, initialValue])

  // Funzione per aggiornare il valore in localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Consenti al valore di essere una funzione
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Salva lo stato
      setStoredValue(valueToStore)
      // Salva in localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue, isInitialized] as const
}

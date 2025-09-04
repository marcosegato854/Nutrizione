"use client"

import { useEffect } from "react"

interface PageTitleProps {
  title: string
}

export function PageTitle({ title }: PageTitleProps) {
  useEffect(() => {
    // Aggiorna il titolo della pagina
    document.title = title
  }, [title])

  // Questo componente non renderizza nulla nell'interfaccia
  return null
}

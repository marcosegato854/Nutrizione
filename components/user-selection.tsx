"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

interface UserSelectionProps {
  onUserSelected: (user: string) => void
}

export default function UserSelection({ onUserSelected }: UserSelectionProps) {
  const handleSelectUser = (user: string) => {
    onUserSelected(user)
  }

  return (
    <div className="container max-w-md lg:max-w-lg mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Benvenuto</CardTitle>
          <CardDescription className="text-center">
            Seleziona il tuo profilo per visualizzare il tuo piano alimentare
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            size="lg"
            className="h-20 text-xl bg-blue-400 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => handleSelectUser("MARCO")}
          >
            MARCO
          </Button>
          <Button
            size="lg"
            className="h-20 text-xl bg-pink-400 hover:bg-pink-500 dark:bg-pink-600 dark:hover:bg-pink-700"
            onClick={() => handleSelectUser("GEMMA")}
          >
            GEMMA
          </Button>
          <Button
            size="lg"
            className="h-20 text-xl bg-green-400 hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700"
            onClick={() => handleSelectUser("GEMMA_ESTATE")}
          >
            GEMMA ESTATE
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

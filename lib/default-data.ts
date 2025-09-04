export const defaultMealData = {
  MARCO: {
    trainingDays: ["lunedi", "mercoledi", "venerdi"],
    macros: {
      training: {
        protein: 180,
        carbs: 250,
        fat: 60,
        calories: 2260,
      },
      rest: {
        protein: 160,
        carbs: 200,
        fat: 55,
        calories: 1935,
      },
    },
    days: {
      lunedi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["2 uova intere", "30g avena", "200ml latte parzialmente scremato", "1 frutto a scelta"],
            macros: {
              protein: 25,
              carbs: 40,
              fat: 15,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["30g frutta secca mista", "1 yogurt greco"],
            macros: {
              protein: 15,
              carbs: 10,
              fat: 15,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "150g petto di pollo",
              "80g riso (peso a crudo)",
              "Verdure a volontà",
              "10ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 40,
              carbs: 60,
              fat: 15,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["1 banana", "30g whey protein"],
            macros: {
              protein: 30,
              carbs: 25,
              fat: 2,
            },
          },
          cena: {
            name: "Cena",
            foods: ["150g salmone", "200g patate dolci", "Insalata mista", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 35,
              carbs: 40,
              fat: 15,
            },
          },
        },
      },
      martedi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["200g yogurt greco", "30g muesli", "1 cucchiaio miele"],
            macros: {
              protein: 20,
              carbs: 35,
              fat: 5,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 mela", "20g mandorle"],
            macros: {
              protein: 5,
              carbs: 15,
              fat: 10,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "130g tonno al naturale",
              "70g pasta integrale (peso a crudo)",
              "Pomodorini e verdure",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 35,
              carbs: 50,
              fat: 10,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["1 frutto a scelta", "20g frutta secca"],
            macros: {
              protein: 5,
              carbs: 20,
              fat: 10,
            },
          },
          cena: {
            name: "Cena",
            foods: ["150g petto di tacchino", "Insalata mista", "50g pane integrale", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 40,
              carbs: 25,
              fat: 10,
            },
          },
        },
      },
      mercoledi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["3 albumi + 1 uovo intero", "40g fiocchi d'avena", "1 frutto a scelta"],
            macros: {
              protein: 22,
              carbs: 35,
              fat: 10,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 yogurt greco", "15g miele", "10g noci"],
            macros: {
              protein: 12,
              carbs: 20,
              fat: 8,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "150g petto di pollo",
              "70g riso integrale (peso a crudo)",
              "Verdure grigliate",
              "10ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 40,
              carbs: 55,
              fat: 15,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["30g whey protein", "1 banana"],
            macros: {
              protein: 30,
              carbs: 25,
              fat: 2,
            },
          },
          cena: {
            name: "Cena",
            foods: ["150g merluzzo", "200g patate al forno", "Verdure a volontà", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 35,
              carbs: 40,
              fat: 10,
            },
          },
        },
      },
      giovedi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["200g yogurt greco", "30g granola", "1 cucchiaio miele"],
            macros: {
              protein: 20,
              carbs: 35,
              fat: 8,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 pera", "20g noci"],
            macros: {
              protein: 5,
              carbs: 15,
              fat: 12,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "120g tonno al naturale",
              "60g quinoa (peso a crudo)",
              "Insalata mista",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 30,
              carbs: 40,
              fat: 10,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["1 mela", "20g burro di arachidi"],
            macros: {
              protein: 6,
              carbs: 20,
              fat: 10,
            },
          },
          cena: {
            name: "Cena",
            foods: ["150g tofu", "200g verdure saltate", "50g riso integrale", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 25,
              carbs: 30,
              fat: 15,
            },
          },
        },
      },
      venerdi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["2 uova intere", "2 fette di pane integrale", "1/4 avocado"],
            macros: {
              protein: 20,
              carbs: 30,
              fat: 15,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 yogurt greco", "1 cucchiaio miele", "10g semi di chia"],
            macros: {
              protein: 12,
              carbs: 20,
              fat: 5,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "150g petto di pollo",
              "70g pasta integrale (peso a crudo)",
              "Verdure a volontà",
              "10ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 40,
              carbs: 55,
              fat: 15,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["30g whey protein", "1 banana"],
            macros: {
              protein: 30,
              carbs: 25,
              fat: 2,
            },
          },
          cena: {
            name: "Cena",
            foods: ["150g salmone", "Insalata mista", "200g patate dolci", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 35,
              carbs: 40,
              fat: 15,
            },
          },
        },
      },
      sabato: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["200g yogurt greco", "30g muesli", "1 cucchiaio miele", "1 frutto a scelta"],
            macros: {
              protein: 20,
              carbs: 40,
              fat: 5,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 mela", "20g mandorle"],
            macros: {
              protein: 5,
              carbs: 15,
              fat: 10,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "120g ceci (peso a crudo)",
              "50g riso integrale (peso a crudo)",
              "Verdure a volontà",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 25,
              carbs: 60,
              fat: 10,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["1 frutto a scelta", "20g frutta secca"],
            macros: {
              protein: 5,
              carbs: 20,
              fat: 10,
            },
          },
          cena: {
            name: "Cena",
            foods: ["150g petto di tacchino", "Insalata mista", "50g pane integrale", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 40,
              carbs: 25,
              fat: 10,
            },
          },
        },
      },
      domenica: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["3 pancake proteici", "1 cucchiaio sciroppo d'acero", "100g frutti di bosco"],
            macros: {
              protein: 20,
              carbs: 35,
              fat: 10,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 yogurt greco", "10g miele", "10g noci"],
            macros: {
              protein: 12,
              carbs: 15,
              fat: 8,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: ["150g manzo magro", "200g patate al forno", "Verdure grigliate", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 40,
              carbs: 40,
              fat: 15,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["1 frutto a scelta", "20g cioccolato fondente"],
            macros: {
              protein: 2,
              carbs: 25,
              fat: 8,
            },
          },
          cena: {
            name: "Cena",
            foods: ["150g pesce bianco", "Insalata mista", "50g quinoa", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 35,
              carbs: 25,
              fat: 10,
            },
          },
        },
      },
    },
  },
  GEMMA: {
    trainingDays: ["martedi", "giovedi", "sabato"],
    macros: {
      training: {
        protein: 120,
        carbs: 180,
        fat: 45,
        calories: 1605,
      },
      rest: {
        protein: 100,
        carbs: 150,
        fat: 40,
        calories: 1360,
      },
    },
    days: {
      lunedi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["150g yogurt greco", "20g fiocchi d'avena", "1 cucchiaino miele", "Frutti di bosco"],
            macros: {
              protein: 15,
              carbs: 25,
              fat: 5,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 frutto a scelta", "10g frutta secca"],
            macros: {
              protein: 3,
              carbs: 15,
              fat: 5,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "120g petto di pollo",
              "60g riso integrale (peso a crudo)",
              "Verdure a volontà",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 30,
              carbs: 40,
              fat: 10,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["20g whey protein", "1 frutto a scelta"],
            macros: {
              protein: 20,
              carbs: 15,
              fat: 1,
            },
          },
          cena: {
            name: "Cena",
            foods: ["120g merluzzo", "150g patate al forno", "Verdure grigliate", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 25,
              carbs: 30,
              fat: 10,
            },
          },
        },
      },
      martedi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["2 fette di pane integrale", "10g burro di arachidi", "1 frutto a scelta"],
            macros: {
              protein: 10,
              carbs: 30,
              fat: 8,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 yogurt magro", "15g noci"],
            macros: {
              protein: 8,
              carbs: 10,
              fat: 8,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: ["100g tofu", "60g quinoa (peso a crudo)", "Verdure miste", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 25,
              carbs: 35,
              fat: 12,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["1 banana", "20g whey protein"],
            macros: {
              protein: 20,
              carbs: 25,
              fat: 1,
            },
          },
          cena: {
            name: "Cena",
            foods: ["120g salmone", "Insalata mista", "40g pane integrale", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 30,
              carbs: 20,
              fat: 15,
            },
          },
        },
      },
      mercoledi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["150g yogurt greco", "20g muesli", "1 cucchiaino miele", "100g frutti di bosco"],
            macros: {
              protein: 15,
              carbs: 25,
              fat: 5,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 mela", "10g mandorle"],
            macros: {
              protein: 3,
              carbs: 15,
              fat: 5,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "100g lenticchie (peso a crudo)",
              "50g riso integrale (peso a crudo)",
              "Verdure a volontà",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 20,
              carbs: 50,
              fat: 10,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["1 frutto a scelta", "10g frutta secca"],
            macros: {
              protein: 3,
              carbs: 15,
              fat: 5,
            },
          },
          cena: {
            name: "Cena",
            foods: ["120g petto di tacchino", "Insalata mista", "40g pane integrale", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 30,
              carbs: 20,
              fat: 10,
            },
          },
        },
      },
      giovedi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["2 uova", "1 fetta di pane integrale", "1/4 avocado"],
            macros: {
              protein: 15,
              carbs: 15,
              fat: 12,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 yogurt greco", "1 cucchiaino miele", "5g semi di chia"],
            macros: {
              protein: 10,
              carbs: 10,
              fat: 3,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "120g petto di pollo",
              "60g pasta integrale (peso a crudo)",
              "Verdure a volontà",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 30,
              carbs: 40,
              fat: 10,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["20g whey protein", "1 banana"],
            macros: {
              protein: 20,
              carbs: 25,
              fat: 1,
            },
          },
          cena: {
            name: "Cena",
            foods: ["120g pesce bianco", "Verdure grigliate", "150g patate dolci", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 25,
              carbs: 30,
              fat: 10,
            },
          },
        },
      },
      venerdi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["150g yogurt greco", "20g granola", "1 cucchiaino miele", "100g frutti di bosco"],
            macros: {
              protein: 15,
              carbs: 25,
              fat: 5,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 pera", "10g noci"],
            macros: {
              protein: 3,
              carbs: 15,
              fat: 5,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "100g tonno al naturale",
              "50g riso integrale (peso a crudo)",
              "Verdure a volontà",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 25,
              carbs: 35,
              fat: 10,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["1 frutto a scelta", "10g frutta secca"],
            macros: {
              protein: 3,
              carbs: 15,
              fat: 5,
            },
          },
          cena: {
            name: "Cena",
            foods: ["120g tofu", "Verdure saltate", "40g quinoa", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 20,
              carbs: 25,
              fat: 10,
            },
          },
        },
      },
      sabato: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["2 pancake proteici", "1 cucchiaino sciroppo d'acero", "100g frutti di bosco"],
            macros: {
              protein: 15,
              carbs: 25,
              fat: 5,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 yogurt greco", "5g miele", "5g noci"],
            macros: {
              protein: 10,
              carbs: 10,
              fat: 5,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "120g petto di pollo",
              "60g quinoa (peso a crudo)",
              "Verdure grigliate",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 30,
              carbs: 35,
              fat: 10,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["20g whey protein", "1 banana"],
            macros: {
              protein: 20,
              carbs: 25,
              fat: 1,
            },
          },
          cena: {
            name: "Cena",
            foods: ["120g salmone", "Insalata mista", "150g patate dolci", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 25,
              carbs: 30,
              fat: 15,
            },
          },
        },
      },
      domenica: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["150g yogurt greco", "20g muesli", "1 cucchiaino miele", "1 frutto a scelta"],
            macros: {
              protein: 15,
              carbs: 25,
              fat: 5,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 mela", "10g mandorle"],
            macros: {
              protein: 3,
              carbs: 15,
              fat: 5,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "100g ceci (peso a crudo)",
              "40g riso integrale (peso a crudo)",
              "Verdure a volontà",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 20,
              carbs: 40,
              fat: 10,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["1 frutto a scelta", "10g frutta secca"],
            macros: {
              protein: 3,
              carbs: 15,
              fat: 5,
            },
          },
          cena: {
            name: "Cena",
            foods: ["120g petto di tacchino", "Insalata mista", "40g pane integrale", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 30,
              carbs: 20,
              fat: 10,
            },
          },
        },
      },
    },
  },
  GEMMA_ESTATE: {
    trainingDays: ["lunedi", "mercoledi", "venerdi", "domenica"],
    macros: {
      training: {
        protein: 110,
        carbs: 150,
        fat: 40,
        calories: 1360,
      },
      rest: {
        protein: 90,
        carbs: 120,
        fat: 35,
        calories: 1115,
      },
    },
    days: {
      lunedi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["150g yogurt greco 0%", "100g frutti di bosco", "10g miele", "5g semi di chia"],
            macros: {
              protein: 15,
              carbs: 20,
              fat: 3,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 pesca", "10g mandorle"],
            macros: {
              protein: 3,
              carbs: 12,
              fat: 5,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "100g petto di pollo",
              "150g zucchine grigliate",
              "50g quinoa (peso a crudo)",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 25,
              carbs: 30,
              fat: 8,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["20g whey protein", "1 kiwi"],
            macros: {
              protein: 20,
              carbs: 12,
              fat: 1,
            },
          },
          cena: {
            name: "Cena",
            foods: ["120g branzino", "200g insalata mista", "100g pomodorini", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 25,
              carbs: 8,
              fat: 10,
            },
          },
        },
      },
      martedi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["2 albumi + 1 uovo intero", "100g melone", "5g noci"],
            macros: {
              protein: 12,
              carbs: 15,
              fat: 8,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["150g anguria", "10g semi di girasole"],
            macros: {
              protein: 3,
              carbs: 10,
              fat: 5,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "80g tonno al naturale",
              "200g insalata di cetrioli e pomodori",
              "30g pane integrale",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 20,
              carbs: 20,
              fat: 8,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["1 mela verde", "10g mandorle"],
            macros: {
              protein: 3,
              carbs: 15,
              fat: 5,
            },
          },
          cena: {
            name: "Cena",
            foods: [
              "100g petto di tacchino",
              "150g verdure grigliate",
              "50g patate dolci",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 25,
              carbs: 15,
              fat: 8,
            },
          },
        },
      },
      mercoledi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["150g yogurt greco 0%", "80g fragole", "10g granola senza zucchero"],
            macros: {
              protein: 15,
              carbs: 18,
              fat: 3,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 prugna", "15g anacardi"],
            macros: {
              protein: 4,
              carbs: 10,
              fat: 6,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "100g gamberetti",
              "200g zucchine e melanzane grigliate",
              "40g riso integrale (peso a crudo)",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 22,
              carbs: 25,
              fat: 8,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["100g cetrioli", "20g hummus"],
            macros: {
              protein: 4,
              carbs: 8,
              fat: 4,
            },
          },
          cena: {
            name: "Cena",
            foods: ["120g orata", "150g spinaci saltati", "100g pomodori", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 25,
              carbs: 8,
              fat: 10,
            },
          },
        },
      },
      giovedi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["200g smoothie (spinaci, banana, acqua)", "15g proteine vegetali in polvere"],
            macros: {
              protein: 15,
              carbs: 20,
              fat: 2,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 pera", "10g noci"],
            macros: {
              protein: 3,
              carbs: 12,
              fat: 6,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "80g petto di pollo",
              "200g insalata di rucola e pomodorini",
              "30g farro (peso a crudo)",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 20,
              carbs: 22,
              fat: 8,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["100g cetrioli", "20g hummus"],
            macros: {
              protein: 4,
              carbs: 8,
              fat: 4,
            },
          },
          cena: {
            name: "Cena",
            foods: ["100g sogliola", "200g verdure miste al vapore", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 20,
              carbs: 10,
              fat: 8,
            },
          },
        },
      },
      venerdi: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["150g yogurt greco 0%", "100g mirtilli", "5g semi di lino"],
            macros: {
              protein: 15,
              carbs: 15,
              fat: 4,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 albicocca", "15g pistacchi"],
            macros: {
              protein: 4,
              carbs: 8,
              fat: 6,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "100g salmone",
              "150g asparagi grigliati",
              "40g quinoa (peso a crudo)",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 25,
              carbs: 25,
              fat: 12,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["20g whey protein", "100g melone"],
            macros: {
              protein: 20,
              carbs: 10,
              fat: 1,
            },
          },
          cena: {
            name: "Cena",
            foods: ["100g petto di tacchino", "200g insalata verde", "100g peperoni", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 25,
              carbs: 10,
              fat: 8,
            },
          },
        },
      },
      sabato: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["2 albumi + 1 uovo intero", "100g pomodorini", "50g avocado"],
            macros: {
              protein: 12,
              carbs: 8,
              fat: 12,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["150g anguria", "10g semi di zucca"],
            macros: {
              protein: 3,
              carbs: 12,
              fat: 4,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "100g merluzzo",
              "200g verdure grigliate miste",
              "40g riso basmati (peso a crudo)",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 22,
              carbs: 28,
              fat: 8,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["1 pesca", "15g mandorle"],
            macros: {
              protein: 4,
              carbs: 12,
              fat: 6,
            },
          },
          cena: {
            name: "Cena",
            foods: ["120g gamberetti", "200g insalata mista", "100g zucchine", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 25,
              carbs: 8,
              fat: 8,
            },
          },
        },
      },
      domenica: {
        meals: {
          colazione: {
            name: "Colazione",
            foods: ["150g yogurt greco 0%", "100g lamponi", "10g cocco grattugiato"],
            macros: {
              protein: 15,
              carbs: 12,
              fat: 8,
            },
          },
          spuntino_mattina: {
            name: "Spuntino",
            foods: ["1 kiwi", "10g noci del brasile"],
            macros: {
              protein: 3,
              carbs: 10,
              fat: 6,
            },
          },
          pranzo: {
            name: "Pranzo",
            foods: [
              "100g petto di pollo",
              "200g insalata di cetrioli e ravanelli",
              "30g orzo (peso a crudo)",
              "5ml olio extravergine d'oliva",
            ],
            macros: {
              protein: 25,
              carbs: 20,
              fat: 8,
            },
          },
          spuntino_pomeriggio: {
            name: "Spuntino",
            foods: ["20g whey protein", "100g fragole"],
            macros: {
              protein: 20,
              carbs: 8,
              fat: 1,
            },
          },
          cena: {
            name: "Cena",
            foods: ["120g branzino", "150g verdure al vapore", "100g pomodori", "5ml olio extravergine d'oliva"],
            macros: {
              protein: 25,
              carbs: 10,
              fat: 8,
            },
          },
        },
      },
    },
  },
}

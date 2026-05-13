/** Mock data for Bonos / Freespins dashboard */

export const bonosInvalidosTotal = 237

export const bonosInfractoresUnicos = 153

/** ~30 días: 13/04 → 12/05 (serie simulada, eje 0–18) */
export const bonosInvalidosPorDia = [
  { fecha: "13/04", invalidos: 9 },
  { fecha: "15/04", invalidos: 11 },
  { fecha: "17/04", invalidos: 8 },
  { fecha: "19/04", invalidos: 12 },
  { fecha: "21/04", invalidos: 10 },
  { fecha: "23/04", invalidos: 14 },
  { fecha: "25/04", invalidos: 11 },
  { fecha: "27/04", invalidos: 13 },
  { fecha: "29/04", invalidos: 15 },
  { fecha: "01/05", invalidos: 12 },
  { fecha: "03/05", invalidos: 16 },
  { fecha: "05/05", invalidos: 14 },
  { fecha: "07/05", invalidos: 17 },
  { fecha: "09/05", invalidos: 13 },
  { fecha: "11/05", invalidos: 15 },
  { fecha: "12/05", invalidos: 14 },
]

export const bonosInvalidosPorBono = [
  { bono: "OTD 1 Aviamaster", count: 38 },
  { bono: "Ronda Macanuda", count: 32 },
  { bono: "Giros Wolf Story", count: 28 },
  { bono: "Cashback Viernes", count: 24 },
  { bono: "Bienvenida Casino", count: 41 },
  { bono: "Super Liga Spins", count: 19 },
  { bono: "Happy Hour Slots", count: 22 },
]

export const bonosTopDispositivos = [
  { dispositivo: "a8f3c2e91b4d7e0f2a5c8d1e4b7a0c3f6e9d2a5b8c1f4e7d0a3b6c9e2f5a8", usuarios: 11 },
  { dispositivo: "b1e4d7a0c3f6b9e2d5a8c1f4e7b0a3d6c9f2e5b8a1d4c7f0e3b6a9d2c5f8e1", usuarios: 7 },
  { dispositivo: "c4f7e0b3a6d9c2f5e8b1a4d7c0f3e6b9a2d5c8f1e4b7a0d3c6f9e2b5a8d1c4", usuarios: 6 },
  { dispositivo: "d7a0c3f6b9e2d5a8c1f4e7b0a3d6c9f2e5b8a1d4c7f0e3b6a9d2c5f8e1b4a7", usuarios: 6 },
  { dispositivo: "e0b3a6d9c2f5e8b1a4d7c0f3e6b9a2d5c8f1e4b7a0d3c6f9e2b5a8d1c4f7e0b3", usuarios: 5 },
  { dispositivo: "f6b9e2d5a8c1f4e7b0a3d6c9f2e5b8a1d4c7f0e3b6a9d2c5f8e1b4a7d0c3f6b9", usuarios: 5 },
  { dispositivo: "a2d5c8f1e4b7a0d3c6f9e2b5a8d1c4f7e0b3a6d9c2f5e8b1a4d7c0f3e6b9a2d5", usuarios: 4 },
  { dispositivo: "c9f2e5b8a1d4c7f0e3b6a9d2c5f8e1b4a7d0c3f6b9e2d5a8c1f4e7b0a3d6c9f2e5", usuarios: 4 },
  { dispositivo: "e4b7a0d3c6f9e2b5a8d1c4f7e0b3a6d9c2f5e8b1a4d7c0f3e6b9a2d5c8f1e4b7a0", usuarios: 3 },
  { dispositivo: "f1e4b7a0d3c6f9e2b5a8d1c4f7e0b3a6d9c2f5e8b1a4d7c0f3e6b9a2d5c8f1e4b7", usuarios: 3 },
]

export const bonosFiltroOpciones = [
  { value: "todos", label: "Todos" },
  { value: "bienvenida", label: "Bienvenida Casino" },
  { value: "otd", label: "OTD 1 Aviamaster" },
  { value: "ronda", label: "Ronda Macanuda" },
] as const

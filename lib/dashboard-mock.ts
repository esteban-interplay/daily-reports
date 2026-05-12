/** Mock data for executive dashboard demo */

export const reportDateLabel = "12 de mayo de 2026"

export const deactivatedUsers = [
  {
    id: "3094372",
    name: "Jeremy Rigoberto Galo Coto",
    reason: "autoexclusión" as const,
  },
  {
    id: "6723967",
    name: "Raúl Antonio Canales Lainez",
    reason: "autoexclusión" as const,
  },
  {
    id: "6857759",
    name: "Víctor Josué Alvarado Ayala",
    reason: "autoexclusión" as const,
  },
  {
    id: "6957129",
    name: "Daniel Angel Fúnez Zaldívar",
    reason: "autoexclusión" as const,
  },
  {
    id: "7958584",
    name: "Fareth Manuel Gómez Torres",
    reason: "autoexclusión" as const,
  },
  {
    id: "8011223",
    name: "María Elena Portillo Rivas",
    reason: "cuenta_duplicada" as const,
  },
  {
    id: "8120044",
    name: "Carlos Enrique Mejía Dubón",
    reason: "sin_restriccion" as const,
  },
]

export const deactivatedByReason = [
  { motivo: "autoexclusión", count: 15 },
  { motivo: "cuenta_duplicada", count: 13 },
  { motivo: "sin_restriccion", count: 9 },
]

export const sharedDeviceTrend = [
  { fecha: "12/04", grupos: 62, retiro: 48 },
  { fecha: "16/04", grupos: 71, retiro: 52 },
  { fecha: "20/04", grupos: 68, retiro: 55 },
  { fecha: "24/04", grupos: 88, retiro: 61 },
  { fecha: "28/04", grupos: 95, retiro: 58 },
  { fecha: "02/05", grupos: 102, retiro: 64 },
  { fecha: "06/05", grupos: 98, retiro: 70 },
  { fecha: "11/05", grupos: 110, retiro: 76 },
]

export type AlertSummaryCell = {
  key: string
  title: string
  value: number
  suffix: string
  highlight?: boolean
}

export const alertSummary: AlertSummaryCell[] = [
  { key: "frida", title: "Frida detectado", value: 0, suffix: "dispositivos" },
  {
    key: "manip",
    title: "Manipulación detectada",
    value: 20,
    suffix: "dispositivos",
    highlight: true,
  },
  { key: "clone", title: "Aplicación clonada", value: 0, suffix: "dispositivos" },
  { key: "root", title: "Root Apps", value: 0, suffix: "dispositivos" },
  {
    key: "jail",
    title: "Dispositivo jailbreakeado",
    value: 0,
    suffix: "dispositivos",
  },
  { key: "tor", title: "Conexión vía Tor", value: 0, suffix: "dispositivos" },
]

export const usersWithAlerts = [
  {
    usuario: "6239377",
    alerta: "IP fuente de ataques",
    nivel: "Critica" as const,
    dispositivo: "wbtWf…1fGc0",
  },
  {
    usuario: "6018821",
    alerta: "Emulador detectado",
    nivel: "Critica" as const,
    dispositivo: "a9Kp2…mQx88",
  },
  {
    usuario: "5981204",
    alerta: "Manipulación de entorno",
    nivel: "Alta" as const,
    dispositivo: "Lm3Rt…pZz12",
  },
  {
    usuario: "5770093",
    alerta: "Patrón de apuestas atípico",
    nivel: "Media" as const,
    dispositivo: "vBn78…sDdf1",
  },
  {
    usuario: "5402218",
    alerta: "IP fuente de ataques",
    nivel: "Critica" as const,
    dispositivo: "xYz99…kLmn4",
  },
]

export const last30DaysTrend = [
  { dia: "1", total: 42 },
  { dia: "5", total: 38 },
  { dia: "10", total: 51 },
  { dia: "15", total: 47 },
  { dia: "20", total: 55 },
  { dia: "25", total: 49 },
  { dia: "30", total: 44 },
]

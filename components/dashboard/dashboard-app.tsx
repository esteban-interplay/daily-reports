"use client"

import Image from "next/image"
import { useState } from "react"
import { BonosView } from "@/components/dashboard/bonos-view"
import {
  alertSummary,
  deactivatedByReason,
  deactivatedUsers,
  last30DaysTrend,
  reportDateLabel,
  sharedDeviceTrend,
  usersWithAlerts,
} from "@/lib/dashboard-mock"
import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  AlertTriangle,
  BarChart3,
  Gift,
  LayoutGrid,
  Monitor,
  UserRound,
} from "lucide-react"
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts"

type NavId = "usuarios" | "agentes" | "bonos" | "freespins"

const mainNav: { id: Exclude<NavId, "freespins">; label: string; icon: typeof UserRound }[] =
  [
    { id: "usuarios", label: "Usuarios", icon: UserRound },
    { id: "agentes", label: "Agentes", icon: Monitor },
    { id: "bonos", label: "Bonos", icon: Gift },
  ]

function reasonBadgeClass(reason: string) {
  if (reason === "autoexclusión")
    return "bg-amber-500/15 text-amber-800 ring-1 ring-amber-500/40"
  if (reason === "cuenta_duplicada")
    return "bg-sky-500/15 text-sky-900 ring-1 ring-sky-500/35"
  return "bg-slate-500/12 text-slate-700 ring-1 ring-slate-400/35"
}

function levelBadgeClass(nivel: string) {
  if (nivel === "Critica")
    return "bg-red-600 text-white shadow-sm shadow-red-600/25"
  if (nivel === "Alta") return "bg-orange-500 text-white"
  return "bg-slate-600 text-white"
}

export function DashboardApp() {
  const [activeNav, setActiveNav] = useState<NavId>("usuarios")
  const totalDeactivated = 37

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7fa] font-sans text-slate-900">
      <header className="shrink-0 border-b border-slate-200/80 bg-white px-6 py-3">
        <Image
          src="/logo-interplay-tech.svg"
          alt="Interplay Tech"
          width={560}
          height={82}
          className="h-8 w-auto max-w-[min(100%,280px)] md:h-9"
          priority
          unoptimized
        />
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[220px] shrink-0 flex-col gap-6 bg-[#0b1220] px-3 py-5 text-slate-200">
          <div className="px-1">
            <Image
              src="/logo-hondubet.svg"
              alt="Hondubet"
              width={245}
              height={52}
              className="h-auto w-full"
              priority
              unoptimized
            />
          </div>
          <div>
            <p className="mb-2 px-2 text-[10px] font-medium uppercase tracking-widest text-slate-500">
              Dash menu
            </p>
            <nav className="flex flex-col gap-0.5">
              {mainNav.map((item) => {
                const isActive = activeNav === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveNav(item.id)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors",
                      isActive
                        ? "bg-slate-700/80 text-white"
                        : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    )}
                  >
                    <item.icon className="size-4 shrink-0 opacity-90" />
                    {item.label}
                  </button>
                )
              })}
              <div className="mt-0.5 pl-4">
                <button
                  type="button"
                  onClick={() => setActiveNav("freespins")}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md py-1.5 pl-2 pr-2 text-left text-xs transition-colors",
                    activeNav === "freespins"
                      ? "bg-slate-700/80 text-white"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  )}
                >
                  <BarChart3
                    className={cn(
                      "size-3.5 shrink-0",
                      activeNav === "freespins"
                        ? "text-white"
                        : "text-[#5aa7ff]"
                    )}
                  />
                  Freespins
                </button>
              </div>
            </nav>
          </div>
          <div className="mt-auto px-2 text-[10px] leading-relaxed text-slate-600">
            Vista demo · datos simulados
          </div>
        </aside>

        <main className="min-w-0 flex-1 overflow-x-hidden px-6 py-6 lg:px-8">
          <div className="mx-auto max-w-[1400px] space-y-8">
            {activeNav === "agentes" && (
              <section className="rounded-xl border border-slate-200/80 bg-white p-8 shadow-sm">
                <h1 className="text-xl font-bold text-slate-900">Agentes</h1>
                <p className="mt-2 text-sm text-slate-600">
                  Vista en preparación. Selecciona otra sección del menú.
                </p>
              </section>
            )}

            {(activeNav === "bonos" || activeNav === "freespins") && (
              <BonosView />
            )}

            {activeNav === "usuarios" && (
              <>
            {/* —— Bloque 1: Informe desactivaciones —— */}
            <section className="space-y-5">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-[1.65rem]">
                Informe Diario del Área de Riesgos, {reportDateLabel}
              </h1>

              <div className="flex overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
                <div className="w-1 shrink-0 bg-[#1d6fff]" />
                <div className="px-5 py-4">
                  <h2 className="text-base font-semibold text-slate-900">
                    Usuarios desactivados
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-600">
                    Resumen del día anterior con detalle y razones de
                    desactivación.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-600">
                    Usuarios desactivados
                  </p>
                  <div className="mt-2 flex items-start justify-between gap-3">
                    <p className="text-4xl font-bold tabular-nums text-red-600">
                      {totalDeactivated}
                    </p>
                    <span className="flex size-10 items-center justify-center rounded-full bg-red-50 text-red-600 ring-1 ring-red-100">
                      <AlertTriangle className="size-5" strokeWidth={2} />
                    </span>
                  </div>
                </article>
                {[
                  {
                    title: "Usuarios con contingencia en retiros",
                    body: "Pendiente",
                    hint: "Métrica reservada para completar.",
                  },
                  {
                    title: "Usuarios con contingencia en deportivas",
                    body: "Pendiente",
                    hint: "Métrica reservada para completar.",
                  },
                  {
                    title: "Usuarios con contingencia en casino",
                    body: "Pendiente",
                    hint: "Métrica reservada para completar.",
                  },
                ].map((card) => (
                  <article
                    key={card.title}
                    className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm font-medium text-slate-600">
                      {card.title}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-800">
                      {card.body}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">{card.hint}</p>
                  </article>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <article className="flex min-h-[320px] flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Lista de usuarios desactivados
                    </h3>
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                      Tabla
                    </span>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto px-2 py-2">
                    <table className="w-full text-left text-sm">
                      <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur">
                        <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          <th className="px-2 py-2">ID</th>
                          <th className="px-2 py-2">Nombre</th>
                          <th className="px-2 py-2">Razón de desactivación</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {deactivatedUsers.map((row) => (
                          <tr
                            key={row.id}
                            className="text-slate-800 hover:bg-slate-50/80"
                          >
                            <td className="whitespace-nowrap px-2 py-2.5 font-mono text-xs text-slate-600">
                              {row.id}
                            </td>
                            <td className="px-2 py-2.5">{row.name}</td>
                            <td className="px-2 py-2.5">
                              <span
                                className={cn(
                                  "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                                  reasonBadgeClass(row.reason)
                                )}
                              >
                                {row.reason}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>

                <article className="flex min-h-[320px] flex-col rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <h3 className="mb-1 text-sm font-semibold text-slate-900">
                    Usuarios desactivados y motivo
                  </h3>
                  <ChartContainer
                    config={{
                      count: {
                        label: "Usuarios",
                        color: "hsl(210 90% 58%)",
                      },
                    }}
                    className="aspect-auto h-[260px] w-full"
                  >
                    <BarChart
                      data={deactivatedByReason}
                      margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        className="stroke-slate-200"
                      />
                      <XAxis
                        dataKey="motivo"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "hsl(215 16% 42%)", fontSize: 11 }}
                        interval={0}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        width={28}
                        tick={{ fill: "hsl(215 16% 47%)", fontSize: 11 }}
                        domain={[0, 16]}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="count"
                        fill="var(--color-count)"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={48}
                      />
                    </BarChart>
                  </ChartContainer>
                </article>
              </div>

              <article className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Últimos 30 días
                    </h3>
                    <p className="text-xs text-slate-500">
                      Evolución agregada de usuarios desactivados (simulada).
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                    <LayoutGrid className="size-3.5" />
                    Serie
                  </span>
                </div>
                <ChartContainer
                  config={{
                    total: { label: "Total", color: "hsl(217 91% 52%)" },
                  }}
                  className="aspect-auto h-[200px] w-full"
                >
                  <ComposedChart
                    data={last30DaysTrend}
                    margin={{ top: 4, right: 8, left: -12, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="fill30" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="hsl(217 91% 52%)"
                          stopOpacity={0.22}
                        />
                        <stop
                          offset="100%"
                          stopColor="hsl(217 91% 52%)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-slate-200"
                    />
                    <XAxis
                      dataKey="dia"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(215 16% 45%)", fontSize: 11 }}
                      label={{
                        value: "Día del mes",
                        position: "insideBottom",
                        offset: -4,
                        fill: "hsl(215 16% 55%)",
                        fontSize: 10,
                      }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      width={32}
                      tick={{ fill: "hsl(215 16% 45%)", fontSize: 11 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="var(--color-total)"
                      fill="url(#fill30)"
                      strokeWidth={2}
                    />
                  </ComposedChart>
                </ChartContainer>
              </article>
            </section>

            {/* —— Bloque 2: Dispositivos compartidos y alertas —— */}
            <section className="space-y-5 border-t border-slate-200/80 pt-8">
              <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm md:p-5">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900 md:text-base">
                    Usuarios en dispositivos compartidos
                  </h3>
                </div>
                <ChartContainer
                  config={{
                    grupos: {
                      label: "Usuarios en grupos 3+",
                      color: "hsl(330 81% 60%)",
                    },
                    retiro: {
                      label: "Usuarios con retiro",
                      color: "hsl(217 91% 52%)",
                    },
                  }}
                  className="aspect-auto h-[300px] w-full"
                >
                  <ComposedChart
                    data={sharedDeviceTrend}
                    margin={{ top: 8, right: 12, left: -8, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="gradGrupos"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="hsl(330 81% 60%)"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="100%"
                          stopColor="hsl(330 81% 60%)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-slate-200"
                    />
                    <XAxis
                      dataKey="fecha"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(215 16% 42%)", fontSize: 11 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      width={36}
                      domain={[0, 120]}
                      tick={{ fill: "hsl(215 16% 45%)", fontSize: 11 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="grupos"
                      name="grupos"
                      stroke="var(--color-grupos)"
                      fill="url(#gradGrupos)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="retiro"
                      name="retiro"
                      stroke="var(--color-retiro)"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: "var(--color-retiro)" }}
                    />
                    <ChartLegend
                      content={
                        <ChartLegendContent className="justify-end pt-0" />
                      }
                    />
                  </ComposedChart>
                </ChartContainer>
              </article>

              <div className="flex overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
                <div className="w-1 shrink-0 bg-[#1d6fff]" />
                <div className="px-5 py-4">
                  <h2 className="text-base font-semibold text-slate-900">
                    Alertas del día anterior
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-600">
                    Usuarios con señales críticas o sospechosas detectadas por
                    fingerprint.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
                <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm md:p-5">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Resumen de alertas
                    </h3>
                    <button
                      type="button"
                      className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50"
                    >
                      Ver todas
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {alertSummary.map((cell) => (
                      <div
                        key={cell.key}
                        className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 shadow-inner shadow-slate-200/40"
                      >
                        <p className="text-[11px] font-medium leading-snug text-slate-600">
                          {cell.title}
                        </p>
                        <p
                          className={cn(
                            "mt-1.5 text-2xl font-bold tabular-nums",
                            cell.highlight ? "text-red-600" : "text-slate-900"
                          )}
                        >
                          {cell.value}
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-500">
                          {cell.value} {cell.suffix}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="flex min-h-[340px] flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Usuarios con alertas
                    </h3>
                    <button
                      type="button"
                      className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50"
                    >
                      Detalle
                    </button>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto px-2 py-2">
                    <table className="w-full text-left text-sm">
                      <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur">
                        <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          <th className="px-2 py-2">Usuario</th>
                          <th className="px-2 py-2">Alerta</th>
                          <th className="px-2 py-2">Nivel</th>
                          <th className="px-2 py-2">Dispositivo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {usersWithAlerts.map((row) => (
                          <tr
                            key={`${row.usuario}-${row.dispositivo}`}
                            className="text-slate-800 hover:bg-slate-50/80"
                          >
                            <td className="whitespace-nowrap px-2 py-2.5 font-mono text-xs text-slate-600">
                              {row.usuario}
                            </td>
                            <td className="px-2 py-2.5">{row.alerta}</td>
                            <td className="px-2 py-2.5">
                              <span
                                className={cn(
                                  "inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                                  levelBadgeClass(row.nivel)
                                )}
                              >
                                {row.nivel}
                              </span>
                            </td>
                            <td className="px-2 py-2.5 font-mono text-xs text-slate-600">
                              {row.dispositivo}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              </div>
            </section>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

"use client"

import {
  bonosFiltroOpciones,
  bonosInfractoresUnicos,
  bonosInvalidosPorBono,
  bonosInvalidosPorDia,
  bonosInvalidosTotal,
  bonosTopDispositivos,
} from "@/lib/bonos-mock"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
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

const lineColor = "hsl(204 82% 46%)"
const barFill = "hsl(45 93% 48%)"

export function BonosView() {
  const [filtro, setFiltro] = useState<string>("todos")

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 max-w-3xl space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-[1.65rem]">
            Todos los bonos
          </h1>
          <p className="text-sm leading-relaxed text-slate-600 md:text-[15px]">
            Acumulado de 30 días que identifica qué bonos atraen más cuentas
            duplicadas. Ayuda a decidir qué términos y condiciones endurecer.
          </p>
        </div>
        <div className="shrink-0 self-start sm:self-auto">
          <span className="inline-flex rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold tabular-nums text-slate-700">
            {bonosInvalidosTotal} inválidos
          </span>
        </div>
      </div>

      <div>
        <label
          htmlFor="filtro-bono"
          className="mb-1.5 block text-xs font-medium text-slate-600"
        >
          Filtrar por bono
        </label>
        <div className="relative max-w-full">
          <select
            id="filtro-bono"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-10 text-sm text-slate-800 shadow-sm outline-none ring-slate-300 transition hover:border-slate-300 focus:border-[#178bd2] focus:ring-2 focus:ring-[#178bd2]/25"
          >
            {bonosFiltroOpciones.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
            aria-hidden
          />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm md:p-5">
            <ChartContainer
              config={{
                invalidos: { label: "Inválidos", color: lineColor },
              }}
              className="aspect-auto h-[280px] w-full md:h-[300px]"
            >
              <ComposedChart
                data={bonosInvalidosPorDia}
                margin={{ top: 12, right: 8, left: -4, bottom: 4 }}
              >
                <defs>
                  <linearGradient id="bonosLineArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={lineColor} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-slate-200"
                />
                <XAxis
                  dataKey="fecha"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "hsl(215 16% 42%)", fontSize: 11 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  domain={[0, 18]}
                  ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]}
                  tickLine={false}
                  axisLine={false}
                  width={28}
                  tick={{ fill: "hsl(215 16% 45%)", fontSize: 11 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="invalidos"
                  stroke="none"
                  fill="url(#bonosLineArea)"
                />
                <Line
                  type="monotone"
                  dataKey="invalidos"
                  stroke="var(--color-invalidos)"
                  strokeWidth={2}
                  dot={{ r: 3.5, fill: "var(--color-invalidos)", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </ComposedChart>
            </ChartContainer>
          </article>

          <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm md:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900 md:text-base">
                Inválidos por bono
              </h2>
              <button
                type="button"
                className="shrink-0 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100"
              >
                Todos los dispositivos
              </button>
            </div>
            <ChartContainer
              config={{
                count: { label: "Inválidos", color: barFill },
              }}
              className="aspect-auto h-[300px] w-full md:h-[320px]"
            >
              <BarChart
                data={bonosInvalidosPorBono}
                margin={{ top: 8, right: 4, left: -12, bottom: 72 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-slate-200"
                />
                <XAxis
                  dataKey="bono"
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-42}
                  textAnchor="end"
                  height={78}
                  tick={{ fill: "hsl(215 16% 38%)", fontSize: 10 }}
                />
                <YAxis
                  domain={[0, 45]}
                  ticks={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45]}
                  tickLine={false}
                  axisLine={false}
                  width={32}
                  tick={{ fill: "hsl(215 16% 45%)", fontSize: 11 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="count"
                  fill={barFill}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={44}
                />
              </BarChart>
            </ChartContainer>
          </article>
        </div>

        <div className="flex min-h-0 flex-col gap-5">
          <article className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Infractores Únicos Identificados
            </p>
            <p className="mt-2 text-4xl font-bold tabular-nums tracking-tight text-slate-900">
              {bonosInfractoresUnicos}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Según el filtro seleccionado
            </p>
          </article>

          <article className="flex min-h-[380px] flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-900">
                Top Dispositivos Reincidentes
              </h2>
              <button
                type="button"
                className="shrink-0 rounded-md border border-violet-500 bg-white px-2.5 py-1 text-xs font-semibold text-violet-600 hover:bg-violet-50"
              >
                Todos
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto px-3 py-2">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur">
                  <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-600">
                    <th className="px-1 py-2">Dispositivo</th>
                    <th className="whitespace-nowrap px-1 py-2 text-right">
                      Usuarios
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bonosTopDispositivos.map((row) => (
                    <tr key={row.dispositivo} className="hover:bg-slate-50/80">
                      <td className="max-w-0 px-1 py-2.5">
                        <button
                          type="button"
                          className="block w-full truncate text-left font-mono text-xs text-[#178bd2] underline decoration-[#178bd2]/40 underline-offset-2 hover:text-blue-700"
                        >
                          {row.dispositivo}
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-1 py-2.5 text-right font-semibold tabular-nums text-slate-800">
                        {row.usuarios}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

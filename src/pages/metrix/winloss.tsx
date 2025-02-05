"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import BarraWinLose from "../metrix/barra_win_lose";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function Component({ data }) {
  const [chartData, setChartData] = useState([
    { month: "january", wonTradesPercent: 0, lostTradesPercent: 0 },
  ]);

  useEffect(() => {
    if (data?.metrics) {
      const wonTradesPercent = data.metrics.wonTradesPercent || 0; // Usa valores reales
      const lostTradesPercent = data.metrics.lostTradesPercent || 0; // Usa valores reales

      const updatedData = [
        { month: "dynamic", wonTradesPercent, lostTradesPercent },
      ];
      setChartData(updatedData);
    }
  }, [data]);

  const chartConfig = {
    wonTradesPercent: {
      label: "Won Trades",
      color: "hsl(var(--chart-1))",
    },
    lostTradesPercent: {
      label: "Lost Trades",
      color: "hsl(var(--chart-2))",
    },
  };

  const noTrades = chartData[0].wonTradesPercent === 0 && chartData[0].lostTradesPercent === 0;

  return (
    <Card className="flex flex-col mt-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Progreso de Win/Loss</CardTitle>
        <CardDescription>Resumen basado en métricas recibidas</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center ">
        {noTrades ? (
          <div className="text-center text-muted-foreground">
            Sin resultados aun, no se han realizado trades.
          </div>
        ) : (
          <>
            {/* Gráfico Radial */}
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[250px]"
            >
              <RadialBarChart
                data={chartData}
                endAngle={180}
                innerRadius={90}
                outerRadius={140}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-foreground text-3xl font-bold"
                            >
                              % Rates
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 4}
                              className="fill-muted-foreground"
                            >
                              Win / Loss
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="lostTradesPercent"
                  stackId="a"
                  cornerRadius={5}
                  fill="hsl(0, 70%, 50%)" // Rojo
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="wonTradesPercent"
                  fill="hsl(30, 90%, 50%)" // Naranja
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ChartContainer>

            {/* Barra Horizontal Win/Lose */}
            <div className="w-full max-w-[500px] -mt-24">
              <BarraWinLose data={data} />
            </div>
          </>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Cambios recientes en las métricas <TrendingUp className="h-4 w-4" />
        </div>
        {!noTrades && (
          <div className="flex justify-between">
            <span className="text-amber-400">
              Ganancia: {chartData[0].wonTradesPercent.toFixed(1)}%
            </span>
            <span className="text-red-600">
              Pérdida: {chartData[0].lostTradesPercent.toFixed(1)}%
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function Component({ metricsData }) {
  const [chartData, setChartData] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (metricsData && metricsData.metrics) {
      const initialBalance = metricsData.metrics.balance || 0;
      setBalance(initialBalance);

      // Procesar datos para el gráfico
      const extractedData = metricsData.metrics.openTradesByHour
        ? metricsData.metrics.openTradesByHour.map((item, index) => ({
            trade: index + 1, // Índice como identificador del trade
            balance: item.profit || 0, // Asegurar que sea un número válido
          }))
        : [{ trade: 0, balance: initialBalance }];

      setChartData(extractedData);
    } else {
      setBalance(0);
      setChartData([{ trade: 0, balance: 0 }]);
    }
  }, [metricsData]);

  const chartConfig = {
    balance: {
      label: "Profit",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div>
      <p className="text-lg font-semibold mb-4">Resultados Actuales</p>
      <Card>
        <CardHeader>
          <CardTitle className="font-normal text-black dark:text-white">
            Balance
          </CardTitle>
          <CardDescription className="text-4xl font-semibold text-black dark:text-white">
            ${balance.toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              data={chartData}
              margin={{
                left: 0,
                right: 12,
                top: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid horizontal strokeWidth={2} vertical={false} />
              <XAxis
                dataKey="trade"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                label={{ value: "Trades", position: "insideBottom", offset: -10 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="balance"
                type="monotone"
                stroke="#FFC107"
                strokeWidth={2}
                dot={{
                  fill: "#FFC107",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

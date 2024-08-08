import React from 'react';
import { Line } from 'react-chartjs-2';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartOptions, ChartData } from 'chart.js/auto';

interface HistoricalData {
  cases: { [date: string]: number };
  deaths: { [date: string]: number };
  recovered: { [date: string]: number };
}

function ChartSection({
  historicalData,
  selectedTab,
  onTabChange,
}: {
  historicalData: HistoricalData | null;
  selectedTab: string;
  onTabChange: (value: string) => void;
}) {
  const chartData: ChartData<'line'> = {
    labels: historicalData ? Object.keys(historicalData[selectedTab as keyof HistoricalData]) : [],
    datasets: [
      {
        label: selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1),
        data: historicalData ? Object.values(historicalData[selectedTab as keyof HistoricalData]) : [],
        borderColor: selectedTab === 'cases' ? 'rgb(75, 192, 192)' : selectedTab === 'deaths' ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: `COVID-19 ${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Fluctuation`,
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 30,
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="p-6 sm:p-8 md:p-10">
        <Tabs defaultValue="cases" onValueChange={onTabChange}>
          <TabsList className="grid w-full grid-cols-3 mb-4 border-b sm:mb-6 md:mb-8">
            <TabsTrigger value="cases" className="text-sm sm:text-base md:text-lg">Cases</TabsTrigger>
            <TabsTrigger value="deaths" className="text-sm sm:text-base md:text-lg">Deaths</TabsTrigger>
            <TabsTrigger value="recovered" className="text-sm sm:text-base md:text-lg">Recovered</TabsTrigger>
          </TabsList>
          <TabsContent value="cases">
            <div className="h-72 sm:h-80 md:h-96">{historicalData && <Line data={chartData} options={chartOptions} />}</div>
          </TabsContent>
          <TabsContent value="deaths">
            <div className="h-72 sm:h-80 md:h-96">{historicalData && <Line data={chartData} options={chartOptions} />}</div>
          </TabsContent>
          <TabsContent value="recovered">
            <div className="h-72 sm:h-80 md:h-96">{historicalData && <Line data={chartData} options={chartOptions} />}</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ChartSection;
import { AnalyticsSummary } from "@/components/analytics-summary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Briefcase, TrendingUp, Users } from "lucide-react";
import { CartesianGrid, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts";

const trafficData = [
  { date: "2024-01-01", visitors: 2400 },
  { date: "2024-02-01", visitors: 1398 },
  { date: "2024-03-01", visitors: 9800 },
  { date: "2024-04-01", visitors: 3908 },
  { date: "2024-05-01", visitors: 4800 },
  { date: "2024-06-01", visitors: 3800 },
  { date: "2024-07-01", visitors: 4300 },
];

const trafficSourcesData = [
  { name: "Organic Search", value: 45, fill: "hsl(var(--chart-1))" },
  { name: "Direct", value: 25, fill: "hsl(var(--chart-2))" },
  { name: "Referral", value: 20, fill: "hsl(var(--chart-3))" },
  { name: "Social", value: 10, fill: "hsl(var(--chart-4))" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
};

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Real-time data on your website traffic, user behavior, and campaign performance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.5%</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Session Duration</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 34s</div>
            <p className="text-xs text-muted-foreground">+12s from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">350</div>
            <p className="text-xs text-muted-foreground">+32% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Website Traffic Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={trafficData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="visitors" type="monotone" stroke="var(--color-visitors)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={{}} className="h-[300px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={trafficSourcesData} dataKey="value" nameKey="name" innerRadius={60} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12">
        <AnalyticsSummary />
      </div>
    </div>
  );
}

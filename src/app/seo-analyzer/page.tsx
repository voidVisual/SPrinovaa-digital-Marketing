import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Link as LinkIcon, Search, Target, TrendingUp } from "lucide-react";
import { Bar, CartesianGrid, XAxis, YAxis } from "recharts";

const keywordRankings = [
  { rank: "1-3", count: 15, fill: "hsl(var(--chart-1))" },
  { rank: "4-10", count: 45, fill: "hsl(var(--chart-1))" },
  { rank: "11-20", count: 60, fill: "hsl(var(--chart-2))" },
  { rank: "21-50", count: 30, fill: "hsl(var(--chart-3))" },
  { rank: "50+", count: 15, fill: "hsl(var(--chart-4))" },
];

const topKeywords = [
  { keyword: "digital marketing agency", position: 2, volume: 12100 },
  { keyword: "seo services", position: 4, volume: 8100 },
  { keyword: "content creation tool", position: 1, volume: 5400 },
  { keyword: "linkedin growth", position: 8, volume: 2900 },
  { keyword: "google analytics expert", position: 12, volume: 1900 },
];

const chartConfig = {
  count: {
    label: "Keywords",
    color: "hsl(var(--chart-1))",
  },
};

export default function SeoAnalyzerPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          SEO Analyzer
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Analyze your website's search engine optimization and identify areas for improvement.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Domain Authority</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">+2 since last analysis</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+18% month-over-month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backlinks</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,542</div>
            <p className="text-xs text-muted-foreground">+1,200 new links</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top 3 Keywords</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">in top 3 search results</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Keyword Ranking Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={keywordRankings} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="rank" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead className="text-center">Position</TableHead>
                  <TableHead className="text-right">Search Volume</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topKeywords.map((kw) => (
                  <TableRow key={kw.keyword}>
                    <TableCell className="font-medium">{kw.keyword}</TableCell>
                    <TableCell className="text-center">{kw.position}</TableCell>
                    <TableCell className="text-right">{kw.volume.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

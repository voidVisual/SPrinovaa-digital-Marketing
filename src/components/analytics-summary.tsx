"use client";

import { useState } from "react";
import { summarizeAnalyticsData } from "@/ai/flows/summarize-analytics-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";

const sampleData = `{
  "report": "Website Traffic Overview",
  "period": "2024-06-01 to 2024-06-30",
  "metrics": {
    "users": 12234,
    "sessions": 15678,
    "bounce_rate": 0.455,
    "avg_session_duration": 154
  },
  "traffic_sources": [
    {"source": "google", "users": 5505, "type": "organic"},
    {"source": "(direct)", "users": 3058, "type": "direct"},
    {"source": "linkedin.com", "users": 2446, "type": "referral"},
    {"source": "facebook.com", "users": 1223, "type": "social"}
  ],
  "top_pages": [
    {"path": "/", "pageviews": 18034},
    {"path": "/services/seo", "pageviews": 9876},
    {"path": "/blog/top-10-marketing-trends", "pageviews": 7654}
  ]
}`;

export function AnalyticsSummary() {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setSummary("");

    try {
      const formData = new FormData(event.currentTarget);
      const analyticsData = formData.get("analyticsData") as string;
      
      const result = await summarizeAnalyticsData({
        analyticsData,
        industry: "B2B SaaS",
        targetAudience: "Marketing Managers",
      });

      if (result.summary) {
        setSummary(result.summary);
      } else {
        throw new Error("Failed to generate summary.");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Could not generate analytics summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-secondary/50">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">AI-Powered Analytics Summary</CardTitle>
        <CardDescription>
          Paste your raw analytics data (in JSON format) to get a concise summary and actionable recommendations from our AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            name="analyticsData"
            placeholder="Paste your analytics data here..."
            defaultValue={sampleData}
            rows={15}
            className="font-code bg-background"
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Summary
          </Button>
        </form>

        {isLoading && (
          <div className="mt-6 flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">AI is analyzing your data...</p>
          </div>
        )}

        {summary && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Sparkles className="h-5 w-5 text-accent" />
                Generated Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-full whitespace-pre-wrap">
                {summary}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

import { ContentGeneratorForm } from "@/components/content-generator-form";
import { PenTool } from "lucide-react";

export default function ContentGeneratorPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <div className="inline-block p-4 bg-primary/10 rounded-full">
            <PenTool className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          AI Content Generation Tool
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Generate blog posts, social media updates, and more. Just provide a few details and let our AI create a draft for you.
        </p>
      </div>
      <ContentGeneratorForm />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateInitialDraft } from "@/ai/flows/generate-initial-draft";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";

const formSchema = z.object({
  industry: z.string().min(2, { message: "Industry must be at least 2 characters." }),
  targetAudience: z.string().min(2, { message: "Target audience must be at least 2 characters." }),
  desiredMessage: z.string().min(10, { message: "Message must be at least 10 characters." }),
  contentType: z.string({ required_error: "Please select a content type." }),
});

export function ContentGeneratorForm() {
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      targetAudience: "",
      desiredMessage: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setDraft("");
    try {
      const result = await generateInitialDraft(values);
      if (result.draftContent) {
        setDraft(result.draftContent);
      } else {
        throw new Error("Failed to generate draft.");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Could not generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Content Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., E-commerce, SaaS, Healthcare" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Small business owners, Developers" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="contentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a content type to generate" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Blog Post">Blog Post</SelectItem>
                        <SelectItem value="Social Media Update">Social Media Update</SelectItem>
                        <SelectItem value="Email Campaign">Email Campaign</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desiredMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Announce a new feature that helps users save time."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Draft
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">AI is crafting your content...</p>
        </div>
      )}

      {draft && (
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Sparkles className="h-5 w-5 text-accent" />
              Generated Draft
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-full whitespace-pre-wrap rounded-md bg-background p-4 border">
              {draft}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';

export default function Home() {
  const heroImage = placeholderImages.find((img) => img.id === "hero");

  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-primary">
              Revolutionize Your Digital Presence with <span className="text-foreground">SPRinova</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We provide cutting-edge digital marketing solutions to elevate your brand. From SEO and content creation to analytics and web development, we are your partners in growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105">
                <Link href="/content-generator">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="transition-transform duration-300 hover:scale-105">
                <Link href="#services">Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-auto">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={600}
                height={400}
                data-ai-hint={heroImage.imageHint}
                className="rounded-lg shadow-2xl object-cover w-full h-full"
              />
            )}
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-20 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
              Our Comprehensive Services
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
              A complete suite of digital marketing services to help your business succeed online.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="flex flex-col justify-start text-center items-center p-4 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                <CardHeader className="items-center pb-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

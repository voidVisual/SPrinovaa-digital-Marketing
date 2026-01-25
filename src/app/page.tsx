import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const heroImage = placeholderImages.find((img) => img.id === "hero");

  return (
    <div className="flex flex-col">
      <section className="relative w-full pt-24 pb-24 md:pt-32 md:pb-32 lg:pt-48 lg:pb-48">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-headline font-black tracking-tight">
              Your Strategic Partner for <span className="text-primary">Digital Transformation</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
              We boost your business through cutting-edge technology and innovative digital marketing strategies designed for growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105">
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="transition-transform duration-300 hover:scale-105">
                <Link href="#services">Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-[400px] lg:h-[500px]">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                priority
                data-ai-hint={heroImage.imageHint}
                className="rounded-lg shadow-2xl object-cover"
              />
            )}
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-20 md:py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
              Our Services
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
              A complete suite of digital services to help your business succeed online.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="flex flex-col justify-start text-center items-center p-6 bg-background/50 backdrop-blur-sm border-white/10 transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2">
                <CardHeader className="items-center pb-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow items-center">
                  <CardTitle className="font-headline text-lg mb-2">{service.title}</CardTitle>
                  <p className="text-muted-foreground text-sm flex-grow">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="w-full py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-4">
                    Ready to elevate your digital presence?
                </h2>
                <p className="text-muted-foreground md:text-lg mb-8">
                    Let's work together to build something amazing. Get in touch with us today to discuss your project.
                </p>
                <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105">
                    <Link href="/contact">
                        Get a Free Consultation <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}

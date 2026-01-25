import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/constants';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TypingAnimation } from '@/components/typing-animation';

const processSteps = [
  {
    step: 1,
    description: "Hit the ground running with an ambitious senior designer on retainer.",
  },
  {
    step: 2,
    description: "We'll quickly embed into your team, stripping away process and delivering impactful design in days.",
  },
  {
    step: 3,
    description: "We'll partner with you for the long haul, helping you get your product shipped and scaled.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section id="home" className="relative w-full flex items-center justify-center text-center py-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-primary/10 -z-10" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto">
            <TypingAnimation
              textLines={["A nimble digital product studio", "unlocking growth with design"]}
              className="text-4xl md:text-5xl lg:text-7xl font-headline font-black tracking-tight"
            />
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Your design partner for crafting products users love.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105">
                <Link href="/#about">
                  LEARN MORE
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="w-full py-20 md:py-24 lg:py-32 bg-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl text-background">Ready to go?</h2>
            <p className="text-4xl md:text-5xl font-bold text-background">We run things hot over here.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step) => (
              <div key={step.step} className="p-8 rounded-lg bg-black/5 text-background">
                <div className="text-8xl font-bold mb-6">{step.step}</div>
                <p className="text-lg">{step.description}</p>
              </div>
            ))}
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

      <section id="about" className="w-full py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">About Us</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg mt-4">
                    A passionate team of strategists, creatives, and technologists dedicated to helping businesses thrive in the digital world.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-4">
                      <h3 className="text-2xl font-headline font-bold">Our Mission</h3>
                      <p className="text-muted-foreground">
                          To empower businesses with innovative and effective digital solutions that drive growth, foster engagement, and create lasting value. We believe in the power of technology to transform brands and build meaningful connections with their audiences.
                      </p>
                  </div>
                  <div className="space-y-4">
                      <h3 className="text-2xl font-headline font-bold">Our Vision</h3>
                      <p className="text-muted-foreground">
                          To be a leading digital agency recognized for our creativity, strategic thinking, and commitment to client success. We aspire to constantly push the boundaries of what's possible in the digital landscape, setting new standards for excellence and innovation.
                      </p>
                  </div>
              </div>
          </div>
      </section>
      
      <section id="contact" className="w-full py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">
              Contact Us
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
              Have a project in mind? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" />
                    <Input type="email" placeholder="Your Email" />
                  </div>
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your Message" rows={6} />
                  <Button type="submit" size="lg" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8">
                <h2 className="text-2xl font-headline font-bold">Our Information</h2>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Email</h3>
                            <p className="text-muted-foreground">contact@sprinova.digital</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Phone</h3>
                            <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Address</h3>
                            <p className="text-muted-foreground">123 Innovation Drive, Tech City, 12345</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

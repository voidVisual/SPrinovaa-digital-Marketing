import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Card, CardContent } from '@/components/ui/card';

const team = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    imageId: "team-member-1"
  },
  {
    name: "Samantha Lee",
    role: "Head of Marketing",
    imageId: "team-member-2"
  },
  {
    name: "David Chen",
    role: "Lead Developer",
    imageId: "team-member-3"
  },
    {
    name: "Maria Garcia",
    role: "Creative Director",
    imageId: "team-member-4"
  }
];

export default function AboutPage() {
    const aboutHeroImage = placeholderImages.find((img) => img.id === "about-hero");

    return (
        <div className="flex flex-col">
            <section className="relative w-full py-20 md:py-32 lg:py-40">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tight">
                            We are <span className="text-primary">SPRinova Digital</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                            A passionate team of strategists, creatives, and technologists dedicated to helping businesses thrive in the digital world.
                        </p>
                    </div>
                </div>
            </section>

            {aboutHeroImage && (
                <section className="container mx-auto px-4 md:px-6 -mt-16 mb-20 md:mb-32">
                    <Image
                        src={aboutHeroImage.imageUrl}
                        alt={aboutHeroImage.description}
                        width={1200}
                        height={600}
                        data-ai-hint={aboutHeroImage.imageHint}
                        className="rounded-lg shadow-2xl object-cover w-full h-[400px]"
                    />
                </section>
            )}

            <section className="w-full py-20 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-headline font-bold">Our Mission</h2>
                            <p className="text-muted-foreground">
                                To empower businesses with innovative and effective digital solutions that drive growth, foster engagement, and create lasting value. We believe in the power of technology to transform brands and build meaningful connections with their audiences.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-headline font-bold">Our Vision</h2>
                            <p className="text-muted-foreground">
                                To be a leading digital agency recognized for our creativity, strategic thinking, and commitment to client success. We aspire to constantly push the boundaries of what's possible in the digital landscape, setting new standards for excellence and innovation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="team" className="w-full py-20 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="space-y-4 text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
                            Meet Our Team
                        </h2>
                        <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
                            The creative minds behind our success.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member) => {
                            const memberImage = placeholderImages.find(img => img.id === member.imageId);
                            return (
                                <Card key={member.name} className="text-center border-none bg-transparent shadow-none">
                                    <CardContent className="p-0">
                                        {memberImage && (
                                            <Image
                                                src={memberImage.imageUrl}
                                                alt={`Portrait of ${member.name}`}
                                                width={400}
                                                height={400}
                                                data-ai-hint={memberImage.imageHint}
                                                className="rounded-full w-48 h-48 object-cover mx-auto mb-4 shadow-lg"
                                            />
                                        )}
                                        <h3 className="text-xl font-headline font-bold">{member.name}</h3>
                                        <p className="text-primary">{member.role}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

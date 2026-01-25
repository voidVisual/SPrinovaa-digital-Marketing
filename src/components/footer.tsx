import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
                <p className="text-lg font-headline font-semibold">SPrinova-Digital Marketing</p>
            </Link>
            <p className="text-sm text-muted-foreground">
                Your strategic partner for digital transformation.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
             <h3 className="font-headline font-semibold mb-4">Contact</h3>
             <ul className="space-y-3">
                <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-1 shrink-0" /> 
                    <span className="text-sm text-muted-foreground">contact@sprinova.digital</span>
                </li>
                 <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-1 shrink-0" /> 
                    <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
                </li>
                 <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" /> 
                    <span className="text-sm text-muted-foreground">123 Innovation Drive, Tech City, 12345</span>
                </li>
             </ul>
          </div>

          <div>
             <h3 className="font-headline font-semibold mb-4">Newsletter</h3>
             <p className="text-sm text-muted-foreground mb-4">Stay up to date with our latest news and offers.</p>
             <div className="flex gap-2">
                <input type="email" placeholder="Enter your email" className="bg-background/50 border border-white/20 rounded-md px-3 py-2 text-sm w-full focus:ring-primary focus:border-primary" />
                <Button size="icon" aria-label="Subscribe"><Mail className="w-4 h-4" /></Button>
             </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SPrinova-Digital Marketing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

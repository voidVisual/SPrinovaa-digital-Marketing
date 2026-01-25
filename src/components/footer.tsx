import { Facebook, Linkedin, Twitter, Wind } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Wind className="h-6 w-6 text-primary" />
            <p className="text-lg font-headline font-semibold">SPRinova Digital</p>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SPRinova Digital. All rights reserved.
          </p>
          <div className="flex gap-4">
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
      </div>
    </footer>
  );
}

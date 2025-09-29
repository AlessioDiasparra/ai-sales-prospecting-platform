import Link from "next/link";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="h-9 w-9 rounded-md border" />
            <p className="text-sm text-muted-foreground">
              Modern task management for teams that value clarity, focus, and results.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Link href="#" className="rounded-full border p-2 text-muted-foreground hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="rounded-full border p-2 text-muted-foreground hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href="#" className="rounded-full border p-2 text-muted-foreground hover:text-foreground">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="rounded-full border p-2 text-muted-foreground hover:text-foreground">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="#" className="hover:text-foreground">Integrations</Link></li>
              <li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="#" className="hover:text-foreground">Updates</Link></li>
              <li><Link href="#" className="hover:text-foreground">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">About</Link></li>
              <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
              <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="hover:text-foreground">Press</Link></li>
              <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
              <li><Link href="#" className="hover:text-foreground">Help Center</Link></li>
              <li><Link href="#" className="hover:text-foreground">Guides & Tutorials</Link></li>
              <li><Link href="#" className="hover:text-foreground">API Reference</Link></li>
              <li><Link href="#" className="hover:text-foreground">Community</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p>© 2025 Cosmos Tasks. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-foreground">Privacy</Link>
              <Link href="#" className="hover:text-foreground">Terms</Link>
              <Link href="#" className="hover:text-foreground">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
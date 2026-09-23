import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { NAV_LINKS } from "@/constants/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Buttons */}
        <>
          {/* Desktop Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login">
              <Button variant="ghost">
                Login
              </Button>
            </Link>

            <Link href="/register">
              <Button>
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-accent md:hidden">
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="right">
              <div className="mt-10 flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}

                <Link href="/login">
                  <Button variant="ghost">
                    Login
                  </Button>
                </Link>

                <Link href="/register">
                  <Button>
                    Get Started
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </>
      </div>
    </header>
  );
}

import Link from "next/link";
import Logo from "@/components/common/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">

        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">
            AI-powered Resume Analysis Platform.
          </p>
        </div>

        <div className="flex gap-8 text-sm text-muted-foreground">
          <Link href="/">Home</Link>
          <Link href="#">Features</Link>
          <Link href="#">About</Link>
          <Link href="#">Contact</Link>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2026 ResumeIQ. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
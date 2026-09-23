"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroButtons() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Link href="/login">
        <Button
          size="lg"
          className="w-full sm:w-auto"
        >
          Login
        </Button>
      </Link>

      <Link href="/register">
        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto"
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
}
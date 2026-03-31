"use client";

import Link from "next/link";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 py-3">
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="font-semibold text-lg hover:text-primary transition-colors">
            Home
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
      <hr />
    </div>
  );
}

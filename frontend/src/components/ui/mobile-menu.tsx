'use client';

import { useState } from 'react';
// import Link from 'next/link'; // Removed as unused
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-gray-500" aria-label="Open menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          {/* Removed obsolete links. Add back essential mobile navigation if needed. */}
          {/* Example: Maybe a link back to home? 
          <Link 
            href="/" 
            className="text-lg font-medium ..."
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          */}
          {/* Consider what, if anything, is needed here now the site is single-page */}
          {/* The user popover handles Dashboard/Agents Library post-login */}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
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
          <Link 
            href="/about" 
            className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/services" 
            className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2"
            onClick={() => setOpen(false)}
          >
            Services
          </Link>
          <Link 
            href="/why-now" 
            className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2"
            onClick={() => setOpen(false)}
          >
            Why Now
          </Link>
          <Link 
            href="/case-studies" 
            className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2"
            onClick={() => setOpen(false)}
          >
            Case Studies
          </Link>
          <Link 
            href="/dashboard" 
            className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            href="/contact" 
            className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

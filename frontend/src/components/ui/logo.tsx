'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { useTheme } from 'next-themes'; // Removed theme hook

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = '', showText = true }: LogoProps) {
  // const { theme } = useTheme(); // Removed theme logic
  // const isDarkTheme = theme === 'dark'; // Removed theme logic
  
  return (
    <Link href="/" className={`flex items-center ${className}`} aria-label="Productivity Engines Home">
      <div className="relative w-8 h-8 mr-2 flex-shrink-0">
        <Image 
          src={'/images/logo-transparent.svg'} // Always use transparent logo
          alt="Productivity Engines Logo"
          fill
          sizes="32px"
          priority
          className="object-contain"
        />
      </div>
      {showText && (
        <span className="text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap">
          <span className="hidden sm:inline">Productivity</span>
          <span className="sm:hidden">P.</span>
          <span> Engines</span>
        </span>
      )}
    </Link>
  );
}

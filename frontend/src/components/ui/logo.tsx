'use client';

import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = '', showText = true }: LogoProps) {
  
  return (
    <Link href="/" className={`flex items-center ${className}`} aria-label="Productivity Engines Home">
      <div className="flex-shrink-0 mr-2 overflow-visible">
        <img 
          src="/images/logo-transparent.svg"
          alt="Productivity Engines Logo"
          width="48"
          height="48"
          className="w-12 h-12 object-contain block"
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

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-b border-gray-100 dark:border-gray-800">
      <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 py-1.5">
        <Container>
          <div className="flex justify-end">
            <div className="hidden sm:flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Client Username" 
                className="h-7 px-2 rounded-md text-xs border border-amber-200 bg-white/70 text-gray-700 placeholder:text-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-300"
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="h-7 px-2 rounded-md text-xs border border-amber-200 bg-white/70 text-gray-700 placeholder:text-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-300"
              />
              <Button size="sm" variant="outline" className="h-7 text-xs bg-white text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700">
                Login
              </Button>
            </div>
            <div className="sm:hidden flex">
              <Button size="sm" variant="outline" className="h-7 text-xs bg-white text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700">
                Client Login
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="hidden sm:block w-8 h-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-md opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-[2px] bg-white dark:bg-gray-900 rounded-[4px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 group-hover:text-amber-600 transition-colors">
                    <path d="M12 4V2"/>
                    <path d="M12 22v-2"/>
                    <path d="M8.5 18.5l-1.4 1.4"/>
                    <path d="M15.5 18.5l1.4 1.4"/>
                    <path d="M8.5 5.5l-1.4-1.4"/>
                    <path d="M15.5 5.5l1.4-1.4"/>
                    <path d="M2 12h2"/>
                    <path d="M20 12h2"/>
                    <circle cx="12" cy="12" r="4"/>
                  </svg>
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-medium bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                Productivity Engines
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/about" 
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/why-us" 
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Why Us
            </Link>
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/contact">
              <Button variant="outline" className="hidden sm:flex border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800">
                Contact
              </Button>
            </Link>
            <Link href="/register">
              <Button className="hidden sm:flex bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-sm">
                Free Consultation
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden text-gray-700 dark:text-gray-300 hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-900/20 dark:hover:text-amber-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
} 
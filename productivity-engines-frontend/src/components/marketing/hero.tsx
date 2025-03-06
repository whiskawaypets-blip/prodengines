import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-950 py-20 sm:py-24 lg:py-32">
      {/* Subtle, warm background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/70 to-white dark:from-amber-950/20 dark:to-gray-950" />
      
      {/* Minimalist decorative elements */}
      <div className="absolute right-0 top-1/4 w-64 h-64 rounded-full bg-orange-100/40 dark:bg-orange-900/10 blur-3xl" />
      <div className="absolute left-0 bottom-1/4 w-64 h-64 rounded-full bg-amber-100/40 dark:bg-amber-900/10 blur-3xl" />
      
      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 mb-8">
            <svg className="mr-1 h-3 w-3 fill-amber-500" viewBox="0 0 6 6" aria-hidden="true">
              <circle cx="3" cy="3" r="3" />
            </svg>
            Simplify Your Workflow
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-gray-900 dark:text-white mb-8 max-w-4xl">
            <span className="block">Replace Repetitive Tasks</span>
            <span className="block">
              with{" "}
              <span className="text-amber-600 dark:text-amber-400">
                Scalable Automation
              </span>
              {" — and Grow"}
            </span>
          </h1>
          
          <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            Empower your business with thoughtfully designed solutions that boost productivity, 
            reduce costs, and fuel lasting success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-sm">
              <Link href="/contact">
                <span>Schedule a Free Consultation</span>
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800">
              <Link href="/services">
                <span>Explore Solutions</span>
              </Link>
            </Button>
          </div>
          
          {/* Simple scroll indicator */}
          <div className="mt-16 text-amber-500 dark:text-amber-400">
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
              className="animate-bounce"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </div>
      </Container>
    </div>
  );
} 
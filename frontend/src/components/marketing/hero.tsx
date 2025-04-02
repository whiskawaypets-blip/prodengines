import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-950 py-32 sm:py-40">
      {/* Extremely subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,#f3f4f6_0%,white_100%)] dark:bg-[radial-gradient(circle_at_60%_30%,#111827_0%,#030712_100%)]" />
      
      <Container className="relative">
        <div className="max-w-[640px] mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.1]">
            Replace repetition with <span className="font-normal text-gray-700 dark:text-gray-200">scalable automation.</span>
          </h1>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-md mx-auto">
            Empower your business with intelligent solutions that boost productivity and reduce costs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 rounded-md">
              <Link href="/contact">
                <span>Schedule consultation</span>
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800/50 rounded-md">
              <Link href="/services">
                <span>View solutions</span>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
} 
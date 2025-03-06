import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function WhyNow() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
            Why Now?
          </div>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl text-gray-900 dark:text-white mb-5">
            The Time Is Now
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            The future of business is being redefined by intelligent automation. Companies that embrace these technologies today will gain a significant competitive edge tomorrow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-amber-50/60 dark:bg-amber-900/10 rounded-lg p-8 hover:bg-amber-50/90 dark:hover:bg-amber-900/20 transition-colors">
            <div className="flex flex-col h-full">
              <div className="text-amber-600 dark:text-amber-400 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                Secure AI For Your Business
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                Without a private, secure AI solution, businesses face data leaks and compliance risks. Implementing private AI now ensures your team receives accurate information without exposing critical knowledge to third parties.
              </p>
              <div className="h-px w-16 bg-amber-200 dark:bg-amber-800/50"></div>
            </div>
          </div>
          
          <div className="bg-amber-50/60 dark:bg-amber-900/10 rounded-lg p-8 hover:bg-amber-50/90 dark:hover:bg-amber-900/20 transition-colors">
            <div className="flex flex-col h-full">
              <div className="text-amber-600 dark:text-amber-400 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                Accelerating AI Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                AI is evolving rapidly. What was once experimental is now production-ready—offering unprecedented opportunities to enhance efficiency, reduce costs, and scale operations. Early adopters gain faster workflows and better customer experiences.
              </p>
              <div className="h-px w-16 bg-amber-200 dark:bg-amber-800/50"></div>
            </div>
          </div>
          
          <div className="bg-amber-50/60 dark:bg-amber-900/10 rounded-lg p-8 hover:bg-amber-50/90 dark:hover:bg-amber-900/20 transition-colors">
            <div className="flex flex-col h-full">
              <div className="text-amber-600 dark:text-amber-400 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                Don&apos;t Fall Behind
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                Waiting to adopt automation means giving competitors a head start. Implementing AI solutions ensures that critical business knowledge is preserved and optimized, safeguarding operations and accelerating growth regardless of staffing changes.
              </p>
              <div className="h-px w-16 bg-amber-200 dark:bg-amber-800/50"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 rounded-lg p-8 sm:p-10 shadow-sm">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-5 text-center">Maximize Productivity in Uncertain Times</h3>
            <p className="mb-8 text-gray-600 dark:text-gray-300 text-center">
              Economic pressures are forcing businesses to do more with less. Automation helps streamline operations without increasing headcount. Investing in automation now future-proofs your business against labor shortages and rising costs.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-sm">
                <Link href="/contact">
                  Schedule a Free Consultation
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-gray-500 dark:text-gray-400 text-sm text-center">
              Our solutions are designed for businesses ready to innovate. Productivity Engines partners with forward-thinking companies prepared to embrace the future today.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
} 
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function WhyNow() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <Container>
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-5">
            Why Now
          </h2>
          <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-700 mb-5"></div>
          <p className="text-gray-500 dark:text-gray-400 max-w-md text-center">
            Companies implementing automation now gain a significant competitive advantage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 flex flex-col h-full border-t-2 border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-900">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Secure Your Data
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Private AI models prevent data leaks while providing your team with instant access to company knowledge.
            </p>
          </div>
          
          <div className="p-6 flex flex-col h-full border-t-2 border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-900">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Accelerating Innovation
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              AI is rapidly evolving from experimental to production-ready, offering unprecedented efficiency gains.
            </p>
          </div>
          
          <div className="p-6 flex flex-col h-full border-t-2 border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-900">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Competitive Edge
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Early adopters gain faster workflows and better customer experiences while competitors fall behind.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-10 max-w-3xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6">
              Do more with less
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Economic pressures require businesses to streamline operations. Automation future-proofs against labor shortages and rising costs.
            </p>
            <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 rounded-md">
              <Link href="/contact">
                Schedule consultation
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
} 
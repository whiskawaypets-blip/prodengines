import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Services() {
  return (
    <section className="py-20 bg-amber-50/50 dark:bg-amber-950/10">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
            Our Services
          </div>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl text-gray-900 dark:text-white mb-5">
            Thoughtful Automation Solutions
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            We help businesses seize new opportunities with automation solutions that eliminate repetitive tasks and free your most talented employees to focus on innovation and growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-amber-100 dark:border-amber-900/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Private & Secure Conversational AI</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">
                Empower your teams with AI-driven insights while keeping proprietary information secure
              </p>
              <ul className="space-y-3 mt-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Private AI assistant trained exclusively on your company's materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Prevents data leaks and maintains full compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Provides instant, on-brand answers to your team</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-amber-100 dark:border-amber-900/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Process Discovery & Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">
                Uncover new opportunities for efficiency within your business operations
              </p>
              <ul className="space-y-3 mt-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Thorough analysis of workflows to identify automation opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Replace outdated processes with modern solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Detailed ROI analysis and implementation roadmap</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-amber-100 dark:border-amber-900/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Custom Automation Development</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">
                Tailored solutions built to enhance your unique business processes
              </p>
              <ul className="space-y-3 mt-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Intelligent systems using AI and modern tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Seamless integration into your existing operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Solutions that adapt to your specific industry requirements</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-amber-100 dark:border-amber-900/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Scalable Integration & Support</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">
                Solutions that grow with your business needs
              </p>
              <ul className="space-y-3 mt-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Scale alongside your company's growth</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Systems that learn from your employees' feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Ongoing support and optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-sm">
            <Link href="/contact">
              Schedule a Free Consultation
            </Link>
          </Button>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Ready to leverage automation for your business? Discover what's possible.
          </p>
        </div>
      </Container>
    </section>
  );
} 
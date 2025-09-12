'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="py-32">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
              <svg 
                className="w-8 h-8 text-green-600 dark:text-green-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>

            {/* Thank You Message */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-white mb-6">
              Thank You for Your Request!
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We've received your message and will get back to you shortly. 
              Paul typically responds within 24 hours during business days.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-10">
              <h3 className="text-lg font-medium text-amber-900 dark:text-amber-300 mb-2">
                What happens next?
              </h3>
              <ul className="text-left text-amber-800 dark:text-amber-300 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Paul will personally review your message
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  You'll receive a detailed response about how we can help
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  We'll schedule a call if your project is a good fit
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3"
              >
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-8 py-3"
              >
                <a 
                  href="https://www.linkedin.com/in/mrpaulphelps/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect with Paul
                </a>
              </Button>
            </div>

            {/* Additional Information */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                In the meantime, feel free to explore our solutions or connect with Paul directly on LinkedIn.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
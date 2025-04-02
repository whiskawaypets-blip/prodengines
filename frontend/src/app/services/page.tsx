'use client';

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      {/* Services Hero Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
              Our Services
            </div>
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl text-gray-900 dark:text-white mb-5">
              Transformative Automation Solutions
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              We help Portfolio Companies and their subsidiaries seize new opportunities with cutting-edge automation solutions — eliminating repetitive tasks, minimizing human error, and freeing your most talented employees to focus on innovation, growth, and delivering greater value to your customers.
            </p>
          </div>
          
          <div className="mb-16">
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto italic">
              Our approach is simple: think big, start small, and scale fast — ensuring rapid results and long-term success.
            </p>
          </div>
        </Container>
      </section>
      
      {/* Service 1: Private & Secure Conversational AI */}
      <section className="py-16 bg-amber-50/50 dark:bg-amber-950/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
                Service 1
              </div>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
                Private & Secure Conversational AI for Portfolio Companies
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Empower your subsidiaries with AI-driven insights while keeping proprietary information secure. Our private AI assistant is trained exclusively on your company's SOPs, brand guidelines, and operational documentation.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Prevents data leaks by ensuring proprietary knowledge is never shared with third-party AI LLM providers
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Provides instant, on-brand answers to franchisees, subsidiaries, and portfolio companies
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Maintains full compliance and oversight of all AI-generated content
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Customizable to each portfolio company's specific needs and knowledge base
                  </span>
                </li>
              </ul>
              
              <Button asChild>
                <Link href="/services/private-ai">Learn More</Link>
              </Button>
            </div>
            
            <div className="bg-amber-100/50 dark:bg-amber-900/10 rounded-lg p-8 h-[400px] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300 italic">AI assistant visualization placeholder</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Service 2: Process Discovery & Opportunity Analysis */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-amber-100/50 dark:bg-amber-900/10 rounded-lg p-8 h-[400px] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300 italic">Process analysis visualization placeholder</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
                Service 2
              </div>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
                Process Discovery & Opportunity Analysis
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Uncover new opportunities for efficiency and innovation within your business operations. Our expert team conducts a thorough analysis of your workflows to identify tasks that can be automated for speed, accuracy, and scalability.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Comprehensive workflow analysis to identify automation opportunities
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Highlighting where the latest technologies can replace outdated processes
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    ROI calculations for potential automation projects
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Prioritization framework to identify quick wins and long-term strategic projects
                  </span>
                </li>
              </ul>
              
              <Button asChild>
                <Link href="/services/process-discovery">Learn More</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Service 3: Custom Automation Development */}
      <section className="py-16 bg-amber-50/50 dark:bg-amber-950/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
                Service 3
              </div>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
                Custom Automation Development
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Tailored automation solutions built to enhance your unique business processes. We develop intelligent systems using Agentic AI, RPA, and modern digital tools to handle time-consuming tasks with precision.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Customized solutions built for your specific business challenges
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Seamless integration with your existing systems and workflows
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Cutting-edge technologies including Agentic AI, RPA, and modern development frameworks
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Focus on reducing manual effort while maintaining quality and accuracy
                  </span>
                </li>
              </ul>
              
              <Button asChild>
                <Link href="/services/custom-automation">Learn More</Link>
              </Button>
            </div>
            
            <div className="bg-amber-100/50 dark:bg-amber-900/10 rounded-lg p-8 h-[400px] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300 italic">Custom automation visualization placeholder</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Service 4: Scalable Integration & Continuous Support */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-amber-100/50 dark:bg-amber-900/10 rounded-lg p-8 h-[400px] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300 italic">Integration and support visualization placeholder</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
                Service 4
              </div>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
                Scalable Integration & Continuous Support
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Implementing and optimizing automation solutions that grow with your business. We deploy solutions that scale alongside your company's growth, ensuring continued operational excellence.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Smooth implementation and onboarding processes
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Human-in-the-loop systems that learn from your skilled employees
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Continuous improvement through feedback and system optimization
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Ongoing support and maintenance to ensure long-term success
                  </span>
                </li>
              </ul>
              
              <Button asChild>
                <Link href="/services/scalable-integration">Learn More</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-900 dark:to-orange-900">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl text-white mb-5">
              Ready to Transform Your Business Operations?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-white/90 mb-10">
              Schedule a free consultation today and discover how our automation solutions can help your business grow.
            </p>
            <Button asChild size="lg" className="bg-white text-amber-600 hover:bg-white/90 shadow-sm">
              <Link href="/contact">Schedule a Free Consultation</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
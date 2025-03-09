'use client';

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
              Case Studies
            </div>
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl text-gray-900 dark:text-white mb-5">
              Real Results for Real Businesses
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Discover how our automation solutions have transformed operations and driven growth for portfolio companies across industries.
            </p>
          </div>
        </Container>
      </section>
      
      {/* Case Study 1 */}
      <section className="py-16 bg-amber-50/50 dark:bg-amber-950/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
                Private AI Implementation
              </div>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
                National Franchise Group Improves Brand Consistency
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                A national franchise group with over 200 locations across multiple brands was struggling with maintaining consistent brand messaging and operational standards across all franchisees.
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">The Challenge</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Franchisees were frequently contacting corporate offices with questions about brand guidelines, operational procedures, and marketing requirements. This created a bottleneck and resulted in inconsistent application of company standards.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Our Solution</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We implemented a private AI assistant trained on the company's full set of brand guidelines, operational manuals, and marketing materials for each of their brands. The system was deployed to all franchisees with personalized access based on their specific brand and location.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Results</h3>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                    <li className="mb-1">82% reduction in operational support inquiries to corporate headquarters</li>
                    <li className="mb-1">Improved brand consistency across all locations</li>
                    <li className="mb-1">Franchisee satisfaction increased by 67%</li>
                    <li>New franchisee onboarding time reduced by 40%</li>
                  </ul>
                </div>
              </div>
              
              <Button asChild>
                <Link href="/case-studies/franchise-group">Read Full Case Study</Link>
              </Button>
            </div>
            
            <div className="bg-amber-100/50 dark:bg-amber-900/10 rounded-lg p-8 h-[400px] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300 italic">Franchise visualization placeholder</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Case Study 2 */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-amber-100/50 dark:bg-amber-900/10 rounded-lg p-8 h-[400px] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300 italic">Invoice processing visualization placeholder</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
                Process Automation
              </div>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
                Manufacturing Company Streamlines Invoice Processing
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                A mid-sized manufacturing company with multiple subsidiaries was struggling with manual invoice processing across its various business units, leading to delays, errors, and inefficient use of accounting staff time.
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">The Challenge</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The company was processing over 5,000 invoices monthly across different subsidiaries, with each invoice taking 15-20 minutes to process manually. This resulted in payment delays, missed early payment discounts, and accounting staff working overtime.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Our Solution</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We implemented an intelligent document processing solution using AI to automatically extract invoice data, validate against purchase orders, and route for approval. The system integrated seamlessly with their existing ERP system and provided centralized visibility across all subsidiaries.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Results</h3>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                    <li className="mb-1">93% reduction in manual processing time</li>
                    <li className="mb-1">Error rate decreased from 11% to less than 1%</li>
                    <li className="mb-1">$320,000 annual savings from early payment discounts</li>
                    <li>Accounting team redeployed to higher-value analytical work</li>
                  </ul>
                </div>
              </div>
              
              <Button asChild>
                <Link href="/case-studies/manufacturing-invoices">Read Full Case Study</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Case Study 3 */}
      <section className="py-16 bg-amber-50/50 dark:bg-amber-950/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
                Customer Service Automation
              </div>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
                E-Commerce Group Transforms Customer Support
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                A fast-growing e-commerce group with multiple online stores was struggling to maintain customer service quality during periods of rapid growth, leading to inconsistent responses and slower resolution times.
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">The Challenge</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The company's customer service team was overwhelmed with inquiries across multiple channels (email, chat, social media), resulting in long response times, inconsistent answers, and difficulty scaling during peak seasons without significant hiring.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Our Solution</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We developed an integrated customer service automation system with AI-powered triage, automated responses for common inquiries, and agent augmentation tools. The system learned from historical support interactions while maintaining brand-specific voice for each store.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Results</h3>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                    <li className="mb-1">First response time reduced from 8 hours to under 15 minutes</li>
                    <li className="mb-1">65% of inquiries resolved without human intervention</li>
                    <li className="mb-1">Customer satisfaction scores increased by 35%</li>
                    <li>Handled 300% increase in volume during holiday season without additional hiring</li>
                  </ul>
                </div>
              </div>
              
              <Button asChild>
                <Link href="/case-studies/ecommerce-support">Read Full Case Study</Link>
              </Button>
            </div>
            
            <div className="bg-amber-100/50 dark:bg-amber-900/10 rounded-lg p-8 h-[400px] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300 italic">Customer support visualization placeholder</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Results Overview */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
              The Impact of Our Solutions
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Across our client portfolio, we've delivered measurable results that drive growth and operational excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-amber-50/80 dark:bg-amber-900/20 p-8 rounded-lg text-center">
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">73%</div>
              <p className="text-gray-700 dark:text-gray-300">Average reduction in processing time</p>
            </div>
            
            <div className="bg-amber-50/80 dark:bg-amber-900/20 p-8 rounded-lg text-center">
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">$1.2M</div>
              <p className="text-gray-700 dark:text-gray-300">Average annual cost savings</p>
            </div>
            
            <div className="bg-amber-50/80 dark:bg-amber-900/20 p-8 rounded-lg text-center">
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">41%</div>
              <p className="text-gray-700 dark:text-gray-300">Improved customer satisfaction</p>
            </div>
            
            <div className="bg-amber-50/80 dark:bg-amber-900/20 p-8 rounded-lg text-center">
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">3.8x</div>
              <p className="text-gray-700 dark:text-gray-300">Average ROI in first year</p>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-amber-50/50 dark:bg-amber-950/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
              What Our Clients Say
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Hear directly from the businesses that have transformed their operations with our solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
              <div className="flex flex-col h-full">
                <p className="text-gray-600 dark:text-gray-300 italic mb-6 flex-grow">
                  &quot;The automation solutions provided by Productivity Engines have transformed our operations. Tasks that used to take hours now happen in minutes, and our team can focus on strategic work that drives our business forward.&quot;
                </p>
                <div className="flex items-center mt-4">
                  <div className="h-12 w-12 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 font-medium">SR</div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900 dark:text-white">Sarah Reynolds</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Operations Director, TechForward</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
              <div className="flex flex-col h-full">
                <p className="text-gray-600 dark:text-gray-300 italic mb-6 flex-grow">
                  &quot;Implementing the private AI assistant has been a game-changer. Our team has instant access to company knowledge while maintaining complete data security. The ROI was evident within weeks of deployment.&quot;
                </p>
                <div className="flex items-center mt-4">
                  <div className="h-12 w-12 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 font-medium">MJ</div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900 dark:text-white">Michael Johnson</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CTO, InnovateNow Group</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
              <div className="flex flex-col h-full">
                <p className="text-gray-600 dark:text-gray-300 italic mb-6 flex-grow">
                  &quot;The process discovery work that Productivity Engines did for our company uncovered automation opportunities we hadn't even considered. Their systematic approach and clear ROI calculations made it easy to prioritize initiatives.&quot;
                </p>
                <div className="flex items-center mt-4">
                  <div className="h-12 w-12 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 font-medium">LP</div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900 dark:text-white">Lisa Patel</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CEO, Retail Partners Inc.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
              <div className="flex flex-col h-full">
                <p className="text-gray-600 dark:text-gray-300 italic mb-6 flex-grow">
                  &quot;What impressed me most was how the Productivity Engines team understood our business challenges so quickly. They didn't just implement technology for technology's sake – they provided solutions that addressed our specific pain points.&quot;
                </p>
                <div className="flex items-center mt-4">
                  <div className="h-12 w-12 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 font-medium">DT</div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900 dark:text-white">David Thompson</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CFO, Global Manufacturing Group</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-900 dark:to-orange-900">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl text-white mb-5">
              Ready to Achieve Similar Results?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-white/90 mb-10">
              Schedule a consultation to learn how our automation solutions can transform your business operations.
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
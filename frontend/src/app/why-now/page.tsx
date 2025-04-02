'use client';

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WhyNowPage() {
  return (
    <>
      {/* Why Now Hero Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
              Why Now?
            </div>
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl text-gray-900 dark:text-white mb-5">
              The Time for Automation is Now
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              The future of business is being redefined by intelligent automation. Companies that embrace these technologies today will gain an unparalleled competitive edge tomorrow.
            </p>
          </div>
        </Container>
      </section>
      
      {/* Main Content */}
      <section className="py-16 bg-amber-50/50 dark:bg-amber-950/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column */}
            <div>
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold mr-3">1</div>
                    Secure AI Is a Must for Portfolio Companies
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Public AI models pose a risk to proprietary business knowledge. Without a private, secure AI solution, portfolio companies and franchisors face data leaks, compliance risks, and a lack of control over AI-generated insights.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Implementing private, on-brand Conversational AI now ensures that subsidiaries and franchisees receive accurate, secure, and company-approved information—without exposing critical knowledge to third-party AI providers.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold mr-3">2</div>
                    AI Innovation Is Accelerating Rapidly
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Artificial Intelligence, especially Agentic AI, is evolving at breakneck speed. What was once experimental is now production-ready — offering SMBs unprecedented opportunities to enhance efficiency, reduce costs, and scale operations faster than ever before.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    The window for early adoption advantage is closing rapidly as more businesses implement these solutions.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold mr-3">3</div>
                    Early Adopters Gain the Competitive Edge
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Businesses that integrate advanced automation now will outpace competitors still relying on manual processes. Faster workflows, fewer errors, and more time for strategic initiatives mean higher profitability and better customer experiences.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Organizations implementing AI-powered automation are already seeing 30-50% improvements in operational efficiency.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold mr-3">4</div>
                    Maximize Productivity in an Uncertain Economy
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    In a time when economic pressures are forcing businesses to do more with less, automation helps SMBs streamline operations without increasing headcount. Investing in automation now means future-proofing your business against labor shortages and rising costs.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Automation solutions provide a stable, scalable foundation that remains consistent regardless of staffing challenges.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold mr-3">5</div>
                    Agentic AI Is Ready for Real-World Impact
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Agentic AI is no longer theoretical. It is ready to handle complex processes, adapt over time, and continuously improve — all while being guided by your top employees for even greater results.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    These systems can now automate entire workflows that previously required human intervention at every step, while still maintaining human oversight for critical decisions.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold mr-3">6</div>
                    Operational Knowledge Is at Risk Without Automation
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    As employees leave, so does their expertise. Implementing AI solutions now ensures that critical business knowledge is preserved and continually optimized, safeguarding your operations and accelerating growth regardless of staffing changes.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Companies are already using AI to capture, maintain, and distribute institutional knowledge that would otherwise be lost with employee turnover.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Don't Fall Behind Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">
              Don't Fall Behind
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Waiting to adopt automation means giving your competitors a head start. The tools are ready, the opportunities are endless, and the time to act is now.
            </p>
            <div className="p-8 bg-amber-50 dark:bg-amber-900/10 rounded-lg mb-10">
              <p className="text-lg italic text-gray-600 dark:text-gray-300">
                "Our solutions are designed for businesses ready to innovate and lead. If you're waiting for the 'perfect time,' you may already be falling behind. Productivity Engines partners with forward-thinking companies prepared to embrace the future today."
              </p>
            </div>
            <div className="mt-10 text-center">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
                The time to transform your business is now.
              </h3>
              <Button asChild size="lg" className="mt-4">
                <Link href="/contact">Schedule a Free Consultation</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-amber-50/50 dark:bg-amber-950/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
              The Impact of Automation Today
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Companies implementing AI and automation are already seeing transformative results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">45%</div>
              <p className="text-gray-600 dark:text-gray-300">Average reduction in processing time for automated tasks</p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">68%</div>
              <p className="text-gray-600 dark:text-gray-300">Reduction in errors from manual data entry</p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">3.5x</div>
              <p className="text-gray-600 dark:text-gray-300">Return on investment in the first year</p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">72%</div>
              <p className="text-gray-600 dark:text-gray-300">Of businesses plan to increase automation investment in 2024</p>
            </div>
          </div>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-900 dark:to-orange-900">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl text-white mb-5">
              Ready to Lead in Your Industry?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-white/90 mb-10">
              Join the forward-thinking businesses that are already transforming their operations with our automation solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-amber-600 hover:bg-white/90 shadow-sm">
                <Link href="/contact">Schedule a Free Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
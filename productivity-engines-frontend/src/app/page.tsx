'use client';

import { Hero } from "@/components/marketing/hero";
import { About } from "@/components/marketing/about";
import { Services } from "@/components/marketing/services";
import { WhyNow } from "@/components/marketing/why-now";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* About Us Section */}
      <About />
      
      {/* Services Section */}
      <Services />
      
      {/* Features Section - a simplified version */}
      <section className="py-20 bg-amber-50/30 dark:bg-amber-950/5">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
              Our Features
            </div>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl text-gray-900 dark:text-white mb-5">
              Thoughtfully Designed for Your Business
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Our AI-powered tools help you streamline operations, gain valuable insights,
              and focus on what matters most—growing your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      
      {/* Why Now? Section */}
      <WhyNow />
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
              Success Stories
            </div>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl text-gray-900 dark:text-white mb-5">
              Trusted by Innovative Companies
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              See how businesses like yours are achieving remarkable results with our automation solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-amber-50/60 dark:bg-amber-900/10 p-8 rounded-lg">
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
            
            <div className="bg-amber-50/60 dark:bg-amber-900/10 p-8 rounded-lg">
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
          </div>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-900 dark:to-orange-900">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl text-white mb-5">
              Ready to Transform Your Business?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-white/90 mb-10">
              The time to simplify your operations is now. Join innovative businesses that have already transformed their workflow.
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

const features = [
  {
    title: "AI-Powered Insights",
    description: "Leverage advanced AI to gain valuable insights into your business operations and market position.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "Secure Data Management",
    description: "Your data is protected with end-to-end encryption and secure infrastructure that meets industry standards.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    title: "Scalable Solutions",
    description: "Our platform grows with your business, from startups to enterprise-level operations with seamless scaling.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Human-in-the-Loop Controls",
    description: "Our systems ensure human input for critical decisions while automating routine tasks for maximum efficiency.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Continuous Learning",
    description: "Our automation solutions learn and improve over time, adapting to your changing business needs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    title: "Fast Implementation",
    description: "Our approach of 'think big, start small, scale fast' ensures quick wins while building toward long-term success.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

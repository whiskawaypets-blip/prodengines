'use client';

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* About Hero Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
              About Us
            </div>
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl text-gray-900 dark:text-white mb-5">
              Our Mission & Vision
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              At Productivity Engines, we help Portfolio Companies and their subsidiaries achieve operational excellence through forward-thinking automation solutions and secure, private AI.
            </p>
          </div>
        </Container>
      </section>
      
      {/* Mission Statement */}
      <section className="py-16 bg-amber-50/50 dark:bg-amber-950/5">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-medium text-center text-gray-900 dark:text-white mb-8">
              Our Mission
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                At Productivity Engines, we help Portfolio Companies and their subsidiaries achieve operational excellence through forward-thinking automation solutions and secure, private AI. Our expert team identifies and eliminates process inefficiencies, implementing scalable digital systems that drive measurable business growth — freeing your workforce to focus on innovation and success while protecting your brands and proprietary information.
              </p>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Company Overview */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-medium text-center text-gray-900 dark:text-white mb-8">
              Company Overview
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Productivity Engines specializes in developing tailored business process automation solutions that enable Portfolio Companies and their subsidiaries to streamline operations, reduce costs, and scale effectively. Our expert team utilizes the latest digital technologies to automate complex workflows, addressing intricate business challenges and delivering measurable results.
              </p>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-amber-50/50 dark:bg-amber-950/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
              Why Choose Us
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Our unique approach and values set us apart from traditional consulting firms and automation providers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">{reason.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{reason.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      
      {/* Industry Certifications & Expertise */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
              Industry Certifications & Expertise
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Our team brings a wealth of knowledge and recognized expertise to every project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-amber-50/60 dark:bg-amber-900/10 p-8 rounded-lg">
              <div className="flex items-start">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Deep Learning & Advanced AI</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our team holds certifications in Deep Learning and advanced AI technologies, ensuring we're at the forefront of implementing cutting-edge solutions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50/60 dark:bg-amber-900/10 p-8 rounded-lg">
              <div className="flex items-start">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Big Data Excellence</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    With degrees in Big Data, our experts bring a strong foundation in data-driven solutions to help your business make informed decisions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50/60 dark:bg-amber-900/10 p-8 rounded-lg">
              <div className="flex items-start">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Project Management Expertise</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our team brings extensive project management experience, delivering real, impactful results for businesses of all sizes.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50/60 dark:bg-amber-900/10 p-8 rounded-lg">
              <div className="flex items-start">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Developer Network</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We maintain a collaborative network of experienced developers specializing in cutting-edge technologies to build the most efficient solutions for your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Our Approach */}
      <section className="py-16 bg-amber-50/50 dark:bg-amber-950/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
              Our Approach
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              We believe in a methodical approach that delivers both immediate and long-term value.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-200 dark:bg-amber-800"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>
                  <div className="ml-12">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Think Big</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We start by understanding your long-term vision and business goals. Our process begins with a comprehensive assessment of your current operations, challenges, and opportunities.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                  </div>
                  <div className="ml-12">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Start Small</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We identify high-impact, low-risk areas to begin implementation. This allows us to demonstrate value quickly while establishing the foundation for broader transformation.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                  <div className="ml-12">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Scale Fast</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Once initial solutions prove successful, we rapidly expand implementation across your organization, continuously improving and adapting based on feedback and results.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                      4
                    </div>
                  </div>
                  <div className="ml-12">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Continuous Improvement</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We believe in ongoing optimization. Our solutions learn and adapt over time, ensuring your automation investments continue to deliver increasing value as your business evolves.
                    </p>
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
              Ready to Work with Us?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-white/90 mb-10">
              Let's discuss how our team can help transform your business operations and drive sustainable growth.
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

const reasons = [
  {
    title: "Proven Expertise",
    description: "Years of experience solving impactful business problems across industries with a focus on business process automation.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Scalable Solutions",
    description: "Our solutions are designed to grow with your businesses, from startups to enterprise-level operations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Usage-Based Pricing",
    description: "Pay for what you use, not for idle software or inactive employees, ensuring cost-effective solutions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Hands-on Support",
    description: "We provide comprehensive support from discovery to implementation, ensuring your success at every step.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: "Cutting-Edge Technology",
    description: "We leverage the latest technology to maximize productivity and minimize costs for your business.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Trusted Developer Network",
    description: "Access to skilled developers specializing in cutting-edge software development for efficient solutions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  }
];
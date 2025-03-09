'use client';

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivateAIPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium mb-4">
              Private & Secure AI
            </div>
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl text-gray-900 dark:text-white mb-5">
              Private & Secure Conversational AI for Portfolio Companies
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Empower your subsidiaries with AI-driven insights while keeping proprietary information secure.
            </p>
          </div>
        </Container>
      </section>
      
      {/* Overview Section */}
      <section className="py-16 bg-amber-50/50 dark:bg-amber-950/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">
                Secure Knowledge Sharing Without Compromising Security
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our private AI assistant is trained exclusively on your company's SOPs, brand guidelines, and operational documentation. This ensures that your proprietary information stays within your organization while providing instant, accurate answers to your team.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Unlike public AI tools that send your data to third-party servers, our solution keeps your sensitive information private and secure, giving you complete control over your intellectual property.
              </p>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/contact">Schedule a Consultation</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-amber-100/50 dark:bg-amber-900/10 rounded-lg p-8 h-[400px] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300 italic">Secure AI data visualization</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Key Benefits */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
              Key Benefits
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Our Private AI solution offers numerous advantages for portfolio companies and their subsidiaries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-amber-50/60 dark:bg-amber-900/10 p-8 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-amber-50/50 dark:bg-amber-950/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
              How It Works
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Our implementation process is designed to be seamless and efficient.
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
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Knowledge Collection</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We work with you to gather all relevant company documents, SOPs, guidelines, and operational information that should be included in your private AI assistant.
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
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Model Training</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our team securely processes your data and trains a custom AI model that understands your business context, terminology, and specific requirements.
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
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Deployment</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      The AI assistant is deployed to your secure environment, with customized access controls and user management to ensure the right people have the right level of access.
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
                      The AI system learns from interactions and feedback, continuously improving its responses. We provide regular updates and refinements based on usage patterns and new information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Case Study */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
                Success Story
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                See how our Private AI solution transformed operations for a multi-brand portfolio company.
              </p>
            </div>
            
            <div className="bg-amber-50/60 dark:bg-amber-900/10 p-8 rounded-lg">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
                National Franchise Group Improves Brand Consistency
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                A national franchise group with over 200 locations across multiple brands was struggling with maintaining consistent brand messaging and operational standards across all franchisees.
              </p>
              
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">The Challenge:</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Franchisees were frequently contacting corporate offices with questions about brand guidelines, operational procedures, and marketing requirements. This created a bottleneck and resulted in inconsistent application of company standards.
              </p>
              
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Our Solution:</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We implemented a private AI assistant trained on the company's full set of brand guidelines, operational manuals, and marketing materials for each of their brands. The system was deployed to all franchisees with personalized access based on their specific brand and location.
              </p>
              
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">The Results:</h4>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 mb-6">
                <li className="mb-1">82% reduction in operational support inquiries to corporate headquarters</li>
                <li className="mb-1">Improved brand consistency across all locations</li>
                <li className="mb-1">Franchisee satisfaction increased by 67%</li>
                <li className="mb-1">New franchisee onboarding time reduced by 40%</li>
                <li>Corporate team freed up to focus on strategic initiatives rather than repetitive questions</li>
              </ul>
              
              <div className="text-right italic text-gray-500 dark:text-gray-400">
                <p>* Results may vary based on implementation specifics and business context</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* FAQ */}
      <section className="py-16 bg-amber-50/50 dark:bg-amber-950/5">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-5">
              Frequently Asked Questions
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Common questions about our Private AI solution.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-900 dark:to-orange-900">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl text-white mb-5">
              Ready to Secure Your Business Knowledge?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-white/90 mb-10">
              Schedule a consultation to learn how our Private AI solution can transform your portfolio company's operations.
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

const benefits = [
  {
    title: "Data Privacy & Security",
    description: "Keep proprietary information secure and prevent data leaks by ensuring your knowledge never leaves your systems.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    title: "On-Brand Communication",
    description: "Ensure all AI-generated content maintains your brand voice, guidelines, and approved messaging.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  },
  {
    title: "24/7 Instant Access",
    description: "Provide immediate answers to franchisees and subsidiaries at any time, reducing response times and support bottlenecks.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Reduced Training Costs",
    description: "Streamline onboarding and continuous education with an AI that contains all your operational knowledge.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: "Compliance & Oversight",
    description: "Maintain full control over what information is shared, ensuring regulatory compliance and consistent messaging.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Knowledge Preservation",
    description: "Ensure critical operational knowledge is preserved even as employees leave, maintaining business continuity.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  }
];

const faqs = [
  {
    question: "How do you ensure our data remains private?",
    answer: "Our Private AI solution is deployed within your secure environment, either on-premises or in your private cloud. Your data never leaves your systems, and all training and inference happens within your controlled environment. We implement multiple layers of security, including encryption, access controls, and auditing to ensure complete data privacy."
  },
  {
    question: "How long does implementation take?",
    answer: "Implementation timelines vary based on the volume and complexity of your data, but typically range from 4-8 weeks. This includes data collection, model training, customization, and deployment. We work with your team to establish a realistic timeline based on your specific requirements."
  },
  {
    question: "Can we update the AI with new information?",
    answer: "Yes, the system is designed for continuous updates. You can add new documents, update existing information, and refine the AI's knowledge base at any time. We also provide tools for administrators to review and improve the system's responses based on user feedback."
  },
  {
    question: "How does this compare to using public AI tools like ChatGPT?",
    answer: "Unlike public AI tools where your data is sent to third-party servers and potentially used to train their models, our Private AI solution keeps your data completely private. It's also specifically trained on your company's information, ensuring accurate, on-brand responses that align with your specific policies and procedures."
  },
  {
    question: "Do we need specialized technical staff to maintain the system?",
    answer: "No, our solutions are designed with user-friendly admin interfaces that don't require specialized AI expertise. We provide comprehensive training for your team and ongoing support. For clients who prefer a fully managed solution, we offer maintenance and administration services."
  }
];
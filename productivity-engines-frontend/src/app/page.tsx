'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setIsSignedIn(!!data.session);
    };
    
    checkUser();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Productivity Engines</h1>
              </div>
            </div>
            <div className="flex items-center">
              {isSignedIn ? (
                <Link 
                  href="/dashboard" 
                  className="ml-6 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Dashboard
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  className="ml-6 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Replace Repetitive Tasks with</span>
              <span className="block text-blue-600">Scalable Automation — and Grow</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Empower your business with innovative digital solutions that boost productivity, cut costs, and fuel long-term success
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Schedule a Free Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">About Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Mission Statement
            </p>
          </div>
          <div className="mt-10">
            <p className="text-lg text-gray-500 max-w-prose mx-auto">
              At Productivity Engines, we help Portfolio Companies and their subsidiaries achieve 
              operational excellence through forward-thinking automation solutions and secure, 
              private AI. Our expert team identifies and eliminates process inefficiencies, 
              implementing scalable digital systems that drive measurable business growth — 
              freeing your workforce to focus on innovation and success while protecting your 
              brands and proprietary information.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Services</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Solutions
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We help Portfolio Companies and their subsidiaries seize new opportunities with cutting-edge 
              automation solutions — eliminating repetitive tasks, minimizing human error, and freeing your 
              most talented employees to focus on innovation, growth, and delivering greater value to your customers.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {/* Service 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">Private & Secure Conversational AI</h3>
                <p className="mt-2 text-base text-gray-500">
                  A private AI assistant trained exclusively on your company's SOPs, brand guidelines, 
                  and operational documentation. Prevents data leaks by ensuring proprietary knowledge 
                  is never shared with third-party AI LLM providers.
                </p>
              </div>

              {/* Service 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">Process Discovery & Opportunity Analysis</h3>
                <p className="mt-2 text-base text-gray-500">
                  Thorough analysis of your workflows to identify tasks that can be automated for speed, 
                  accuracy, and scalability. Highlighting where the latest technologies can replace 
                  outdated processes.
                </p>
              </div>

              {/* Service 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">Custom Automation Development</h3>
                <p className="mt-2 text-base text-gray-500">
                  Tailored automation solutions built to enhance your unique business processes. 
                  Developing intelligent systems using Agentic AI, RPA, and modern digital tools 
                  to handle time-consuming tasks with precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Productivity Engines */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Productivity Engines
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Choosing Productivity Engines means partnering with experts who harness cutting-edge 
              automation technologies, including Agentic AI, to unlock new levels of productivity, 
              innovation, and growth for your business.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Adaptive, Intelligent Automation</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our Business Process Automation solutions don't just automate tasks — they learn, 
                  adapt, and improve over time, continuously enhancing your business operations 
                  without constant reprogramming or oversight.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Human-in-the-Loop for Critical Decisions</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our systems ensure that no major task is executed without human input. Rather than 
                  employees relying on software, our solutions flip the script — automation runs the 
                  processes and calls on your employees when their expertise is needed.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Scalable Solutions That Grow With You</h3>
                <p className="mt-2 text-base text-gray-500">
                  From small process automations to enterprise-level workflows, our solutions are 
                  built to scale as your business evolves, delivering long-term operational 
                  excellence and cost savings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Now Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Why Now</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              The Time Is Now
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              The future of business is being redefined by intelligent automation. Companies that 
              embrace these technologies today will gain an unparalleled competitive edge tomorrow.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">Secure AI Is a Must for Portfolio Companies</h3>
                <p className="mt-2 text-base text-gray-500">
                  Public AI models pose a risk to proprietary business knowledge. Without a private, 
                  secure AI solution, portfolio companies and franchisors face data leaks, compliance 
                  risks, and a lack of control over AI-generated insights.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">AI Innovation Is Accelerating Rapidly</h3>
                <p className="mt-2 text-base text-gray-500">
                  Artificial Intelligence, especially Agentic AI, is evolving at breakneck speed. 
                  What was once experimental is now production-ready — offering SMBs unprecedented 
                  opportunities to enhance efficiency, reduce costs, and scale operations faster than ever before.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">Don't Fall Behind</h3>
                <p className="mt-2 text-base text-gray-500">
                  Waiting to adopt automation means giving your competitors a head start. The tools 
                  are ready, the opportunities are endless, and the time to act is now.
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Schedule a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:order-2">
              <p className="text-center text-base text-gray-400">
                &copy; 2024 Productivity Engines. All rights reserved.
              </p>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                <Link href="/login" className="text-gray-300 hover:text-white">Login</Link>
                {' | '}
                <Link href="#" className="text-gray-300 hover:text-white">Contact Us</Link>
                {' | '}
                <Link href="#" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

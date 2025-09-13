'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // EmailJS configuration with your service ID
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_85enctv',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'pauls_receipt',
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company || 'Not specified',
          position: formData.position || 'Not specified',
          message: formData.message,
          to_name: 'Paul Phelps',
          to_email: 'mrpaulphelps@gmail.com',
          reply_to: formData.email
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key'
      );

      // Redirect to thank you page
      router.push('/contact/thank-you');
    } catch (error) {
      console.error('Email send error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <section className="pt-44 pb-20 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-900 dark:to-orange-900">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white mb-6">
              Get In Touch
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-white/90">
              Ready to transform your business with AI-powered automation? 
              Let's discuss how we can help you achieve your goals.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Position
                    </Label>
                    <Input
                      id="position"
                      name="position"
                      type="text"
                      value={formData.position}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Your Position"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="Tell us about your project, challenges, or how we can help..."
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="mt-12 text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Other ways to reach us
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <p>📧 mrpaulphelps@gmail.com</p>
                <p>💼 <a 
                  href="https://www.linkedin.com/in/mrpaulphelps/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-600 dark:text-amber-400 hover:underline"
                >
                  Connect on LinkedIn
                </a></p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
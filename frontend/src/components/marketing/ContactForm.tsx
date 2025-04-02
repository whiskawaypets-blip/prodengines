'use client';

import React from 'react';
import { Button } from '@/components/ui/button'; // Reusing the existing button
import { Label } from '@/components/ui/label'; // Assuming Label might exist or we'll create it if needed
import { Input } from '@/components/ui/input'; // Assuming Input might exist or we'll style directly
import { Textarea } from '@/components/ui/textarea'; // Assuming Textarea might exist or we'll style directly

interface ContactFormProps {
  formspreeUrl: string; // Prop to receive the Formspree URL
}

export const ContactForm: React.FC<ContactFormProps> = ({ formspreeUrl }) => {
  return (
    <form action={formspreeUrl} method="POST" className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm font-medium text-white/90">Name <span className="text-red-400">*</span></Label>
        <Input 
          id="name" 
          name="name" 
          type="text" 
          required 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm bg-white/10 text-white placeholder-white/60"
          placeholder="Your Name" 
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-white/90">Email <span className="text-red-400">*</span></Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          required 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm bg-white/10 text-white placeholder-white/60"
          placeholder="you@example.com"
        />
      </div>
       <div>
        <Label htmlFor="company" className="text-sm font-medium text-white/90">Company (Optional)</Label>
        <Input 
          id="company" 
          name="company" 
          type="text" 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm bg-white/10 text-white placeholder-white/60"
          placeholder="Your Company"
        />
      </div>
       <div>
        <Label htmlFor="position" className="text-sm font-medium text-white/90">Position (Optional)</Label>
        <Input 
          id="position" 
          name="position" 
          type="text" 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm bg-white/10 text-white placeholder-white/60"
          placeholder="Your Position"
        />
      </div>
      <div>
        <Label htmlFor="message" className="text-sm font-medium text-white/90">Message <span className="text-red-400">*</span></Label>
        <Textarea 
          id="message" 
          name="message" 
          rows={4} 
          required 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm bg-white/10 text-white placeholder-white/60"
          placeholder="How can we help you?" 
        />
      </div>
      <div>
        <Button 
          type="submit" 
          className="w-full justify-center bg-white text-amber-600 hover:bg-white/90 shadow-sm"
        >
          Send Message
        </Button>
      </div>
      {/* Optional: Add hidden field for Formspree if needed for redirects */}
      {/* <input type="hidden" name="_next" value="your_thank_you_page_url" /> */}
       {/* Optional: Add honeypot field for spam protection */}
       <input type="text" name="_gotcha" style={{ display: 'none' }} />
    </form>
  );
}; 
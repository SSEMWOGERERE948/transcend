"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions about our products or custom orders? We'd love to hear from you!
          </p>
          
          <div className="space-y-6">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-purple-100 rounded-full">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">{item.label}</h3>
                  <p className="text-gray-600">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                required
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                required
                placeholder="Your message"
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

const contactInfo = [
  {
    icon: <MessageCircle className="h-6 w-6 text-purple-600" />,
    label: "WhatsApp",
    value: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "Contact us on WhatsApp",
  },
  {
    icon: <Mail className="h-6 w-6 text-purple-600" />,
    label: "Email",
    value: "hello@doda.com",
  },
  {
    icon: <MapPin className="h-6 w-6 text-purple-600" />,
    label: "Location",
    value: "Nairobi, Kenya",
  },
  {
    icon: <Phone className="h-6 w-6 text-purple-600" />,
    label: "Phone",
    value: "+254 XXX XXX XXX",
  },
];
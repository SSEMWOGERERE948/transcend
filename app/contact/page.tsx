"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const formData = {
        to_name: "Transcend Education Consultants",
        from_name: (form.elements.namedItem('name') as HTMLInputElement).value,
        from_email: (form.elements.namedItem('email') as HTMLInputElement).value,
        subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
        message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      };

      // Send email using EmailJS
      await emailjs.send(
        'service_l6z9b09',
        'template_ho8av02', // Replace with your template ID
        formData,
        'A_wu-7eXRVuAuYviq'
      );

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-16 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-800">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions about our study abroad programs or scholarship opportunities? We're here to help!
          </p>
          
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-100 rounded-full">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-blue-700">{item.label}</h3>
                  <p className="text-gray-600">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
                className="bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
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
                className="bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
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
                placeholder="Inquiry about study programs"
                className="bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
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
                className="bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

const contactInfo = [
  {
    icon: <MessageCircle className="h-6 w-6 text-blue-600" />,
    label: "WhatsApp",
    value: "+256 774 831 231",
  },
  {
    icon: <Mail className="h-6 w-6 text-blue-600" />,
    label: "Email",
    value: "transcendeducationconsults@gmail.com",
  },
  {
    icon: <MapPin className="h-6 w-6 text-blue-600" />,
    label: "Location",
    value: "Kampala, Uganda",
  },
  {
    icon: <Phone className="h-6 w-6 text-blue-600" />,
    label: "Phone",
    value: "+256 757 251 514",
  },
];


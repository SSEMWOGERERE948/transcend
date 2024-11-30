"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GraduationCap, Globe, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 text-blue-800">About Transcend Education</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Empowering students with global education opportunities, guiding them towards a brighter future through study abroad programs in China and India.
        </p>
      </motion.div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative aspect-square"
        >
          <Image
            src="/flier.png"
            alt="Students studying abroad"
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-700">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Transcend Education Consultants Limited began as a vision to connect ambitious students with world-class international education opportunities. What started as a small consultancy has grown into a trusted partner for students seeking to expand their horizons through study abroad programs in China and India.
          </p>
          <p className="text-gray-600 mb-6">
            Our team of experienced education consultants is dedicated to guiding students through every step of their journey, from program selection to visa applications and pre-departure preparation.
          </p>
          <Link href="/scholarships">
            <Button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
              Explore Our Programs
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Values Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid md:grid-cols-3 gap-8 mb-16"
      >
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            className="text-center p-6 rounded-lg border border-blue-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
              {value.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-700">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center bg-blue-50 rounded-lg p-8 shadow-md"
      >
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Ready to Start Your Journey?</h2>
        <p className="text-gray-600 mb-6">
          Explore our study abroad programs and take the first step towards your international education.
        </p>
        <Link href="/scholarships">
          <Button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
            View Programs
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

const values = [
  {
    title: "Expert Guidance",
    description: "Our experienced consultants provide personalized advice to ensure the best fit for each student.",
    icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Global Opportunities",
    description: "Access to a wide range of international programs in top institutions across China and India.",
    icon: <Globe className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Student Support",
    description: "Comprehensive assistance from application to arrival, ensuring a smooth transition for our students.",
    icon: <Users className="w-6 h-6 text-blue-600" />,
  },
];


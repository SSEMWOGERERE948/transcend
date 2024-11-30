'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GraduationCap, Globe, Users } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ImageSlider } from "@/components/ImageSlider"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[600px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-green-600/70" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute inset-0 bg-[url('/world-map.svg')] bg-repeat"
          style={{ backgroundSize: '500px 500px' }}
        />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
          >
            Transform Your Future with Global Education
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-md"
          >
            Transcend Education Consultants Limited: Your trusted partner for study abroad opportunities in China and India
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <Link href="/scholarships">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Explore Scholarships
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Featured Programs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Featured Scholarship Programs
        </motion.h2>
        <div className="overflow-hidden">
          <ImageSlider images={featuredPrograms} />
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold mb-6"
          >
            Why Trust Transcend Education Consultants?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8"
          >
            With years of experience and a track record of successful placements, we're committed to helping you achieve your educational goals. Our partnerships with top institutions in China and India ensure that you receive quality education and valuable international experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Learn More About Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Community Group CTA */}
      <section className="bg-blue-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold mb-6"
          >
            Join Our Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8"
          >
            Connect with fellow students, alumni, and our team. Get insider tips, support, and stay updated on the latest scholarship opportunities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="https://chat.whatsapp.com/CXWVXOch3za9vs7LcyLju5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Join Our Community on WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const featuredPrograms = [
  {
    id: 1,
    name: "Full Scholarship in China",
    description: "Join hundreds of African students pursuing their dreams at top Chinese universities",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200",
  },
  {
    id: 2,
    name: "Medical Studies in India",
    description: "Study medicine, engineering, and more at prestigious Indian institutions",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200",
  },
  {
    id: 3,
    name: "Graduate Programs",
    description: "Master's and PhD opportunities with full funding and research positions",
    image: "https://images.unsplash.com/photo-1627556704302-624286467c65?q=80&w=1200",
  },
  {
    id: 4,
    name: "Campus Life Abroad",
    description: "Experience rich cultural exchange and world-class facilities",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
  }
]

const features = [
  {
    title: "Expert Guidance",
    description: "Personalized advice from experienced education consultants",
    icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Global Opportunities",
    description: "Access to a wide range of international programs",
    icon: <Globe className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Student Community",
    description: "Join a network of like-minded international students",
    icon: <Users className="w-6 h-6 text-blue-600" />,
  },
]


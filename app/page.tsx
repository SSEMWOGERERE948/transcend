'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ShoppingBag, Star } from 'lucide-react'
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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-pink-600/70" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute inset-0 bg-[url('/animated-dots.svg')] bg-repeat"
          style={{ backgroundSize: '100px 100px' }}
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
            Every Stitch, Tells a Story
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-md"
          >
            Discover handcrafted crochet pieces that bring warmth and style to your everyday life
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <Link href="/products">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Explore Collection
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Featured Products
        </motion.h2>
        <ImageSlider images={featuredProducts} />
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
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

const featuredProducts = [
  {
    id: 1,
    name: "Reggae Top",
    description: "Hand-crocheted top perfect for beach",
    image: "/crochet_top2.jpg",
  },
  {
    id: 2,
    name: "Beach Bag",
    description: "Stylish and spacious crocheted beach bag",
    image: "/bag.jpg",
  },
  {
    id: 3,
    name: "Summer Top",
    description: "Light and airy crocheted top for summer days",
    image: "/crochet_piece2.jpg",
  },
]

const features = [
  {
    title: "Handmade with Love",
    description: "Each piece is carefully crafted with attention to detail",
    icon: <Heart className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Custom Orders",
    description: "Get personalized items made just for you",
    icon: <Star className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Quality Materials",
    description: "Only the finest yarns and materials used",
    icon: <ShoppingBag className="w-6 h-6 text-purple-600" />,
  },
]


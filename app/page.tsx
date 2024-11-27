"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1604509863374-fb56c8bbf8e0?q=80&w=2070"
          alt="Crocheted products"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Crafting Joy, One Stitch at a Time
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">
            Discover handcrafted crochet pieces that bring warmth and style to your everyday life
          </p>
          <Link href="/products">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Explore Collection
          </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const featuredProducts = [
  {
    id: 1,
    name: "Cozy Sweater",
    description: "Hand-crocheted sweater perfect for chilly evenings",
    image: "https://images.unsplash.com/photo-1584811644165-33ab9b0809a5?q=80&w=1969",
  },
  {
    id: 2,
    name: "Beach Bag",
    description: "Stylish and spacious crocheted beach bag",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2076",
  },
  {
    id: 3,
    name: "Summer Top",
    description: "Light and airy crocheted top for summer days",
    image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1779",
  },
];

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
];
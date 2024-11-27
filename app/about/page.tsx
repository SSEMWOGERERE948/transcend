import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, Package, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">About Doda</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Crafting joy through handmade crochet pieces, bringing warmth and style to your everyday life.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative aspect-square">
          <Image
            src="https://images.unsplash.com/photo-1584811644165-33ab9b0809a5?q=80&w=1969"
            alt="Crocheting"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Doda began as a passion project, born from the love of creating beautiful, handcrafted 
            pieces that bring joy to people's lives. What started as a hobby has blossomed into a 
            thriving business, dedicated to sharing the art of crochet with the world.
          </p>
          <p className="text-gray-600 mb-6">
            Each piece is carefully crafted with attention to detail and love, ensuring that every 
            customer receives a unique, high-quality product that they'll cherish for years to come.
          </p>
          <Link href="/products">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Explore Our Collection
            </Button>
          </Link>
        </div>
      </div>

      {/* Values Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {values.map((value) => (
          <div
            key={value.title}
            className="text-center p-6 rounded-lg border hover:shadow-lg transition-shadow"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-4">
              {value.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center bg-purple-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
        <p className="text-gray-600 mb-6">
          Discover our collection of handmade crochet pieces and find your perfect match.
        </p>
        <Link href="/products">
          <Button className="bg-purple-600 hover:bg-purple-700">
            View Products
          </Button>
        </Link>
      </div>
    </div>
  );
}

const values = [
  {
    title: "Handcrafted with Love",
    description: "Every piece is made with care and attention to detail, ensuring the highest quality.",
    icon: <Heart className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Quality Materials",
    description: "We use only the finest yarns and materials to create long-lasting pieces.",
    icon: <Sparkles className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Custom Orders",
    description: "Get personalized items made just for you, tailored to your preferences.",
    icon: <Package className="w-6 h-6 text-purple-600" />,
  },
];
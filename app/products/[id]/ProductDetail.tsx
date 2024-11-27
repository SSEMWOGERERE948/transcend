// ProductDetail.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetail({ 
  initialProduct 
}: { 
  initialProduct: Product 
}) {
  const [product] = useState<Product>(initialProduct);

  return (
    <div className="container mx-auto py-8">
      <Link href="/products">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{product.category}</Badge>
              {product.inStock ? (
                <Badge variant="secondary">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-purple-600">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <WhatsAppButton product={product} />
        </div>
      </div>
    </div>
  );
}
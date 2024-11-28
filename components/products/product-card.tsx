"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WhatsAppButton } from '@/components/whatsapp-button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{product.category}</Badge>
          {product.inStock ? (
            <Badge variant="secondary">In Stock</Badge>
          ) : (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <p className="text-xl font-bold text-purple-600">ugx{product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <WhatsAppButton product={product} compact />
      </CardFooter>
    </Card>
  );
}
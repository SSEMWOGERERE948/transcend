"use client";

import { Button } from '@/components/ui/button';
import { Product } from '@/lib/scholarships';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  product: Product;
  compact?: boolean;
}

export function WhatsAppButton({ product, compact = false }: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in purchasing "${product.name}" for $${product.price}`;
    const whatsappNumber = "+256 726 219235";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className={`bg-green-600 hover:bg-green-700 ${compact ? 'w-auto' : 'w-full'}`}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      {compact ? 'Buy' : 'Buy via WhatsApp'}
    </Button>
  );
}
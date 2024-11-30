"use client";

import { Button } from '@/components/ui/button';
import { Scholarship } from '@/lib/scholarships';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  scholarship: Scholarship;
  compact?: boolean;
}

export function WhatsAppButton({ scholarship, compact = false }: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const message = `Hello! I'm interested in applying for the "${scholarship.name}" scholarship. Could you please provide more information about the application process?`;
    const whatsappNumber = "+256 774 831 231";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className={`bg-green-600 hover:bg-green-700 ${compact ? 'w-auto' : 'w-full'}`}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      {compact ? 'Inquire' : 'Inquire via WhatsApp'}
    </Button>
  );
}
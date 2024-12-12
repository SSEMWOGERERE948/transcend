"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Scholarship } from '@/lib/scholarships';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { differenceInDays, isBefore } from 'date-fns';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const deadline = new Date(scholarship.deadline);
    const today = new Date();
    const diff = differenceInDays(deadline, today);
    setDaysRemaining(Math.max(diff, 0));
    setIsExpired(isBefore(deadline, today));
  }, [scholarship.deadline]);

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={scholarship.imageUrl}
          alt={scholarship.name}
          fill
          className="object-cover transition-transform hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{scholarship.country}</Badge>
          {scholarship.isOpen ? (
            <Badge variant="secondary">Open</Badge>
          ) : (
            <Badge variant="destructive">Closed</Badge>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2">{scholarship.name}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{scholarship.description}</p>
        <p className="text-xl font-bold text-blue-600">{scholarship.fundingType}</p>
        <p className="text-sm font-semibold mb-2">
          {isExpired ? (
            <span className="text-red-500">Application Closed</span>
          ) : (
            `${daysRemaining} days remaining`
          )}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/scholarships/${scholarship.id}`} className="w-full">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isExpired || !scholarship.isOpen}
          >
            {isExpired || !scholarship.isOpen ? 'Applications Closed' : 'Learn More'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}


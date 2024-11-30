"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Scholarship } from '@/lib/scholarships';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ApplicationForm } from '@/components/scholarships/application-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ScholarshipDetail({ 
  initialScholarship 
}: { 
  initialScholarship: Scholarship 
}) {
  const [scholarship] = useState<Scholarship>(initialScholarship);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <Link href="/scholarships">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Scholarships
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-video">
          <Image
            src={scholarship.imageUrl}
            alt={scholarship.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{scholarship.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{scholarship.country}</Badge>
              <Badge variant="secondary">{scholarship.level}</Badge>
              {scholarship.isOpen ? (
                <Badge variant="secondary">Open for Applications</Badge>
              ) : (
                <Badge variant="destructive">Closed</Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {scholarship.fundingType}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{scholarship.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Requirements</h2>
            <ul className="list-disc list-inside text-gray-600">
              {scholarship.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Application Deadline</h2>
            <p className="text-gray-600">{new Date(scholarship.deadline).toLocaleDateString()}</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={!scholarship.isOpen}>
                {scholarship.isOpen ? 'Apply Now' : 'Applications Closed'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Apply for {scholarship.name}</DialogTitle>
                <DialogDescription>
                  Please fill out the application form below.
                </DialogDescription>
              </DialogHeader>
              <ApplicationForm scholarshipId={scholarship.id} scholarshipName={scholarship.name} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}


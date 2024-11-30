"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scholarship, getScholarships } from '@/lib/scholarships';
import { ApplicationForm } from '@/components/scholarships/application-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ApplyPage({ params }: { params: { id: string } }) {
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadScholarship = async () => {
      const scholarships = await getScholarships();
      const found = scholarships.find(s => s.id === params.id);
      if (!found) {
        router.push('/scholarships');
        return;
      }
      setScholarship(found);
    };

    loadScholarship();
  }, [params.id, router]);

  if (!scholarship) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Apply for {scholarship.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <ApplicationForm
            scholarshipId={scholarship.id}
            scholarshipName={scholarship.name}
          />
        </CardContent>
      </Card>
    </div>
  );
}


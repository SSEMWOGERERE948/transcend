"use client";

import { useEffect, useState } from 'react';
import { ApplicationForm } from '@/components/scholarships/application-form';
import { getScholarshipById } from '@/lib/scholarships';

export default function ApplyPage({ params }: { params: { scholarship_id: string } }) {
  const [scholarship, setScholarship] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadScholarship() {
      try {
        const data = await getScholarshipById(params.scholarship_id);
        setScholarship(data);
      } catch (error) {
        console.error('Error loading scholarship:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadScholarship();
  }, [params.scholarship_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!scholarship) {
    return <div>Scholarship not found</div>;
  }

  return (
    <ApplicationForm 
      scholarshipId={params.scholarship_id}
      scholarshipName={scholarship.name || 'Scholarship'}
    />
  );
}
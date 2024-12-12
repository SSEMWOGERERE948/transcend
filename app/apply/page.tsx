'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';
import { submitApplication } from '@/lib/scholarships';
import { LoginButton } from '@/components/auth/login-button';
import { toast } from 'sonner';

interface Scholarship {
  deadline: string;
  degree: string;
  graduation_year: string;
  language: string;
  program: string;
  scholarship_id: string;
  semester: string;
  type: string;
  university: string;
}

function ApplyNowPageContent() {
  const searchParams = useSearchParams();
  const scholarshipId = searchParams?.get('scholarshipId');
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    phone: string;
    address: string;
    highestLevelOfStudy: "O-Level" | "A-Level" | "Bachelor" | "Master" | "PhD" | "";
    budget: string;
  }>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    highestLevelOfStudy: '',
    budget: '',
  });

  const [photo, setPhoto] = useState<File | null>(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      if (scholarshipId) {
        try {
          setLoading(true);
          const response = await fetch(`/scholarship.json`);
          if (!response.ok) {
            throw new Error('Failed to fetch scholarships');
          }

          const scholarships: Scholarship[] = await response.json();
          const fetchedScholarship = scholarships.find(
            (s) => s.scholarship_id === scholarshipId
          );

          if (fetchedScholarship) {
            setScholarship(fetchedScholarship);
          } else {
            setError('Scholarship not found');
          }
        } catch (err) {
          setError('Failed to fetch scholarship');
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setError('Scholarship ID not found in URL');
      }
    };

    fetchScholarship();
  }, [scholarshipId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scholarship || !photo) return;

    try {
      setLoading(true);
      const applicationData = {
        scholarshipId: scholarship.scholarship_id,
        userId: user?.uid,
        applicantName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        highestLevelOfStudy: formData.highestLevelOfStudy,
        budget: Number(formData.budget),
      };

      await submitApplication(applicationData as any, photo);

      // Toast notification
      toast.success('Application Submitted Successfully!', {
        description: `Your application for the ${scholarship.program} scholarship has been received. We'll review it and contact you soon.`,
        duration: 5000,
        position: 'top-right',
      });

      router.push('/scholarships');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to Submit Application', {
        description: 'Please check your information and try again.',
        duration: 5000,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">{error}</h1>
        <Link href="/scholarships">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Scholarships
          </Button>
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Please sign in to apply</h1>
        <LoginButton />
      </div>
    );
  }

  if (!scholarship) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-primary">{`Apply for ${scholarship.program}`}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block font-medium mb-1">Full Name</label>
            <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium mb-1">Phone</label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="address" className="block font-medium mb-1">Address</label>
            <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="highestLevelOfStudy" className="block font-medium mb-1">Highest Level of Study</label>
            <select
              id="highestLevelOfStudy"
              name="highestLevelOfStudy"
              value={formData.highestLevelOfStudy}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select</option>
              <option value="O-Level">O-Level</option>
              <option value="A-Level">A-Level</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="PhD">PhD</option>
            </select>

          </div>
          <div>
            <label htmlFor="budget" className="block font-medium mb-1">Budget</label>
            <Input id="budget" name="budget" type="number" value={formData.budget} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="photo" className="block font-medium mb-1">Upload A Photo For Your Highest Education Certificate</label>
            <div className="flex items-center space-x-2">
              <Input
                id="photo"
                type="file"
                onChange={handlePhotoChange}
                accept="image/*"
                required
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {photo && (
                <span className="text-sm text-muted-foreground">
                  {photo.name}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center pt-6">
            <Link href="/scholarships">
              <Button variant="outline" type="button">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default function ApplyNowPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplyNowPageContent />
    </Suspense>
  );
}

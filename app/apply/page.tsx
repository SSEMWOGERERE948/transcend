'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ApplyNow } from '@/components/apply';
import { useAuth } from '@/contexts/auth-context';
import { LoginButton } from '@/components/LoginButton';
import { getScholarships, Scholarship } from '@/lib/scholarships';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ApplyNowPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      if (id) {
        try {
          const fetchedScholarships = await getScholarships();
          const fetchedScholarship = fetchedScholarships.find(s => s.id === id);
          if (fetchedScholarship) {
            setScholarship(fetchedScholarship);
          } else {
            setError('Scholarship not found');
          }
        } catch (err) {
          setError('Failed to fetch scholarship');
        }
      }
    };

    fetchScholarship();
  }, [id]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto py-16 text-center"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-blue-600 font-semibold">Loading...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="container mx-auto py-16 text-center"
      >
        <h1 className="text-3xl font-bold text-red-600 mb-4">{error}</h1>
        <Link href="/scholarships">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Scholarships
          </Button>
        </Link>
      </motion.div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="container mx-auto py-16 text-center"
      >
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Sign In Required</h1>
        <p className="text-xl text-gray-600 mb-8">Please sign in to apply for scholarships</p>
        <LoginButton />
      </motion.div>
    );
  }

  if (!scholarship) {
    return null; // This will prevent flickering as we're handling the error case above
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <Link href={`/scholarships/${id}`}>
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Scholarship Details
        </Button>
      </Link>
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Apply for {scholarship.name}</h1>
      <ApplyNow scholarshipId={scholarship.id} scholarshipName={scholarship.name} />
    </motion.div>
  );
}


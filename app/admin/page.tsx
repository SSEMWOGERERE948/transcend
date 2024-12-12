"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import { Scholarship, getScholarships } from '@/lib/scholarships';
import { AdminScholarshipList } from '@/components/admin/scholarship-list';
import { AdminScholarshipForm } from '@/components/admin/scholarship-form';
import { Button } from '@/components/ui/button';
import { GraduationCap, PlusCircle, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApplicationsList } from '@/components/admin/applications-list';
import { UploadScholarshipsButton } from '@/components/admin/upload-scholarships-button';

export default function AdminDashboard() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
      return;
    }

    const loadScholarships = async () => {
      try {
        const fetchedScholarships = await getScholarships();
        setScholarships(fetchedScholarships);
      } catch (error) {
        console.error('Error loading scholarships:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadScholarships();
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800">Admin Dashboard</h1>
        {/* <UploadScholarshipsButton /> */}
      </div>
      
      <Tabs defaultValue="scholarships" className="space-y-8">
        <TabsList className="bg-blue-100 p-1 rounded-lg">
          {/* <TabsTrigger value="scholarships" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <GraduationCap className="w-5 h-5 mr-2" />
            Scholarships
          </TabsTrigger> */}
          <TabsTrigger value="applications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Users className="w-5 h-5 mr-2" />
            Applications
          </TabsTrigger>
          {/* <TabsTrigger value="add" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Scholarship
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="scholarships">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-blue-600 font-semibold">Loading scholarships...</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AdminScholarshipList scholarships={scholarships} setScholarships={setScholarships} />
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="applications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ApplicationsList />
          </motion.div>
        </TabsContent>

        <TabsContent value="add">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AdminScholarshipForm
              onSuccess={(newScholarship) => {
                setScholarships([...scholarships, newScholarship]);
              }}
            />
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}


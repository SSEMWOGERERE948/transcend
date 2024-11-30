"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitApplication } from '@/lib/scholarships';

const applicationSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  highestLevelOfStudy: z.enum(['O-Level', 'A-Level', 'Bachelor', 'Master', 'PhD']),
  aLevelCombination: z.string().optional(),
  aLevelPoints: z.number().optional(),
  budget: z.number().min(0, 'Budget must be a positive number'),
});

interface ApplyNowProps {
  scholarshipId: string;
  scholarshipName: string;
}

export function ApplicationForm({ scholarshipId, scholarshipName }: ApplyNowProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      highestLevelOfStudy: 'Bachelor',
      budget: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof applicationSchema>) => {
    if (!photo) {
      toast({
        title: "Error",
        description: "Please upload your photo",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const applicationData = {
        scholarshipId,
        applicantName: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        highestLevelOfStudy: values.highestLevelOfStudy,
        budget: values.budget,
        ...(values.aLevelCombination ? { aLevelCombination: values.aLevelCombination } : {}),
        ...(values.aLevelPoints ? { aLevelPoints: values.aLevelPoints } : {}),
      };

      await submitApplication(applicationData, photo);

      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      });

      router.push('/scholarships');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="text-3xl font-bold text-center mb-8">Apply for {scholarshipName}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="highestLevelOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Highest Level of Study</FormLabel>
                <FormControl>
                  <select {...field} className="w-full p-2 border rounded">
                    <option value="O-Level">O-Level</option>
                    <option value="A-Level">A-Level</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="PhD">PhD</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget (in local currency)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Upload Photo</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            />
            <FormDescription>
              Please upload your photo.
            </FormDescription>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
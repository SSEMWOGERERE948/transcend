"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Scholarship, addScholarship, updateScholarship } from '@/lib/scholarships';
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
import { Switch } from '@/components/ui/switch';

const scholarshipSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  country: z.string().min(1, 'Country is required'),
  level: z.string().min(1, 'Level is required'),
  fundingType: z.string().min(1, 'Funding type is required'),
  requirements: z.string().min(1, 'Requirements are required'),
  deadline: z.string().min(1, 'Deadline is required'),
  isOpen: z.boolean(),
});

interface AdminScholarshipFormProps {
  scholarship?: Scholarship;
  onSuccess: (scholarship: Scholarship) => void;
}

export function AdminScholarshipForm({ scholarship, onSuccess }: AdminScholarshipFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof scholarshipSchema>>({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
      name: scholarship?.name || '',
      description: scholarship?.description || '',
      country: scholarship?.country || '',
      level: scholarship?.level || '',
      fundingType: scholarship?.fundingType || '',
      requirements: scholarship?.requirements.join('\n') || '',
      deadline: scholarship?.deadline || '',
      isOpen: scholarship?.isOpen ?? true,
    },
  });

  const onSubmit = async (values: z.infer<typeof scholarshipSchema>) => {
    try {
      setIsLoading(true);

      const scholarshipData = {
        name: values.name,
        description: values.description,
        country: values.country,
        level: values.level,
        fundingType: values.fundingType,
        requirements: values.requirements.split('\n').filter(req => req.trim() !== ''),
        deadline: values.deadline,
        isOpen: values.isOpen,
        imageUrl: scholarship?.imageUrl || '',
      };

      let result;
      if (scholarship) {
        result = await updateScholarship(scholarship.id, scholarshipData, imageFile || undefined);
      } else {
        if (!imageFile) {
          throw new Error('Image is required for new scholarships');
        }
        result = await addScholarship(scholarshipData, imageFile);
      }

      onSuccess(result as Scholarship);
      form.reset();
      setImageFile(null);
    } catch (error) {
      console.error('Error saving scholarship:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scholarship Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Undergraduate, Masters, PhD" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fundingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Funding Type</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Full Scholarship, Partial Scholarship" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter each requirement on a new line" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Deadline</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isOpen"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Open for Applications</FormLabel>
                <FormDescription>
                  Mark if this scholarship is currently accepting applications
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Scholarship Image</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          {scholarship && !imageFile && (
            <p className="text-sm text-gray-500">
              Leave empty to keep the existing image
            </p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : scholarship ? 'Update Scholarship' : 'Add Scholarship'}
        </Button>
      </form>
    </Form>
  );
}


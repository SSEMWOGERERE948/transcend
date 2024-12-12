"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { uploadScholarshipsFromJSON, ScholarshipJSON } from '@/lib/scholarships';

export function UploadScholarshipsButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      
      // Fetch the JSON file
      const response = await fetch('/scholarship.json');
      const scholarships: ScholarshipJSON[] = await response.json();

      // Upload scholarships to Firebase
      await uploadScholarshipsFromJSON(scholarships);

      toast({
        title: 'Success',
        description: 'Scholarships uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading scholarships:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload scholarships',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleUpload} 
      disabled={isLoading}
      className="bg-green-600 hover:bg-green-700"
    >
      {isLoading ? 'Uploading...' : 'Upload Scholarships from JSON'}
    </Button>
  );
} 
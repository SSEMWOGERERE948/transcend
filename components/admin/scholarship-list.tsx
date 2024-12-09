"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Scholarship, deleteScholarship } from '@/lib/scholarships';
import { Button } from '@/components/ui/button';
import { AdminScholarshipForm } from './scholarship-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AdminScholarshipListProps {
  scholarships: Scholarship[];
  setScholarships: (scholarships: Scholarship[]) => void;
}

export function AdminScholarshipList({ scholarships, setScholarships }: AdminScholarshipListProps) {
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);

  const handleDelete = async (scholarship: Scholarship) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      try {
        await deleteScholarship(scholarship.id);
        setScholarships(scholarships.filter((s) => s.id !== scholarship.id));
      } catch (error) {
        console.error('Error deleting scholarship:', error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {scholarships.map((scholarship) => (
        <Card key={scholarship.id}>
          <CardHeader>
            <div className="relative aspect-video mb-4">
              <Image
                src={scholarship.imageUrl}
                alt={scholarship.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <CardTitle>{scholarship.name}</CardTitle>
            <CardDescription>{scholarship.country} - {scholarship.level}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">{scholarship.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{scholarship.fundingType}</Badge>
              <Badge variant={scholarship.isOpen ? "secondary" : "destructive"}>
                {scholarship.isOpen ? "Open" : "Closed"}
              </Badge>
            </div>
            <p className="text-sm font-semibold mb-2">Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</p>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={() => setEditingScholarship(scholarship)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Scholarship</DialogTitle>
                    <DialogDescription>
                      Make changes to the scholarship details below.
                    </DialogDescription>
                  </DialogHeader>
                  {editingScholarship && (
                    <AdminScholarshipForm
                      scholarship={editingScholarship}
                      onSuccess={(updatedScholarship) => {
                        setScholarships(
                          scholarships.map((s) =>
                            s.id === updatedScholarship.id ? updatedScholarship : s
                          )
                        );
                        setEditingScholarship(null);
                      }}
                    />
                  )}
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                size="sm"
                className="flex items-center"
                onClick={() => handleDelete(scholarship)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
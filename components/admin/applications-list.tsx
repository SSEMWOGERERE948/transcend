"use client";

import React, { useState, useEffect } from 'react';
import { getApplications, ScholarshipApplication, updateApplicationStatus, getScholarshipById, Scholarship } from '@/lib/scholarships';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export function ApplicationsList() {
  const [applications, setApplications] = useState<ScholarshipApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState<Record<string, Scholarship>>({});

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const fetchedApplications = await getApplications();
        setApplications(fetchedApplications);
        
        const scholarshipsMap: Record<string, Scholarship> = {};
        await Promise.all(
          fetchedApplications.map(async (application) => {
            const scholarship = await getScholarshipById(application.scholarshipId);
            if (scholarship) {
              scholarshipsMap[application.scholarshipId] = scholarship;
            }
          })
        );
        setScholarships(scholarshipsMap);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load applications',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [toast]);

  const handleStatusChange = async (applicationId: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
      
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));

      toast({
        title: 'Success',
        description: `Application status updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update application status',
        variant: 'destructive'
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  if (isLoading) {
    return <div>Loading applications...</div>;
  }

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-bold">Scholarship Applications</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {applications.map((application) => (
            <AccordionItem key={application.id} value={application.id} className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between items-center w-full">
                  <span className="font-semibold">{application.applicantName}</span>
                  <Badge variant={getStatusBadgeVariant(application.status)} className="capitalize">
                    {application.status}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-muted rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-4">Scholarship Details</h4>
                      {scholarships[application.scholarshipId] ? (
                        <div className="space-y-2">
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Name</span>
                            <span className="font-medium">{scholarships[application.scholarshipId].name}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Country</span>
                            <span className="font-medium">{scholarships[application.scholarshipId].country}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Level</span>
                            <span className="font-medium">{scholarships[application.scholarshipId].level}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Funding Type</span>
                            <span className="font-medium">{scholarships[application.scholarshipId].fundingType}</span>
                          </p>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Scholarship details not available</p>
                      )}
                    </div>

                    <div className="bg-muted rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-4">Applicant Details</h4>
                      <div className="space-y-2">
                        <p className="flex justify-between">
                          <span className="text-muted-foreground">Email</span>
                          <span className="font-medium">{application.email}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-muted-foreground">Phone</span>
                          <span className="font-medium">{application.phone}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-muted-foreground">Education</span>
                          <span className="font-medium">{application.highestLevelOfStudy}</span>
                        </p>
                        {application.highestLevelOfStudy === 'A-Level' && (
                          <>
                            <p className="flex justify-between">
                              <span className="text-muted-foreground">A-Level Combination</span>
                              <span className="font-medium">{application.aLevelCombination}</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-muted-foreground">A-Level Points</span>
                              <span className="font-medium">{application.aLevelPoints}</span>
                            </p>
                          </>
                        )}
                        <p className="flex justify-between">
                          <span className="text-muted-foreground">Budget</span>
                          <span className="font-medium">UGX {application.budget}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-muted rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-4">Education Certificate</h4>
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="cursor-pointer transition-transform hover:scale-105">
                            <Image 
                              src={application.photoUrl} 
                              alt={`${application.applicantName}'s education certificate`}
                              width={400}
                              height={300}
                              className="rounded-lg object-contain w-full"
                            />
                            <p className="text-sm text-muted-foreground text-center mt-2">
                              Click to view full size
                            </p>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <Image 
                            src={application.photoUrl} 
                            alt={`${application.applicantName}'s education certificate`}
                            width={800}
                            height={600}
                            className="rounded-lg object-contain w-full"
                          />
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="bg-muted rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-4">Application Status</h4>
                      <Select 
                        value={application.status}
                        onValueChange={(value) => 
                          handleStatusChange(
                            application.id, 
                            value as 'pending' | 'approved' | 'rejected'
                          )
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Change Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}


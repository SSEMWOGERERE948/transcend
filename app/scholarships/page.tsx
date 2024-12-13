"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface Scholarship {
  scholarship_id: string;
  degree: string;
  graduation_year: string;
  language: string;
  program: string;
  semester: string;
  type: string;
  university: string;
  deadline: string;
}

export default function ScholarshipsTablePage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [allScholarships, setAllScholarships] = useState<Scholarship[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Open" | "Closed">("All");
  const [degreeFilter, setDegreeFilter] = useState<string>("All");
  const router = useRouter();

  const pageSize = 10;

  const getScholarshipStatus = (deadline: string): "Open" | "Closed" => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    return deadlineDate >= today ? "Open" : "Closed";
  };

  const loadAllScholarships = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/scholarship.json");
      if (!response.ok) {
        throw new Error("Failed to load scholarships.json");
      }
      const allScholarshipsData: Scholarship[] = await response.json();

      setAllScholarships(allScholarshipsData);
      setFilteredScholarships(allScholarshipsData);
      setTotalPages(Math.ceil(allScholarshipsData.length / pageSize));
      setScholarships(allScholarshipsData.slice(0, pageSize));
    } catch (error) {
      console.error("Error loading scholarships:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadScholarshipsForPage = (page: number, data: Scholarship[] = filteredScholarships) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    setScholarships(data.slice(startIndex, endIndex));
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterScholarships(query, statusFilter, degreeFilter);
  };

  const handleStatusFilter = (status: "All" | "Open" | "Closed") => {
    setStatusFilter(status);
    filterScholarships(searchQuery, status, degreeFilter);
  };

  const handleDegreeFilter = (degree: string) => {
    setDegreeFilter(degree);
    filterScholarships(searchQuery, statusFilter, degree);
  };

  const filterScholarships = (query: string, status: "All" | "Open" | "Closed", degree: string) => {
    const filtered = allScholarships.filter((scholarship) => {
      const matchesQuery = Object.values(scholarship).some((value) =>
        value.toLowerCase().includes(query.toLowerCase())
      );
      const matchesStatus = status === "All" || getScholarshipStatus(scholarship.deadline) === status;
      const matchesDegree = degree === "All" || scholarship.degree === degree;
      return matchesQuery && matchesStatus && matchesDegree;
    });

    setFilteredScholarships(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
    loadScholarshipsForPage(1, filtered);
  };

  useEffect(() => {
    loadAllScholarships();
  }, []);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleApply = (scholarshipId: string, status: "Open" | "Closed") => {
    if (status === "Open") {
      router.push(`/apply?scholarshipId=${scholarshipId}`);
    }
  };

  const degreeOptions = ["All Degrees", "Bachelor", "Master", "PhD"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Scholarships
          {isLoading ? " (Loading...)" : ` (${allScholarships.length} total)`}
        </CardTitle>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search scholarships..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="
              pl-4 pr-10 py-2 
              w-full 
              border border-gray-300 
              rounded-lg 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:border-transparent 
              transition-all 
              duration-300 
              ease-in-out
            "
          />
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value as "All" | "Open" | "Closed")}
            className="
              pl-4 pr-10 py-2
              border border-gray-300
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
              transition-all
              duration-300
              ease-in-out
            "
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          <select
            value={degreeFilter}
            onChange={(e) => handleDegreeFilter(e.target.value)}
            className="
              pl-4 pr-10 py-2
              border border-gray-300
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
              transition-all
              duration-300
              ease-in-out
            "
          >
            {degreeOptions.map((degree) => (
              <option key={degree} value={degree}>
                {degree}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Degree</TableHead>
              <TableHead>Graduation Year</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Scholarship ID</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scholarships.map((scholarship) => {
              const status = getScholarshipStatus(scholarship.deadline);
              return (
                <TableRow key={scholarship.scholarship_id}>
                  <TableCell>{scholarship.degree}</TableCell>
                  <TableCell>{scholarship.graduation_year}</TableCell>
                  <TableCell>{scholarship.language}</TableCell>
                  <TableCell>{scholarship.program}</TableCell>
                  <TableCell>{scholarship.scholarship_id}</TableCell>
                  <TableCell>{scholarship.semester}</TableCell>
                  <TableCell>{scholarship.type}</TableCell>
                  <TableCell>{scholarship.university}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        status === "Open"
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }
                    >
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell>{scholarship.deadline}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="default"
                      disabled={status === "Closed"}
                      onClick={() => handleApply(scholarship.scholarship_id, status)}
                    >
                      Apply
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="flex justify-center items-center mt-4 space-x-2">
          <Button
            onClick={() => loadScholarshipsForPage(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            variant="outline"
            size="icon"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {getPageNumbers().map((pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => loadScholarshipsForPage(pageNumber)}
              variant={currentPage === pageNumber ? "default" : "outline"}
              disabled={isLoading}
            >
              {pageNumber}
            </Button>
          ))}

          <Button
            onClick={() => loadScholarshipsForPage(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            variant="outline"
            size="icon"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


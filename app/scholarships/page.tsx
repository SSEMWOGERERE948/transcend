"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Scholarship, getScholarships } from '@/lib/scholarships';
import { ScholarshipCard } from '@/components/scholarships/scholarship-card';
import { ScholarshipFilter } from '@/components/scholarships/scholarship-filter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScholarships = async () => {
      try {
        const fetchedScholarships = await getScholarships();
        setScholarships(fetchedScholarships);
        setFilteredScholarships(fetchedScholarships);
      } catch (error) {
        console.error('Error loading scholarships:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadScholarships();
  }, []);

  useEffect(() => {
    let filtered = scholarships;

    if (selectedCountry !== 'all') {
      filtered = filtered.filter(scholarship => scholarship.country === selectedCountry);
    }

    if (searchQuery) {
      filtered = filtered.filter(scholarship =>
        scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredScholarships(filtered);
  }, [selectedCountry, searchQuery, scholarships]);

  const countries = ['all', ...Array.from(new Set(scholarships.map(scholarship => scholarship.country)))];

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="animate-pulse text-2xl font-semibold text-blue-600"
        >
          Loading scholarships...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-800">Available Scholarships</h1>
      
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search scholarships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-blue-400" />
        </div>
        <ScholarshipFilter
          countries={countries}
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
        />
      </div>

      {filteredScholarships.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <p className="text-xl text-gray-600">No scholarships found. Please try a different search or filter.</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredScholarships.map((scholarship, index) => (
            <motion.div
              key={scholarship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ScholarshipCard scholarship={scholarship} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}


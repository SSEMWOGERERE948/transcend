import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function ApplicationSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center"
    >
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Application Submitted Successfully!</h1>
      <p className="text-xl text-gray-600 mb-8">
        Thank you for applying. We have received your application and will review it shortly.
      </p>
      <Link href="/scholarships">
        <Button className="bg-blue-600 hover:bg-blue-700">
          Back to Scholarships
        </Button>
      </Link>
    </motion.div>
  );
}


import ScholarshipDetail from '@/components/ScholarshipDetail';
import { getScholarships } from '@/lib/scholarships';

export default async function Page({ params }: { params: { id: string } }) {
  const scholarships = await getScholarships();
  const scholarship = scholarships.find(s => s.id === params.id);

  if (!scholarship) {
    return <div>Scholarship not found</div>;
  }

  return <ScholarshipDetail initialScholarship={scholarship} />;
}


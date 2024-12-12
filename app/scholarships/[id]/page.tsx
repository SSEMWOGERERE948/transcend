import ScholarshipDetail from '@/components/ScholarshipDetail';
import { getScholarships } from '@/lib/scholarships';

export default async function Page({ params }: { params: { scholarship_id: string } }) {
  const scholarships = await getScholarships();
  const scholarship = scholarships.find(s => s.id === params.scholarship_id);

  if (!scholarship) {
    return <div>Scholarship not found</div>;
  }

  return <ScholarshipDetail initialScholarship={scholarship} />;
}


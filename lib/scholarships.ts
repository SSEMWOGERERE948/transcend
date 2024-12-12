import { db } from './firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  writeBatch,
  getFirestore,
  limit,
  startAfter,
  orderBy,
  query,
} from 'firebase/firestore';

export interface Scholarship {
  id: string;
  name: string;
  description: string;
  country: string;
  level: string;
  fundingType: string;
  imageUrl: string;
  requirements: string[];
  deadline: string;
  isOpen: boolean;
  scholarship_id: string;
  degree: string;
  graduation_year: string;
  language: string;
  program: string;
  semester: string;
  type: string;
  university: string;
}

export interface ScholarshipApplication {
  id: string;
  scholarshipId: string;
  applicantName: string;
  email: string;
  phone: string;
  address: string;
  highestLevelOfStudy: 'O-Level' | 'A-Level' | 'Bachelor' | 'Master' | 'PhD';
  aLevelCombination?: string;
  aLevelPoints?: number;
  budget: number;
  photoUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

export interface PaginatedScholarships {
  scholarships: Scholarship[];
  lastDocument: any | null;
  hasMore: boolean;
}

export interface ScholarshipJSON {
  deadline: string;
  degree: string;
  graduation_year: string;
  language: string;
  program: string;
  semester: string;
  student_id: string;
  type: string;
  university: string;
}

const saveImageLocally = async (file: File, directory: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export async function submitApplication(
  applicationData: Omit<ScholarshipApplication, 'id' | 'photoUrl' | 'status' | 'submittedAt'>,
  photo: File
) {
  try {
    const photoUrl = await saveImageLocally(photo, 'applicant-photos');

    const docRef = await addDoc(collection(db, 'applications'), {
      ...applicationData,
      photoUrl,
      status: 'pending',
      submittedAt: new Date(),
    });

    return { id: docRef.id, ...applicationData, photoUrl, status: 'pending' as const, submittedAt: new Date() };
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
}

export async function addScholarship(
  scholarship: Omit<Scholarship, 'id'>,
  imageFile: File
) {
  try {
    const imageUrl = await saveImageLocally(imageFile, 'scholarship-images');

    const docRef = await addDoc(collection(db, 'scholarships'), {
      ...scholarship,
      imageUrl,
      createdAt: new Date(),
    });

    return { id: docRef.id, ...scholarship, imageUrl };
  } catch (error) {
    console.error('Error adding scholarship:', error);
    throw error;
  }
}

export async function getScholarships(pageSize: number = 10, lastDoc: any = null): Promise<Scholarship[]> {
  try {
    const json2425Query = lastDoc
      ? query(
          collection(db, 'scholarships_24_25'),
          orderBy('program'),
          startAfter(lastDoc),
          limit(pageSize)
        )
      : query(
          collection(db, 'scholarships_24_25'),
          orderBy('program'),
          limit(pageSize)
        );

    const json2425Snapshot = await getDocs(json2425Query);
    
    return json2425Snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        scholarship_id: data.scholarship_id || '',
        degree: data.degree || '',
        graduation_year: data.graduation_year || '',
        language: data.language || '',
        program: data.program || '',
        semester: data.semester || '',
        type: data.type || '',
        university: data.university || '',
        deadline: data.deadline || '',
        name: data.program || 'Untitled Scholarship',
        description: `${data.degree} program at ${data.university}`,
        country: 'China',
        level: data.degree || 'Unknown',
        fundingType: data.type || 'Unknown',
        imageUrl: '/placeholder-scholarship.jpg',
        requirements: [
          `Language: ${data.language}`,
          `Semester: ${data.semester}`,
          `Graduation Year: ${data.graduation_year}`,
        ],
        isOpen: new Date(data.deadline) > new Date(),
      } as Scholarship;
    });
  } catch (error) {
    console.error('Error getting scholarships:', error);
    throw error;
  }
}

export async function getScholarshipsCount(): Promise<number> {
  try {
    const regularSnapshot = await getDocs(collection(db, 'scholarships'));
    const json2425Snapshot = await getDocs(collection(db, 'scholarships_24_25'));

    return regularSnapshot.size + json2425Snapshot.size;
  } catch (error) {
    console.error('Error getting scholarships count:', error);
    throw error;
  }
}

export async function getApplications(): Promise<ScholarshipApplication[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'applications'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ScholarshipApplication[];
  } catch (error) {
    console.error('Error getting applications:', error);
    throw error;
  }
}

export async function updateApplicationStatus(
  applicationId: string,
  status: 'pending' | 'approved' | 'rejected'
) {
  try {
    const applicationRef = doc(db, 'applications', applicationId);
    await updateDoc(applicationRef, {
      status,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
}

export async function updateScholarship(
  scholarshipId: string,
  updates: Partial<Scholarship>,
  newImageFile?: File
) {
  try {
    let imageUrl = updates.imageUrl;

    if (newImageFile) {
      imageUrl = await saveImageLocally(newImageFile, 'scholarship-images');
    }

    const scholarshipRef = doc(db, 'scholarships', scholarshipId);
    await updateDoc(scholarshipRef, {
      ...updates,
      imageUrl,
      updatedAt: new Date(),
    });

    return { id: scholarshipId, ...updates, imageUrl };
  } catch (error) {
    console.error('Error updating scholarship:', error);
    throw error;
  }
}

export async function deleteScholarship(scholarshipId: string) {
  try {
    await deleteDoc(doc(db, 'scholarships', scholarshipId));
  } catch (error) {
    console.error('Error deleting scholarship:', error);
    throw error;
  }
}

export async function getScholarshipById(scholarshipId: string): Promise<Scholarship | null> {
  try {
    const scholarshipRef = doc(db, 'scholarships_24_25', scholarshipId);
    const scholarshipSnap = await getDoc(scholarshipRef);

    if (!scholarshipSnap.exists()) {
      return null;
    }

    const data = scholarshipSnap.data();
    return {
      id: scholarshipSnap.id,
      scholarship_id: data.scholarship_id || '',
      degree: data.degree || '',
      graduation_year: data.graduation_year || '',
      language: data.language || '',
      program: data.program || '',
      semester: data.semester || '',
      type: data.type || '',
      university: data.university || '',
      deadline: data.deadline || '',
      name: data.program || 'Untitled Scholarship',
      description: `${data.degree} program at ${data.university}`,
      country: 'China',
      level: data.degree || 'Unknown',
      fundingType: data.type || 'Unknown',
      imageUrl: '/placeholder-scholarship.jpg',
      requirements: [
        `Language: ${data.language}`,
        `Semester: ${data.semester}`,
        `Graduation Year: ${data.graduation_year}`,
      ],
      isOpen: new Date(data.deadline) > new Date(),
    } as Scholarship;
  } catch (error) {
    console.error('Error getting scholarship:', error);
    throw error;
  }
}

export async function uploadScholarshipsFromJSON(scholarships: any[]) {
  const db = getFirestore();
  const batch = writeBatch(db);

  const collectionName = 'scholarships_24_25';
  const scholarshipsRef = collection(db, collectionName);

  scholarships.forEach((scholarship) => {
    const docRef = doc(scholarshipsRef);
    batch.set(docRef, scholarship);
  });

  await batch.commit();
}

export async function deleteAllScholarships() {
  try {
    const regularRef = collection(db, 'scholarships');
    const regularSnapshot = await getDocs(regularRef);

    const special2425Ref = collection(db, 'scholarships_24_25');
    const special2425Snapshot = await getDocs(special2425Ref);

    const batch = writeBatch(db);

    regularSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    special2425Snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error deleting all scholarships:', error);
    throw error;
  }
}

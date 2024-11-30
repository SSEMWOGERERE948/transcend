import { db } from './firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from 'firebase/firestore';

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

const saveImageLocally = async (file: File, directory: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function submitApplication(applicationData: Omit<ScholarshipApplication, 'id' | 'photoUrl' | 'status' | 'submittedAt'>, photo: File) {
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

export async function addScholarship(scholarship: Omit<Scholarship, 'id'>, imageFile: File) {
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

export async function getScholarships(): Promise<Scholarship[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'scholarships'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Scholarship[];
  } catch (error) {
    console.error('Error getting scholarships:', error);
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
    const scholarshipRef = doc(db, 'scholarships', scholarshipId);
    const scholarshipSnap = await getDoc(scholarshipRef);
    
    if (!scholarshipSnap.exists()) {
      return null;
    }

    return {
      id: scholarshipSnap.id,
      ...scholarshipSnap.data()
    } as Scholarship;
  } catch (error) {
    console.error('Error getting scholarship:', error);
    throw error;
  }
}


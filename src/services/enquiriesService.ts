import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface EnquiryData {
  parentName: string;
  studentName: string;
  phone: string;
  email: string;
  gradeInterested: string;
  message: string;
}

/**
 * Submits a parent enquiry to the shared Firestore 'enquiries' collection.
 * Only CREATE operation is permitted publicly.
 */
export async function submitEnquiry(data: EnquiryData): Promise<string> {
  if (!db) {
    throw new Error('Database connection is not initialized.');
  }

  const enquiriesCol = collection(db, 'enquiries');
  const docRef = await addDoc(enquiriesCol, {
    parentName: data.parentName,
    studentName: data.studentName,
    phone: data.phone,
    email: data.email,
    gradeInterested: data.gradeInterested,
    message: data.message,
    source: 'website',
    status: 'new',
    priority: 'normal',
    adminNotes: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

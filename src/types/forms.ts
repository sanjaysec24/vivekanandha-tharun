// Type definitions for Vivekanandha School Smart Forms System

export type SmartFormType = 
  | 'visit_booking'
  | 'admission_enquiry'
  | 'admission_application'
  | 'callback_request'
  | 'transport_enquiry'
  | 'general_contact';

export type SubmissionStatus = 
  | 'New'
  | 'Contacted'
  | 'Follow-up Required'
  | 'Visit Scheduled'
  | 'Application In Progress'
  | 'Completed'
  | 'Closed';

export type AcademicClass = 
  | 'Pre-KG'
  | 'LKG'
  | 'UKG'
  | 'Grade 1'
  | 'Grade 2'
  | 'Grade 3'
  | 'Grade 4'
  | 'Grade 5';

export const ACADEMIC_CLASSES: AcademicClass[] = [
  'Pre-KG',
  'LKG',
  'UKG',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5'
];

export interface ParentDetails {
  name: string;
  mobile: string;
  email?: string;
  relationship?: 'Father' | 'Mother' | 'Legal Guardian' | 'Other';
  preferredLanguage?: 'English' | 'தமிழ்';
}

export interface StudentDetails {
  name?: string;
  dob?: string;
  gender?: 'Boy' | 'Girl' | 'Other' | '';
  applyingClass?: AcademicClass | string;
  currentSchool?: string;
  currentGrade?: string;
}

// 1. Book a School Visit
export interface BookVisitFormData {
  // Step 1: Parent
  parentName: string;
  mobileNumber: string;
  emailAddress: string;
  preferredLanguage: 'English' | 'தமிழ்';
  
  // Step 2: Student
  studentName: string;
  dateOfBirth: string;
  applyingClass: AcademicClass | string;
  
  // Step 3: Visit Preferences
  preferredVisitDate: string;
  preferredTimeSlot: 'Morning (09:00 AM - 11:00 AM)' | 'Late Morning (11:30 AM - 01:00 PM)' | 'Afternoon (02:00 PM - 04:00 PM)' | string;
  numberOfVisitors: string;
  questionsOrRequests: string;
}

// 2. Admission Enquiry
export interface AdmissionEnquiryFormData {
  parentName: string;
  mobileNumber: string;
  emailAddress: string;
  studentName: string;
  childCurrentSchool: string;
  classInterestedIn: AcademicClass | string;
  academicYear: string;
  hearAboutUs: string;
  message: string;
}

// 3. Apply for Admission
export interface ApplyAdmissionFormData {
  // Step 1: Parent / Guardian
  parentName: string;
  relationshipToStudent: 'Father' | 'Mother' | 'Legal Guardian' | 'Other' | string;
  mobileNumber: string;
  emailAddress: string;
  
  // Step 2: Student
  studentFullName: string;
  dateOfBirth: string;
  gender: 'Boy' | 'Girl' | 'Other' | string;
  applyingClass: AcademicClass | string;
  currentSchool: string;
  currentGrade: string;
  
  // Step 3: Address & Contact
  address: string;
  cityTown: string;
  pincode: string;
  emergencyContactNumber: string;
  
  // Step 4: School Requirements
  requireTransport: 'Yes' | 'No' | boolean;
  areaPickupLocation: string;
  specialRequirements: string;
}

// 4. Request a Callback
export interface CallbackRequestFormData {
  parentName: string;
  mobileNumber: string;
  bestTimeToCall: 'Morning (09:00 AM - 12:00 PM)' | 'Afternoon (12:00 PM - 04:00 PM)' | 'Evening (04:00 PM - 07:00 PM)' | string;
  topic: 'Admissions' | 'School Visit' | 'Curriculum' | 'Transport' | 'Fees & General Information' | 'Other' | string;
  optionalMessage: string;
}

// 5. Transport Enquiry
export interface TransportEnquiryFormData {
  parentName: string;
  mobileNumber: string;
  studentName: string;
  classInterestedIn: AcademicClass | string;
  residentialAreaOrVillage: string;
  nearbyLandmark: string;
  pincode: string;
  preferredPickupArea: string;
  additionalNotes: string;
}

// 6. General Contact / Enquiry
export interface GeneralContactFormData {
  name: string;
  mobileNumber: string;
  emailAddress: string;
  enquiryCategory: 'Admissions' | 'Academics' | 'Transport' | 'School Visit' | 'General Enquiry' | 'Other' | string;
  message: string;
}

// Standard Submission Envelope
export interface FormSubmissionEnvelope<T = any> {
  formType: SmartFormType;
  submissionId: string;
  submittedAt: string;
  status: SubmissionStatus;
  parentDetails: ParentDetails;
  studentDetails?: StudentDetails;
  formSpecificData: T;
  meta?: {
    sourceUrl?: string;
    userAgent?: string;
    locale?: string;
  };
}

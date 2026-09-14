// Service to handle Smart Form submissions, draft persistence, and validation
import { 
  SmartFormType, 
  FormSubmissionEnvelope, 
  SubmissionStatus,
  BookVisitFormData,
  AdmissionEnquiryFormData,
  ApplyAdmissionFormData,
  CallbackRequestFormData,
  TransportEnquiryFormData,
  GeneralContactFormData
} from '../types/forms';

const LOCAL_STORAGE_SUBMISSIONS_KEY = 'vvs_smart_forms_submissions';
const LOCAL_STORAGE_DRAFT_PREFIX = 'vvs_draft_';

// Generate formatted Reference ID e.g. VVS-2026-XXXX
export function generateReferenceId(type: SmartFormType): string {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  
  switch (type) {
    case 'visit_booking':
      return `VVS-${year}-VST${randomDigits}`;
    case 'admission_application':
      return `VVS-${year}-APP${randomDigits}`;
    case 'admission_enquiry':
      return `VVS-${year}-ENQ${randomDigits}`;
    case 'callback_request':
      return `VVS-${year}-CALL${randomDigits}`;
    case 'transport_enquiry':
      return `VVS-${year}-BUS${randomDigits}`;
    case 'general_contact':
      return `VVS-${year}-MSG${randomDigits}`;
    default:
      return `VVS-${year}-${randomDigits}`;
  }
}

// Save draft
export function saveFormDraft<T>(formType: SmartFormType, data: T): void {
  try {
    localStorage.setItem(`${LOCAL_STORAGE_DRAFT_PREFIX}${formType}`, JSON.stringify(data));
  } catch (err) {
    console.warn('Unable to save form draft to localStorage', err);
  }
}

// Load draft
export function loadFormDraft<T>(formType: SmartFormType): T | null {
  try {
    const draft = localStorage.getItem(`${LOCAL_STORAGE_DRAFT_PREFIX}${formType}`);
    if (draft) {
      return JSON.parse(draft) as T;
    }
  } catch (err) {
    console.warn('Unable to load form draft from localStorage', err);
  }
  return null;
}

// Clear draft
export function clearFormDraft(formType: SmartFormType): void {
  try {
    localStorage.removeItem(`${LOCAL_STORAGE_DRAFT_PREFIX}${formType}`);
  } catch (err) {
    console.warn('Unable to clear form draft from localStorage', err);
  }
}

// Get all mock submissions saved locally
export function getSavedSubmissions(): FormSubmissionEnvelope[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_SUBMISSIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.warn('Unable to read submissions from localStorage', err);
    return [];
  }
}

// Mock Submission Simulation (Phase 1 Frontend Only)
export async function submitSmartForm<T>(
  formType: SmartFormType,
  envelope: Omit<FormSubmissionEnvelope<T>, 'submissionId' | 'submittedAt' | 'status'>
): Promise<FormSubmissionEnvelope<T>> {
  // Simulated network delay (800ms) for realistic UX feedback
  await new Promise((resolve) => setTimeout(resolve, 800));

  const submissionId = generateReferenceId(formType);
  const submittedAt = new Date().toISOString();
  
  let initialStatus: SubmissionStatus = 'New';
  if (formType === 'visit_booking') initialStatus = 'Visit Scheduled';
  if (formType === 'admission_application') initialStatus = 'Application In Progress';
  if (formType === 'callback_request') initialStatus = 'Follow-up Required';

  const fullEnvelope: FormSubmissionEnvelope<T> = {
    ...envelope,
    submissionId,
    submittedAt,
    status: initialStatus,
    meta: {
      sourceUrl: typeof window !== 'undefined' ? window.location.pathname : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      locale: 'en-IN'
    }
  };

  // Save to local storage mock repository
  try {
    const existing = getSavedSubmissions();
    existing.unshift(fullEnvelope);
    // Keep max 50 recent submissions locally
    localStorage.setItem(LOCAL_STORAGE_SUBMISSIONS_KEY, JSON.stringify(existing.slice(0, 50)));
    // Clear draft after successful submission
    clearFormDraft(formType);
  } catch (err) {
    console.warn('Unable to persist submission into mock storage', err);
  }

  return fullEnvelope;
}

// Validation helpers
export function isValidIndianMobile(phone: string): boolean {
  if (!phone) return false;
  // Strip spaces, dashes, parentheses and +91 prefix
  const cleaned = phone.replace(/[\s\-()]/g, '').replace(/^(\+91|91)/, '');
  // Must be 10 digits starting with 6, 7, 8, or 9
  return /^[6-9]\d{9}$/.test(cleaned);
}

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPincode(pincode: string): boolean {
  if (!pincode) return false;
  // Indian 6-digit postal code
  return /^\d{6}$/.test(pincode.trim());
}

// Calculate child age as of June 1st of current academic year
export function calculateSchoolAge(dobString: string, targetYear: number = 2027): { years: number; months: number; readable: string } | null {
  if (!dobString) return null;
  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) return null;

  const cutoffDate = new Date(targetYear, 5, 1); // June 1st
  let years = cutoffDate.getFullYear() - dob.getFullYear();
  let months = cutoffDate.getMonth() - dob.getMonth();

  if (cutoffDate.getDate() < dob.getDate()) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    readable: `${years} yrs ${months} mos (as of June 1, ${targetYear})`
  };
}

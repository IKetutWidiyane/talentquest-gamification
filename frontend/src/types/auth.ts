export type UserRole = "CANDIDATE" | "TALENT_ACQUISITION";
export type UserStatus = "ACTIVE" | "INACTIVE";

export interface CandidateProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  province?: string | null;
  birthDate?: string | null;
  education?: string | null;
  experience?: string | null;
  skills?: string | null;
  resumeUrl?: string | null;
  profilePhotoUrl?: string | null;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  candidateProfile?: CandidateProfile | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  phone?: string;
}

export interface AuthResponseData {
  user: AuthUser;
  token: string;
}


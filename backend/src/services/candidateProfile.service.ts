import * as candidateProfileRepository from "../repositories/candidateProfile.repository";

export const getCandidateProfile = async (
  userId: string
) => {
  const profile =
    await candidateProfileRepository.findProfileByUserId(
      userId
    );

  if (!profile) {
    throw new Error("PROFILE_NOT_FOUND");
  }

  return profile;
};

export const updateCandidateProfile = async (
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    city?: string;
    province?: string;
    birthDate?: string | null;
    education?: string;
    experience?: string;
    skills?: string;
    resumeUrl?: string | null;
    profilePhotoUrl?: string | null;
  }
) => {
  const existingProfile =
    await candidateProfileRepository.findProfileByUserId(
      userId
    );

  if (!existingProfile) {
    throw new Error("PROFILE_NOT_FOUND");
  }

  const updateData = {
    ...data,
    birthDate:
      data.birthDate !== undefined
        ? data.birthDate
          ? new Date(data.birthDate)
          : null
        : undefined,
  };

  return candidateProfileRepository.updateProfile(
    userId,
    updateData
  );
};
import prisma from "../config/prisma";

export const findProfileByUserId = async (
  userId: string
) => {
  return prisma.candidateProfile.findUnique({
    where: {
      userId,
    },
  });
};

export const createProfile = async (
  userId: string,
  data: {
    firstName: string;
    lastName?: string;
    phone?: string;
    address?: string;
    city?: string;
    province?: string;
    birthDate?: Date | null;
    education?: string;
    experience?: string;
    skills?: string;
    resumeUrl?: string | null;
    profilePhotoUrl?: string | null;
  }
) => {
  return prisma.candidateProfile.create({
    data: {
      userId,
      ...data,
    },
  });
};

export const updateProfile = async (
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    city?: string;
    province?: string;
    birthDate?: Date | null;
    education?: string;
    experience?: string;
    skills?: string;
    resumeUrl?: string | null;
    profilePhotoUrl?: string | null;
  }
) => {
  return prisma.candidateProfile.update({
    where: {
      userId,
    },
    data,
  });
};
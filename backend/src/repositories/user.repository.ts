import prisma from "../config/prisma";

export const findAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
      candidateProfile: {
        select: {
          firstName: true,
          lastName: true,
          phone: true,
          city: true,
          province: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
      candidateProfile: {
        select: {
          firstName: true,
          lastName: true,
          phone: true,
          address: true,
          city: true,
          province: true,
          birthDate: true,
          education: true,
          experience: true,
          skills: true,
          resumeUrl: true,
          profilePhotoUrl: true,
        },
      },
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (data: {
  email: string;
  passwordHash: string;
  role: "CANDIDATE" | "TALENT_ACQUISITION";
  status?: "ACTIVE" | "INACTIVE";
}) => {
  return prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
    },
  });
};

export const updateUser = async (
  userId: string,
  data: {
    email?: string;
    role?: "CANDIDATE" | "TALENT_ACQUISITION";
  }
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data,
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
    },
  });
};

export const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "INACTIVE"
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status,
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
    },
  });
};

export const deleteUser = async (userId: string) => {
  return prisma.user.delete({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
};
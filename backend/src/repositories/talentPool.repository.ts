import prisma from "../config/prisma";

export const findAllTalentPool = async () => {
  return prisma.talentPool.findMany({
    include: {
      candidateProfile: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              status: true,
            },
          },
        },
      },
      addedBy: {
        select: {
          id: true,
          email: true,
        },
      },
    },
    orderBy: {
      addedAt: "desc",
    },
  });
};

export const findTalentPoolById = async (
  talentPoolId: string
) => {
  return prisma.talentPool.findUnique({
    where: {
      id: talentPoolId,
    },
    include: {
      candidateProfile: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              status: true,
            },
          },
        },
      },
      addedBy: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
};

export const findTalentPoolByCandidateProfileId = async (
  candidateProfileId: string
) => {
  return prisma.talentPool.findUnique({
    where: {
      candidateProfileId,
    },
  });
};

export const createTalentPool = async (data: {
  candidateProfileId: string;
  addedByUserId: string;
  status?: "ACTIVE" | "HIRED" | "INACTIVE";
  notes?: string;
  tags?: string;
}) => {
  return prisma.talentPool.create({
    data,
    include: {
      candidateProfile: true,
      addedBy: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
};

export const updateTalentPool = async (
  talentPoolId: string,
  data: {
    status?: "ACTIVE" | "HIRED" | "INACTIVE";
    notes?: string;
    tags?: string;
  }
) => {
  return prisma.talentPool.update({
    where: {
      id: talentPoolId,
    },
    data,
    include: {
      candidateProfile: true,
      addedBy: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
};

export const deleteTalentPool = async (
  talentPoolId: string
) => {
  return prisma.talentPool.delete({
    where: {
      id: talentPoolId,
    },
  });
};
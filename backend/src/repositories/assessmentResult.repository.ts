import prisma from "../config/prisma";

export const findApplicationAssessmentResult = async (
  applicationId: string
) => {
  return prisma.application.findUnique({
    where: {
      id: applicationId,
    },

    include: {
      user: {
        include: {
          candidateProfile: true,
        },
      },

      job: true,

      assessmentAttempts: {
        where: {
          status: "COMPLETED",
        },

        include: {
          assessment: true,
          result: true,
        },

        orderBy: {
          completedAt: "desc",
        },

        take: 1,
      },
    },
  });
};
import prisma from "../config/prisma";

export const findAllCandidates = async () => {
  return prisma.user.findMany({
    where: {
      role: "CANDIDATE",
    },

    include: {
      candidateProfile: true,

      applications: {
        include: {
          job: true,

          assessmentAttempts: {
            where: {
              status: "COMPLETED",
            },

            include: {
              result: true,
            },

            orderBy: {
              completedAt: "desc",
            },

            take: 1,
          },
        },

        orderBy: {
          appliedAt: "desc",
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findCandidateById = async (
  candidateId: string
) => {
  return prisma.user.findFirst({
    where: {
      id: candidateId,
      role: "CANDIDATE",
    },

    include: {
      candidateProfile: true,

      applications: {
        include: {
          job: true,

          assessmentAttempts: {
            include: {
              assessment: true,
              result: true,
            },

            orderBy: {
              startedAt: "desc",
            },
          },

          stageHistory: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },

        orderBy: {
          appliedAt: "desc",
        },
      },

      activityLogs: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};
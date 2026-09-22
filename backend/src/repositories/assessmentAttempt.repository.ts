import { Prisma } from "@prisma/client";

import prisma from "../config/prisma";

export const findAttemptById = async (
  id: string
) => {
  return prisma.assessmentAttempt.findUnique({
    where: {
      id,
    },

    include: {
      assessment: {
        include: {
          competencies: {
            include: {
              competency: true,
            },
          },

          challenges: {
            include: {
              options: true,
            },

            orderBy: {
              order: "asc",
            },
          },
        },
      },

      application: {
        include: {
          job: true,
        },
      },

      responses: {
        include: {
          challenge: true,
          option: true,
        },

        orderBy: {
          answeredAt: "asc",
        },
      },

      result: true,
    },
  });
};

export const findActiveAttemptByApplication = async (
  applicationId: string
) => {
  return prisma.assessmentAttempt.findFirst({
    where: {
      applicationId,
      status: "IN_PROGRESS",
    },

    include: {
      assessment: true,
      responses: true,
    },
  });
};

export const createAttempt = async (
  data: Prisma.AssessmentAttemptCreateInput
) => {
  return prisma.assessmentAttempt.create({
    data,

    include: {
      assessment: {
        include: {
          competencies: {
            include: {
              competency: true,
            },
          },

          challenges: {
            include: {
              options: true,
            },

            orderBy: {
              order: "asc",
            },
          },
        },
      },

      application: {
        include: {
          job: true,
        },
      },

      responses: true,
    },
  });
};

export const createResponse = async (
  data: Prisma.AssessmentResponseCreateInput
) => {
  return prisma.assessmentResponse.create({
    data,

    include: {
      challenge: true,
      option: true,
    },
  });
};

export const findResponse = async (
  attemptId: string,
  challengeId: string
) => {
  return prisma.assessmentResponse.findUnique({
    where: {
      attemptId_challengeId: {
        attemptId,
        challengeId,
      },
    },
  });
};

/**
 * Find attempt specifically for completion.
 *
 * Data yang dibutuhkan:
 * - Assessment competencies + weight
 * - Challenges + competency + weight
 * - Responses + score
 * - Application + current status
 */
export const findAttemptForCompletion = async (
  id: string
) => {
  return prisma.assessmentAttempt.findUnique({
    where: {
      id,
    },

    include: {
      assessment: {
        include: {
          competencies: {
            include: {
              competency: true,
            },
          },

          challenges: {
            include: {
              competency: true,
            },

            orderBy: {
              order: "asc",
            },
          },
        },
      },

      application: true,

      responses: {
        include: {
          challenge: {
            include: {
              competency: true,
            },
          },

          option: true,
        },

        orderBy: {
          answeredAt: "asc",
        },
      },

      result: true,
    },
  });
};

export const updateAttempt = async (
  id: string,
  data: Prisma.AssessmentAttemptUpdateInput
) => {
  return prisma.assessmentAttempt.update({
    where: {
      id,
    },

    data,

    include: {
      assessment: {
        include: {
          challenges: {
            orderBy: {
              order: "asc",
            },
          },
        },
      },

      responses: true,
      result: true,
    },
  });
};

export const createResult = async (
  data: Prisma.AssessmentResultCreateInput
) => {
  return prisma.assessmentResult.create({
    data,
  });
};
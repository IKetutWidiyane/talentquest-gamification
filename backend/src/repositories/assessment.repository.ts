import { Prisma } from "@prisma/client";

import prisma from "../config/prisma";

export const findAssessmentById = async (id: string) => {
  return prisma.assessment.findUnique({
    where: {
      id,
    },
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
  });
};

export const findPublishedAssessmentById = async (
  id: string
) => {
  return prisma.assessment.findFirst({
    where: {
      id,
      status: "PUBLISHED",
    },
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
  });
};

export const findAllAssessments = async () => {
  return prisma.assessment.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createAssessment = async (
  data: Prisma.AssessmentCreateInput
) => {
  return prisma.assessment.create({
    data,
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
  });
};

export const updateAssessment = async (
  id: string,
  data: Prisma.AssessmentUpdateInput
) => {
  return prisma.assessment.update({
    where: {
      id,
    },
    data,
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
  });
};

export const deleteAssessment = async (id: string) => {
  return prisma.assessment.delete({
    where: {
      id,
    },
  });
};
import prisma from "../config/prisma";

export const findAllCompetencies = async () => {
  return prisma.competency.findMany({
    include: {
      _count: {
        select: {
          jobMappings: true,
          assessmentMappings: true,
          challenges: true,
        },
      },
    },

    orderBy: {
      name: "asc",
    },
  });
};

export const findCompetencyById = async (
  competencyId: string
) => {
  return prisma.competency.findUnique({
    where: {
      id: competencyId,
    },

    include: {
      _count: {
        select: {
          jobMappings: true,
          assessmentMappings: true,
          challenges: true,
        },
      },
    },
  });
};

export const createCompetency = async (data: {
  name: string;
  description?: string;
}) => {
  return prisma.competency.create({
    data,
  });
};

export const updateCompetency = async (
  competencyId: string,
  data: {
    name?: string;
    description?: string;
  }
) => {
  return prisma.competency.update({
    where: {
      id: competencyId,
    },
    data,
  });
};

export const deleteCompetency = async (
  competencyId: string
) => {
  return prisma.competency.delete({
    where: {
      id: competencyId,
    },
  });
};
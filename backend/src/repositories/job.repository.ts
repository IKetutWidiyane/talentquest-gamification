import { JobStatus, Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const findActiveJobs = async () => {
  return prisma.job.findMany({
    where: {
      status: JobStatus.ACTIVE,
    },
    include: {
      competencies: {
        include: {
          competency: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findActiveJobById = async (id: string) => {
  return prisma.job.findFirst({
    where: {
      id,
      status: JobStatus.ACTIVE,
    },
    include: {
      competencies: {
        include: {
          competency: true,
        },
      },
    },
  });
};

export const findJobById = async (id: string) => {
  return prisma.job.findUnique({
    where: {
      id,
    },
    include: {
      competencies: {
        include: {
          competency: true,
        },
      },
    },
  });
};

export const findJobBySlug = async (slug: string) => {
  return prisma.job.findUnique({
    where: {
      slug,
    },
  });
};

export const createJob = async (
  data: Prisma.JobCreateInput
) => {
  return prisma.job.create({
    data,
    include: {
      competencies: {
        include: {
          competency: true,
        },
      },
    },
  });
};

export const updateJob = async (
  id: string,
  data: Prisma.JobUpdateInput
) => {
  return prisma.job.update({
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
    },
  });
};

export const deleteJob = async (id: string) => {
  return prisma.job.delete({
    where: {
      id,
    },
  });
};
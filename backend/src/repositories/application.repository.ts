import {
  Prisma,
} from "@prisma/client";

import prisma from "../config/prisma";

export const findApplicationById = async (id: string) => {
  return prisma.application.findUnique({
    where: {
      id,
    },
    include: {
      job: true,
      user: {
        include: {
          candidateProfile: true,
        },
      },
      stageHistory: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

export const findApplicationByUserAndJob = async (
  userId: string,
  jobId: string
) => {
  return prisma.application.findUnique({
    where: {
      userId_jobId: {
        userId,
        jobId,
      },
    },
  });
};

export const findApplicationsByUser = async (
  userId: string
) => {
  return prisma.application.findMany({
    where: {
      userId,
    },
    include: {
      job: true,
      stageHistory: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

export const findAllApplications = async () => {
  return prisma.application.findMany({
    include: {
      job: true,
      user: {
        include: {
          candidateProfile: true,
        },
      },
      stageHistory: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

export const createApplication = async (
  data: Prisma.ApplicationCreateInput
) => {
  return prisma.application.create({
    data,
    include: {
      job: true,
      user: {
        include: {
          candidateProfile: true,
        },
      },
      stageHistory: true,
    },
  });
};

export const updateApplicationStatus = async (
  id: string,
  status: Prisma.ApplicationUpdateInput["status"]
) => {
  return prisma.application.update({
    where: {
      id,
    },
    data: {
      status,
    },
    include: {
      job: true,
      user: {
        include: {
          candidateProfile: true,
        },
      },
      stageHistory: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

export const createStageHistory = async (
  data: Prisma.ApplicationStageHistoryCreateInput
) => {
  return prisma.applicationStageHistory.create({
    data,
  });
};

export const createActivityLog = async (
  data: Prisma.ActivityLogCreateInput
) => {
  return prisma.activityLog.create({
    data,
  });
};
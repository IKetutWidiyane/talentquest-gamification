import {
  ActivityType,
  ApplicationStatus,
  JobStatus,
} from "@prisma/client";

import prisma from "../config/prisma";
import * as applicationRepository from "../repositories/application.repository";

interface CreateApplicationInput {
  userId: string;
  jobId: string;
}

const createInitialStageHistory = async (
  applicationId: string
) => {
  await applicationRepository.createStageHistory({
    application: {
      connect: {
        id: applicationId,
      },
    },
    fromStatus: null,
    toStatus: ApplicationStatus.SUBMITTED,
  });
};

const createApplicationActivity = async (
  applicationId: string,
  userId: string
) => {
  await applicationRepository.createActivityLog({
    type: ActivityType.APPLICATION_SUBMITTED,
    description: "Candidate submitted an application",
    user: {
      connect: {
        id: userId,
      },
    },
    entityType: "APPLICATION",
    entityId: applicationId,
  });
};

export const createApplication = async (
  input: CreateApplicationInput
) => {
  const { userId, jobId } = input;

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    throw new Error("JOB_NOT_FOUND");
  }

  if (job.status !== JobStatus.ACTIVE) {
    throw new Error("JOB_NOT_ACTIVE");
  }

  const existingApplication =
    await applicationRepository.findApplicationByUserAndJob(
      userId,
      jobId
    );

  if (existingApplication) {
    throw new Error("ALREADY_APPLIED");
  }

  const application =
    await applicationRepository.createApplication({
      user: {
        connect: {
          id: userId,
        },
      },
      job: {
        connect: {
          id: jobId,
        },
      },
      status: ApplicationStatus.SUBMITTED,
    });

  await createInitialStageHistory(application.id);

  await createApplicationActivity(
    application.id,
    userId
  );

  return applicationRepository.findApplicationById(
    application.id
  );
};

export const getCandidateApplications = async (
  userId: string
) => {
  return applicationRepository.findApplicationsByUser(
    userId
  );
};

export const getApplicationById = async (
  id: string,
  userId: string,
  isCandidate: boolean
) => {
  const application =
    await applicationRepository.findApplicationById(id);

  if (!application) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  if (
    isCandidate &&
    application.userId !== userId
  ) {
    throw new Error("FORBIDDEN");
  }

  return application;
};

export const getAllApplications = async () => {
  return applicationRepository.findAllApplications();
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus,
  changedByUserId: string
) => {
  const application =
    await applicationRepository.findApplicationById(
      applicationId
    );

  if (!application) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  const previousStatus = application.status;

  if (previousStatus === status) {
    return application;
  }

  const updatedApplication =
    await applicationRepository.updateApplicationStatus(
      applicationId,
      status
    );

  await applicationRepository.createStageHistory({
    application: {
      connect: {
        id: applicationId,
      },
    },
    fromStatus: previousStatus,
    toStatus: status,
  });

  let activityType: ActivityType =
    ActivityType.APPLICATION_STATUS_CHANGED;

  if (status === ApplicationStatus.INTERVIEW) {
    activityType =
      ActivityType.INTERVIEW_SCHEDULED;
  }

  if (status === ApplicationStatus.REJECTED) {
    activityType =
      ActivityType.CANDIDATE_REJECTED;
  }

  await applicationRepository.createActivityLog({
    type: activityType,
    description:
      `Application status changed from ${previousStatus} to ${status}`,
    user: {
      connect: {
        id: changedByUserId,
      },
    },
    entityType: "APPLICATION",
    entityId: applicationId,
  });

  return updatedApplication;
};
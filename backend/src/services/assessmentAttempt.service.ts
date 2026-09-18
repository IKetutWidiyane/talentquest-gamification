import {
  ApplicationStatus,
  AttemptStatus,
} from "@prisma/client";

import prisma from "../config/prisma";
import * as attemptRepository from "../repositories/assessmentAttempt.repository";

interface StartAssessmentInput {
  userId: string;
  assessmentId: string;
  applicationId: string;
}

interface SubmitResponseInput {
  userId: string;
  attemptId: string;
  challengeId: string;
  optionId: string;
}

export const startAssessment = async (
  input: StartAssessmentInput
) => {
  const {
    userId,
    assessmentId,
    applicationId,
  } = input;

  const application =
    await prisma.application.findUnique({
      where: {
        id: applicationId,
      },
    });

  if (!application) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  if (application.userId !== userId) {
    throw new Error("FORBIDDEN");
  }

  if (
    application.status === ApplicationStatus.REJECTED
  ) {
    throw new Error("APPLICATION_NOT_ELIGIBLE");
  }

  const assessment =
    await prisma.assessment.findUnique({
      where: {
        id: assessmentId,
      },
      include: {
        challenges: true,
      },
    });

  if (!assessment) {
    throw new Error("ASSESSMENT_NOT_FOUND");
  }

  if (assessment.status !== "PUBLISHED") {
    throw new Error("ASSESSMENT_NOT_PUBLISHED");
  }

  const existingAttempt =
    await attemptRepository.findActiveAttemptByApplication(
      applicationId
    );

  if (existingAttempt) {
    return existingAttempt;
  }

  const attempt =
    await attemptRepository.createAttempt({
      user: {
        connect: {
          id: userId,
        },
      },

      assessment: {
        connect: {
          id: assessmentId,
        },
      },

      application: {
        connect: {
          id: applicationId,
        },
      },

      status: AttemptStatus.IN_PROGRESS,
    });

  return attempt;
};

export const getAttemptById = async (
  id: string,
  userId: string
) => {
  const attempt =
    await attemptRepository.findAttemptById(id);

  if (!attempt) {
    throw new Error("ATTEMPT_NOT_FOUND");
  }

  if (attempt.userId !== userId) {
    throw new Error("FORBIDDEN");
  }

  return attempt;
};

export const submitResponse = async (
  input: SubmitResponseInput
) => {
  const {
    userId,
    attemptId,
    challengeId,
    optionId,
  } = input;

  const attempt =
    await attemptRepository.findAttemptById(
      attemptId
    );

  if (!attempt) {
    throw new Error("ATTEMPT_NOT_FOUND");
  }

  if (attempt.userId !== userId) {
    throw new Error("FORBIDDEN");
  }

  if (
    attempt.status !== AttemptStatus.IN_PROGRESS
  ) {
    throw new Error("ATTEMPT_NOT_ACTIVE");
  }

  const challenge =
    await prisma.challenge.findUnique({
      where: {
        id: challengeId,
      },
    });

  if (!challenge) {
    throw new Error("CHALLENGE_NOT_FOUND");
  }

  if (
    challenge.assessmentId !==
    attempt.assessmentId
  ) {
    throw new Error("INVALID_CHALLENGE");
  }

  const option =
    await prisma.challengeOption.findUnique({
      where: {
        id: optionId,
      },
    });

  if (!option) {
    throw new Error("OPTION_NOT_FOUND");
  }

  if (option.challengeId !== challengeId) {
    throw new Error("INVALID_OPTION");
  }

  const existingResponse =
    await attemptRepository.findResponse(
      attemptId,
      challengeId
    );

  if (existingResponse) {
    throw new Error("ALREADY_ANSWERED");
  }

  /*
   * IMPORTANT:
   * Score is stored internally but is NOT returned
   * to the candidate.
   */
  const response =
    await attemptRepository.createResponse({
      attempt: {
        connect: {
          id: attemptId,
        },
      },

      challenge: {
        connect: {
          id: challengeId,
        },
      },

      option: {
        connect: {
          id: optionId,
        },
      },

      score: option.score,
    });

  return {
    id: response.id,
    challengeId: response.challengeId,
    answeredAt: response.answeredAt,
  };
};
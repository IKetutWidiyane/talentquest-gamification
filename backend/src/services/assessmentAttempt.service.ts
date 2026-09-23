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

/**
 * Sanitize assessment attempt response for candidate.
 *
 * IMPORTANT:
 * Candidate must NOT receive:
 * - option.score
 * - option.behavioralIndicator
 *
 * Those values are internal and are used only
 * by the backend when calculating the assessment result.
 */
const sanitizeAttemptForCandidate = (attempt: any) => {
  return {
    id: attempt.id,
    userId: attempt.userId,
    assessmentId: attempt.assessmentId,
    applicationId: attempt.applicationId,

    status: attempt.status,
    startedAt: attempt.startedAt,
    completedAt: attempt.completedAt,
    expiresAt: attempt.expiresAt,

    assessment: {
      id: attempt.assessment.id,
      name: attempt.assessment.name,
      objective: attempt.assessment.objective,
      status: attempt.assessment.status,
      publishedAt: attempt.assessment.publishedAt,

      competencies:
        attempt.assessment.competencies.map(
          (item: any) => ({
            id: item.id,
            competencyId: item.competencyId,
            weight: item.weight,

            competency: {
              id: item.competency.id,
              name: item.competency.name,
              description:
                item.competency.description,
            },
          })
        ),

      challenges:
        attempt.assessment.challenges.map(
          (challenge: any) => ({
            id: challenge.id,
            competencyId:
              challenge.competencyId,
            name: challenge.name,
            scenario: challenge.scenario,
            question: challenge.question,
            order: challenge.order,
            weight: challenge.weight,

            options: challenge.options.map(
              (option: any) => ({
                id: option.id,
                label: option.label,
                value: option.value,
              })
            ),
          })
        ),
    },

    application: {
      id: attempt.application.id,
      userId: attempt.application.userId,
      jobId: attempt.application.jobId,
      status: attempt.application.status,
      appliedAt: attempt.application.appliedAt,
      updatedAt: attempt.application.updatedAt,

      job: {
        id: attempt.application.job.id,
        title: attempt.application.job.title,
        slug: attempt.application.job.slug,
        department:
          attempt.application.job.department,
        location:
          attempt.application.job.location,
        employmentType:
          attempt.application.job.employmentType,
        experience:
          attempt.application.job.experience,
      },
    },

    /*
     * Candidate only needs to know which challenge
     * and option they have answered.
     *
     * Score is intentionally excluded.
     */
    responses: attempt.responses.map(
      (response: any) => ({
        id: response.id,
        challengeId: response.challengeId,
        optionId: response.optionId,
        answeredAt: response.answeredAt,
      })
    ),

    /*
     * Result is only available after the assessment
     * has been completed.
     */
    result:
      attempt.status === AttemptStatus.COMPLETED
        ? attempt.result
        : null,
  };
};

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
    application.status ===
    ApplicationStatus.REJECTED
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
    throw new Error(
      "ASSESSMENT_NOT_PUBLISHED"
    );
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

  /*
   * IMPORTANT:
   * Do not return the raw Prisma object.
   *
   * The raw object contains:
   * - option.score
   * - option.behavioralIndicator
   *
   * Both must remain hidden from candidates.
   */
  return sanitizeAttemptForCandidate(attempt);
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
    attempt.status !==
    AttemptStatus.IN_PROGRESS
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
   *
   * Score is stored in the database because it is
   * required later when calculating the result.
   *
   * However, score is NEVER returned to the candidate.
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
export const completeAssessment = async (
  attemptId: string,
  userId: string
) => {
  const attempt =
    await attemptRepository.findAttemptForCompletion(
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

  /*
   * Pastikan semua challenge sudah dijawab.
   */
  const totalChallenges =
    attempt.assessment.challenges.length;

  const answeredChallenges =
    attempt.responses.length;

  if (
    answeredChallenges !== totalChallenges
  ) {
    throw new Error(
      "ALL_CHALLENGES_NOT_ANSWERED"
    );
  }

  /*
   * Hitung score setiap competency.
   *
   * Formula:
   *
   * competencyScore =
   * sum(response.score * challenge.weight)
   * /
   * sum(challenge.weight)
   */
  const competencyScores = attempt.assessment.competencies.map(
    (assessmentCompetency) => {
      const competencyId =
        assessmentCompetency.competencyId;

      const competencyResponses =
        attempt.responses.filter(
          (response) =>
            response.challenge.competencyId ===
            competencyId
        );

      let weightedScore = 0;
      let totalWeight = 0;

      for (const response of competencyResponses) {
        const challengeWeight =
          response.challenge.weight;

        weightedScore +=
          response.score * challengeWeight;

        totalWeight += challengeWeight;
      }

      const score =
        totalWeight > 0
          ? weightedScore / totalWeight
          : 0;

      return {
        competencyId,
        name:
          assessmentCompetency.competency.name,
        score: Number(score.toFixed(2)),
        weight: assessmentCompetency.weight,
      };
    }
  );

  /*
   * Hitung overall score berdasarkan
   * weight masing-masing competency.
   */
  let weightedOverallScore = 0;
  let totalCompetencyWeight = 0;

  for (const competency of competencyScores) {
    weightedOverallScore +=
      competency.score * competency.weight;

    totalCompetencyWeight +=
      competency.weight;
  }

  const overallScore =
    totalCompetencyWeight > 0
      ? weightedOverallScore /
        totalCompetencyWeight
      : 0;

  const roundedOverallScore =
    Number(overallScore.toFixed(2));

  /*
   * Behavioral summary sederhana berdasarkan
   * overall score.
   */
  let behavioralSummary: string;

  if (roundedOverallScore >= 85) {
    behavioralSummary =
      "Demonstrates strong and consistent behavioral competencies across the assessment.";
  } else if (roundedOverallScore >= 70) {
    behavioralSummary =
      "Demonstrates solid behavioral competencies with several areas of strength.";
  } else if (roundedOverallScore >= 55) {
    behavioralSummary =
      "Demonstrates developing behavioral competencies with opportunities for further growth.";
  } else {
    behavioralSummary =
      "Demonstrates foundational behavioral competencies with several areas for development.";
  }

  /*
   * Buat AssessmentResult.
   */
  const result =
    await attemptRepository.createResult({
      attempt: {
        connect: {
          id: attemptId,
        },
      },

      overallScore:
        roundedOverallScore,

      behavioralSummary,

      competencyScores,
    });

  /*
   * Ubah attempt menjadi COMPLETED.
   */
  await attemptRepository.updateAttempt(
    attemptId,
    {
      status: AttemptStatus.COMPLETED,
      completedAt: new Date(),
    }
  );

  /*
   * Update application menjadi
   * ASSESSMENT_COMPLETED.
   */
  await prisma.application.update({
    where: {
      id: attempt.applicationId,
    },

    data: {
      status:
        ApplicationStatus.ASSESSMENT_COMPLETED,
    },
  });

  /*
   * Simpan stage history.
   */
  await prisma.applicationStageHistory.create({
    data: {
      applicationId:
        attempt.applicationId,

      fromStatus:
        attempt.application.status,

      toStatus:
        ApplicationStatus.ASSESSMENT_COMPLETED,

      note:
        "Candidate completed Talent Quest assessment.",
    },
  });

  /*
   * Simpan activity log.
   */
  await prisma.activityLog.create({
    data: {
      userId,
      type: "ASSESSMENT_COMPLETED",
      entityType: "AssessmentAttempt",
      entityId: attemptId,
      description:
        "Candidate completed Talent Quest assessment.",
    },
  });

  return {
    attemptId,
    status: AttemptStatus.COMPLETED,

    result: {
      id: result.id,
      overallScore:
        result.overallScore,

      behavioralSummary:
        result.behavioralSummary,

      competencyScores:
        result.competencyScores,

      completedAt:
        result.completedAt,
    },

    application: {
      id: attempt.applicationId,

      status:
        ApplicationStatus.ASSESSMENT_COMPLETED,
    },
  };
};
export const getAssessmentResult = async (
  attemptId: string,
  userId: string
) => {
  const result =
    await attemptRepository.findResultByAttemptId(
      attemptId
    );

  if (!result) {
    throw new Error("RESULT_NOT_FOUND");
  }

  if (result.attempt.userId !== userId) {
    throw new Error("FORBIDDEN");
  }

  if (
    result.attempt.status !== AttemptStatus.COMPLETED
  ) {
    throw new Error("ATTEMPT_NOT_COMPLETED");
  }

  return {
    attemptId: result.attemptId,

    assessment: {
      id: result.attempt.assessment.id,
      name: result.attempt.assessment.name,
      objective: result.attempt.assessment.objective,
    },

    application: {
      id: result.attempt.application.id,
      status: result.attempt.application.status,

      job: {
        id: result.attempt.application.job.id,
        title: result.attempt.application.job.title,
        slug: result.attempt.application.job.slug,
      },
    },

    overallScore: result.overallScore,

    behavioralSummary:
      result.behavioralSummary,

    competencyScores:
      result.competencyScores,

    completedAt:
      result.completedAt,
  };
};
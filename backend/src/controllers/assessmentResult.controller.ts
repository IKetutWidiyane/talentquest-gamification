import * as assessmentResultRepository from "../repositories/assessmentResult.repository";

export const getCandidateAssessmentResult = async (
  applicationId: string
) => {
  const application =
    await assessmentResultRepository.findApplicationAssessmentResult(
      applicationId
    );

  if (!application) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  const attempt =
    application.assessmentAttempts[0];

  if (!attempt || !attempt.result) {
    throw new Error(
      "ASSESSMENT_RESULT_NOT_FOUND"
    );
  }

  return {
    application: {
      id: application.id,
      status: application.status,
      appliedAt: application.appliedAt,
    },

    candidate: {
      id: application.user.id,
      email: application.user.email,

      profile:
        application.user.candidateProfile,
    },

    job: {
      id: application.job.id,
      title: application.job.title,
      slug: application.job.slug,
      department: application.job.department,
      location: application.job.location,
      employmentType:
        application.job.employmentType,
      experience: application.job.experience,
    },

    assessment: {
      id: attempt.assessment.id,
      name: attempt.assessment.name,
      objective:
        attempt.assessment.objective,
    },

    result: {
      id: attempt.result.id,
      attemptId: attempt.id,

      overallScore:
        attempt.result.overallScore,

      behavioralSummary:
        attempt.result.behavioralSummary,

      competencyScores:
        attempt.result.competencyScores,

      completedAt:
        attempt.result.completedAt,
    },
  };
};
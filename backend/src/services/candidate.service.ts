import * as candidateRepository from "../repositories/candidate.repository";

export const getAllCandidates = async () => {
  const candidates =
    await candidateRepository.findAllCandidates();

  return candidates.map((candidate) => {
    const applicationWithAssessment =
      candidate.applications.find(
        (application) =>
          application.assessmentAttempts.length > 0
      );

    const latestApplication =
      applicationWithAssessment ??
      candidate.applications[0];

    const latestAttempt =
      latestApplication?.assessmentAttempts[0];

    const result =
      latestAttempt?.result;

    const competencyScores =
      result?.competencyScores;

    let topCompetency = null;

    if (
      Array.isArray(competencyScores) &&
      competencyScores.length > 0
    ) {
      topCompetency =
        competencyScores.reduce(
          (highest: any, current: any) => {
            if (!highest) {
              return current;
            }

            return current.score > highest.score
              ? current
              : highest;
          },
          null
        );
    }

    return {
      id: candidate.id,

      email: candidate.email,

      status: candidate.status,

      profile: candidate.candidateProfile,

      latestApplication:
        latestApplication
          ? {
              id: latestApplication.id,

              status:
                latestApplication.status,

              appliedAt:
                latestApplication.appliedAt,

              job: {
                id:
                  latestApplication.job.id,

                title:
                  latestApplication.job.title,

                slug:
                  latestApplication.job.slug,

                department:
                  latestApplication.job.department,

                location:
                  latestApplication.job.location,
              },
            }
          : null,

      assessment: result
        ? {
            attemptId:
              latestAttempt?.id,

            overallScore:
              result.overallScore,

            completedAt:
              result.completedAt,

            topCompetency,
          }
        : null,
    };
  });
};

export const getCandidateById = async (
  candidateId: string
) => {
  const candidate =
    await candidateRepository.findCandidateById(
      candidateId
    );

  if (!candidate) {
    throw new Error("CANDIDATE_NOT_FOUND");
  }

  return {
    id: candidate.id,

    email: candidate.email,

    status: candidate.status,

    createdAt: candidate.createdAt,

    lastLoginAt: candidate.lastLoginAt,

    profile: candidate.candidateProfile,

    applications: candidate.applications.map(
      (application) => ({
        id: application.id,

        status: application.status,

        appliedAt: application.appliedAt,

        updatedAt: application.updatedAt,

        job: {
          id: application.job.id,

          title: application.job.title,

          slug: application.job.slug,

          department:
            application.job.department,

          location:
            application.job.location,

          employmentType:
            application.job.employmentType,

          experience:
            application.job.experience,
        },

        assessmentAttempts:
          application.assessmentAttempts.map(
            (attempt) => ({
              id: attempt.id,

              status: attempt.status,

              startedAt:
                attempt.startedAt,

              completedAt:
                attempt.completedAt,

              assessment: {
                id:
                  attempt.assessment.id,

                name:
                  attempt.assessment.name,

                objective:
                  attempt.assessment.objective,
              },

              result: attempt.result
                ? {
                    id:
                      attempt.result.id,

                    overallScore:
                      attempt.result
                        .overallScore,

                    behavioralSummary:
                      attempt.result
                        .behavioralSummary,

                    competencyScores:
                      attempt.result
                        .competencyScores,

                    completedAt:
                      attempt.result
                        .completedAt,
                  }
                : null,
            })
          ),

        stageHistory:
          application.stageHistory.map(
            (history) => ({
              id: history.id,

              fromStatus:
                history.fromStatus,

              toStatus:
                history.toStatus,

              note: history.note,

              createdAt:
                history.createdAt,
            })
          ),
      })
    ),

    activityLogs:
      candidate.activityLogs.map(
        (activity) => ({
          id: activity.id,

          type: activity.type,

          entityType:
            activity.entityType,

          entityId:
            activity.entityId,

          description:
            activity.description,

          createdAt:
            activity.createdAt,
        })
      ),
  };
};
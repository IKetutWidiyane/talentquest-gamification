import prisma from "../config/prisma";

export const getDashboardAnalytics = async () => {
  const [
    totalCandidates,
    totalJobs,
    activeJobs,
    totalApplications,
    totalAssessments,
    totalAssessmentAttempts,
    completedAssessmentAttempts,
    talentPoolCandidates,
    applicationStatus,
    assessmentStatus,
    assessmentScore,
  ] = await Promise.all([
    prisma.candidateProfile.count(),

    prisma.job.count(),

    prisma.job.count({
      where: {
        status: "ACTIVE",
      },
    }),

    prisma.application.count(),

    prisma.assessment.count(),

    prisma.assessmentAttempt.count(),

    prisma.assessmentAttempt.count({
      where: {
        status: "COMPLETED",
      },
    }),

    prisma.talentPool.count(),

    prisma.application.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    }),

    prisma.assessmentAttempt.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    }),

    prisma.assessmentResult.aggregate({
      _avg: {
        overallScore: true,
      },
    }),
  ]);

  const applicationStats = {
    submitted: 0,
    assessmentCompleted: 0,
    underReview: 0,
    interview: 0,
    finalDecision: 0,
    rejected: 0,
  };

  for (const item of applicationStatus) {
    const count = item._count._all;

    switch (item.status) {
      case "SUBMITTED":
        applicationStats.submitted = count;
        break;

      case "ASSESSMENT_COMPLETED":
        applicationStats.assessmentCompleted = count;
        break;

      case "UNDER_REVIEW":
        applicationStats.underReview = count;
        break;

      case "INTERVIEW":
        applicationStats.interview = count;
        break;

      case "FINAL_DECISION":
        applicationStats.finalDecision = count;
        break;

      case "REJECTED":
        applicationStats.rejected = count;
        break;
    }
  }

  const assessmentStats = {
    inProgress: 0,
    completed: 0,
    expired: 0,
    averageScore: assessmentScore._avg.overallScore ?? 0,
  };

  for (const item of assessmentStatus) {
    const count = item._count._all;

    switch (item.status) {
      case "IN_PROGRESS":
        assessmentStats.inProgress = count;
        break;

      case "COMPLETED":
        assessmentStats.completed = count;
        break;

      case "EXPIRED":
        assessmentStats.expired = count;
        break;
    }
  }

  return {
    overview: {
      totalCandidates,
      totalJobs,
      activeJobs,
      totalApplications,
      totalAssessments,
      totalAssessmentAttempts,
      completedAssessmentAttempts,
      talentPoolCandidates,
    },

    applications: applicationStats,

    assessments: assessmentStats,
  };
};

export const getApplicationAnalytics = async () => {
  const [
    totalApplications,
    submitted,
    assessmentCompleted,
    underReview,
    interview,
    finalDecision,
    rejected,
  ] = await Promise.all([
    prisma.application.count(),

    prisma.application.count({
      where: {
        status: "SUBMITTED",
      },
    }),

    prisma.application.count({
      where: {
        status: "ASSESSMENT_COMPLETED",
      },
    }),

    prisma.application.count({
      where: {
        status: "UNDER_REVIEW",
      },
    }),

    prisma.application.count({
      where: {
        status: "INTERVIEW",
      },
    }),

    prisma.application.count({
      where: {
        status: "FINAL_DECISION",
      },
    }),

    prisma.application.count({
      where: {
        status: "REJECTED",
      },
    }),
  ]);

  return {
    totalApplications,

    byStatus: {
      submitted,
      assessmentCompleted,
      underReview,
      interview,
      finalDecision,
      rejected,
    },
  };
};
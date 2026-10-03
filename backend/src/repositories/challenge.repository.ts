import prisma from "../config/prisma";

export const findAllChallenges = async (assessmentId?: string) => {
  return prisma.challenge.findMany({
    where: assessmentId
      ? {
          assessmentId,
        }
      : undefined,
    include: {
      competency: true,
      options: {
        orderBy: {
          id: "asc",
        },
      },
    },
    orderBy: [
      {
        assessmentId: "asc",
      },
      {
        order: "asc",
      },
    ],
  });
};

export const findChallengeById = async (challengeId: string) => {
  return prisma.challenge.findUnique({
    where: {
      id: challengeId,
    },
    include: {
      assessment: true,
      competency: true,
      options: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });
};

export const createChallenge = async (data: {
  assessmentId: string;
  competencyId: string;
  name: string;
  scenario: string;
  question: string;
  order: number;
  weight?: number;
}) => {
  return prisma.challenge.create({
    data,
    include: {
      competency: true,
      options: true,
    },
  });
};

export const updateChallenge = async (
  challengeId: string,
  data: {
    competencyId?: string;
    name?: string;
    scenario?: string;
    question?: string;
    order?: number;
    weight?: number;
  }
) => {
  return prisma.challenge.update({
    where: {
      id: challengeId,
    },
    data,
    include: {
      competency: true,
      options: true,
    },
  });
};

export const deleteChallenge = async (challengeId: string) => {
  return prisma.challenge.delete({
    where: {
      id: challengeId,
    },
  });
};

export const createChallengeOption = async (data: {
  challengeId: string;
  label: string;
  value: string;
  score: number;
  behavioralIndicator?: string;
}) => {
  return prisma.challengeOption.create({
    data,
  });
};

export const updateChallengeOption = async (
  optionId: string,
  data: {
    label?: string;
    value?: string;
    score?: number;
    behavioralIndicator?: string;
  }
) => {
  return prisma.challengeOption.update({
    where: {
      id: optionId,
    },
    data,
  });
};

export const deleteChallengeOption = async (optionId: string) => {
  return prisma.challengeOption.delete({
    where: {
      id: optionId,
    },
  });
};
import * as challengeRepository from "../repositories/challenge.repository";

export const getAllChallenges = async (assessmentId?: string) => {
  return challengeRepository.findAllChallenges(assessmentId);
};

export const getChallengeById = async (challengeId: string) => {
  const challenge =
    await challengeRepository.findChallengeById(challengeId);

  if (!challenge) {
    throw new Error("CHALLENGE_NOT_FOUND");
  }

  return challenge;
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
  return challengeRepository.createChallenge(data);
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
  const existing =
    await challengeRepository.findChallengeById(challengeId);

  if (!existing) {
    throw new Error("CHALLENGE_NOT_FOUND");
  }

  return challengeRepository.updateChallenge(
    challengeId,
    data
  );
};

export const deleteChallenge = async (challengeId: string) => {
  const existing =
    await challengeRepository.findChallengeById(challengeId);

  if (!existing) {
    throw new Error("CHALLENGE_NOT_FOUND");
  }

  return challengeRepository.deleteChallenge(challengeId);
};

export const createChallengeOption = async (
  challengeId: string,
  data: {
    label: string;
    value: string;
    score: number;
    behavioralIndicator?: string;
  }
) => {
  const challenge =
    await challengeRepository.findChallengeById(challengeId);

  if (!challenge) {
    throw new Error("CHALLENGE_NOT_FOUND");
  }

  return challengeRepository.createChallengeOption({
    challengeId,
    ...data,
  });
};

export const updateChallengeOption = async (
  challengeId: string,
  optionId: string,
  data: {
    label?: string;
    value?: string;
    score?: number;
    behavioralIndicator?: string;
  }
) => {
  const challenge =
    await challengeRepository.findChallengeById(challengeId);

  if (!challenge) {
    throw new Error("CHALLENGE_NOT_FOUND");
  }

  const option = challenge.options.find(
    (item) => item.id === optionId
  );

  if (!option) {
    throw new Error("OPTION_NOT_FOUND");
  }

  return challengeRepository.updateChallengeOption(
    optionId,
    data
  );
};

export const deleteChallengeOption = async (
  challengeId: string,
  optionId: string
) => {
  const challenge =
    await challengeRepository.findChallengeById(challengeId);

  if (!challenge) {
    throw new Error("CHALLENGE_NOT_FOUND");
  }

  const option = challenge.options.find(
    (item) => item.id === optionId
  );

  if (!option) {
    throw new Error("OPTION_NOT_FOUND");
  }

  return challengeRepository.deleteChallengeOption(optionId);
};
import * as talentPoolRepository from "../repositories/talentPool.repository";

export const getAllTalentPool = async () => {
  return talentPoolRepository.findAllTalentPool();
};

export const getTalentPoolById = async (
  talentPoolId: string
) => {
  const talentPool =
    await talentPoolRepository.findTalentPoolById(
      talentPoolId
    );

  if (!talentPool) {
    throw new Error("TALENT_POOL_NOT_FOUND");
  }

  return talentPool;
};

export const addToTalentPool = async (
  candidateProfileId: string,
  addedByUserId: string,
  data: {
    status?: "ACTIVE" | "HIRED" | "INACTIVE";
    notes?: string;
    tags?: string;
  }
) => {
  const existing =
    await talentPoolRepository.findTalentPoolByCandidateProfileId(
      candidateProfileId
    );

  if (existing) {
    throw new Error("CANDIDATE_ALREADY_IN_TALENT_POOL");
  }

  return talentPoolRepository.createTalentPool({
    candidateProfileId,
    addedByUserId,
    ...data,
  });
};

export const updateTalentPool = async (
  talentPoolId: string,
  data: {
    status?: "ACTIVE" | "HIRED" | "INACTIVE";
    notes?: string;
    tags?: string;
  }
) => {
  const existing =
    await talentPoolRepository.findTalentPoolById(
      talentPoolId
    );

  if (!existing) {
    throw new Error("TALENT_POOL_NOT_FOUND");
  }

  return talentPoolRepository.updateTalentPool(
    talentPoolId,
    data
  );
};

export const deleteTalentPool = async (
  talentPoolId: string
) => {
  const existing =
    await talentPoolRepository.findTalentPoolById(
      talentPoolId
    );

  if (!existing) {
    throw new Error("TALENT_POOL_NOT_FOUND");
  }

  return talentPoolRepository.deleteTalentPool(
    talentPoolId
  );
};
import * as competencyRepository from "../repositories/competency.repository";

export const getAllCompetencies = async () => {
  return competencyRepository.findAllCompetencies();
};

export const getCompetencyById = async (
  competencyId: string
) => {
  const competency =
    await competencyRepository.findCompetencyById(
      competencyId
    );

  if (!competency) {
    throw new Error("COMPETENCY_NOT_FOUND");
  }

  return competency;
};

export const createCompetency = async (data: {
  name: string;
  description?: string;
}) => {
  return competencyRepository.createCompetency(data);
};

export const updateCompetency = async (
  competencyId: string,
  data: {
    name?: string;
    description?: string;
  }
) => {
  const existing =
    await competencyRepository.findCompetencyById(competencyId);

  if (!existing) {
    throw new Error("COMPETENCY_NOT_FOUND");
  }

  return competencyRepository.updateCompetency(
    competencyId,
    data
  );
};

export const deleteCompetency = async (
  competencyId: string
) => {
  const existing =
    await competencyRepository.findCompetencyById(
      competencyId
    );

  if (!existing) {
    throw new Error("COMPETENCY_NOT_FOUND");
  }

  if (
    existing._count.jobMappings > 0 ||
    existing._count.assessmentMappings > 0 ||
    existing._count.challenges > 0
  ) {
    throw new Error("COMPETENCY_IN_USE");
  }

  return competencyRepository.deleteCompetency(
    competencyId
  );
};
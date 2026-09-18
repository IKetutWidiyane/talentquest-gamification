import {
  AssessmentStatus,
} from "@prisma/client";

import * as assessmentRepository from "../repositories/assessment.repository";

interface CreateAssessmentInput {
  name: string;
  objective?: string;
  status?: AssessmentStatus;
}

interface UpdateAssessmentInput {
  name?: string;
  objective?: string;
  status?: AssessmentStatus;
}

export const getAssessmentById = async (
  id: string
) => {
  const assessment =
    await assessmentRepository.findAssessmentById(id);

  if (!assessment) {
    throw new Error("ASSESSMENT_NOT_FOUND");
  }

  return assessment;
};

export const getPublishedAssessmentById = async (
  id: string
) => {
  const assessment =
    await assessmentRepository.findPublishedAssessmentById(
      id
    );

  if (!assessment) {
    throw new Error("ASSESSMENT_NOT_FOUND");
  }

  return assessment;
};

export const getAllAssessments = async () => {
  return assessmentRepository.findAllAssessments();
};

export const createAssessment = async (
  input: CreateAssessmentInput
) => {
  return assessmentRepository.createAssessment({
    name: input.name,
    objective: input.objective,
    status:
      input.status ?? AssessmentStatus.DRAFT,
  });
};

export const updateAssessment = async (
  id: string,
  input: UpdateAssessmentInput
) => {
  const existingAssessment =
    await assessmentRepository.findAssessmentById(id);

  if (!existingAssessment) {
    throw new Error("ASSESSMENT_NOT_FOUND");
  }

  return assessmentRepository.updateAssessment(
    id,
    {
      ...(input.name !== undefined && {
        name: input.name,
      }),

      ...(input.objective !== undefined && {
        objective: input.objective,
      }),

      ...(input.status !== undefined && {
        status: input.status,
      }),
    }
  );
};

export const updateAssessmentStatus = async (
  id: string,
  status: AssessmentStatus
) => {
  const existingAssessment =
    await assessmentRepository.findAssessmentById(id);

  if (!existingAssessment) {
    throw new Error("ASSESSMENT_NOT_FOUND");
  }

  return assessmentRepository.updateAssessment(
    id,
    {
      status,
      ...(status === AssessmentStatus.PUBLISHED && {
        publishedAt: new Date(),
      }),
    }
  );
};

export const deleteAssessment = async (
  id: string
) => {
  const existingAssessment =
    await assessmentRepository.findAssessmentById(id);

  if (!existingAssessment) {
    throw new Error("ASSESSMENT_NOT_FOUND");
  }

  return assessmentRepository.deleteAssessment(id);
};
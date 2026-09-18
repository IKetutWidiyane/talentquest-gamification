import {
  AssessmentStatus,
  Prisma,
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
};

/**
 * Sanitize assessment data untuk Candidate.
 *
 * Candidate hanya boleh melihat informasi yang dibutuhkan
 * untuk mengerjakan assessment.
 *
 * score dan behavioralIndicator TIDAK dikirim ke Candidate.
 */
const sanitizeAssessmentForCandidate = (assessment: any) => {
  return {
    id: assessment.id,
    name: assessment.name,
    objective: assessment.objective,
    status: assessment.status,
    publishedAt: assessment.publishedAt,

    competencies: assessment.competencies.map((item: any) => ({
      id: item.id,
      competencyId: item.competencyId,
      weight: item.weight,

      competency: {
        id: item.competency.id,
        name: item.competency.name,
        description: item.competency.description,
      },
    })),

    challenges: assessment.challenges.map((challenge: any) => ({
      id: challenge.id,
      name: challenge.name,
      scenario: challenge.scenario,
      question: challenge.question,
      order: challenge.order,
      weight: challenge.weight,

      options: challenge.options.map((option: any) => ({
        id: option.id,
        label: option.label,
        value: option.value,
      })),
    })),
  };
};

/**
 * GET all assessments
 * Digunakan oleh Talent Acquisition.
 */
export const getAllAssessments = async () => {
  return assessmentRepository.findAllAssessments();
};

/**
 * GET assessment by ID
 * Digunakan oleh Talent Acquisition.
 */
export const getAssessmentById = async (id: string) => {
  const assessment =
    await assessmentRepository.findAssessmentById(id);

  if (!assessment) {
    throw new Error("ASSESSMENT_NOT_FOUND");
  }

  return assessment;
};

/**
 * GET published assessment by ID
 * Digunakan oleh Candidate.
 *
 * Data disanitasi agar score dan behavioralIndicator
 * tidak dapat dilihat oleh Candidate.
 */
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

  return sanitizeAssessmentForCandidate(assessment);
};

/**
 * CREATE assessment
 * Hanya Talent Acquisition.
 */
export const createAssessment = async (
  input: CreateAssessmentInput
) => {
  const data: Prisma.AssessmentCreateInput = {
    name: input.name,
    objective: input.objective,
    status: input.status ?? AssessmentStatus.DRAFT,
  };

  const assessment =
    await assessmentRepository.createAssessment(data);

  return assessment;
};

/**
 * UPDATE assessment
 * Hanya Talent Acquisition.
 */
export const updateAssessment = async (
  id: string,
  input: UpdateAssessmentInput
) => {
  const existingAssessment =
    await assessmentRepository.findAssessmentById(id);

  if (!existingAssessment) {
    throw new Error("ASSESSMENT_NOT_FOUND");
  }

  const data: Prisma.AssessmentUpdateInput = {};

  if (input.name !== undefined) {
    data.name = input.name;
  }

  if (input.objective !== undefined) {
    data.objective = input.objective;
  }

  if (input.status !== undefined) {
    data.status = input.status;

    if (input.status === AssessmentStatus.PUBLISHED) {
      data.publishedAt = new Date();
    }
  }

  const assessment =
    await assessmentRepository.updateAssessment(
      id,
      data
    );

  return assessment;
};

/**
 * UPDATE assessment status
 * Hanya Talent Acquisition.
 */
export const updateAssessmentStatus = async (
  id: string,
  status: AssessmentStatus
) => {
  const existingAssessment =
    await assessmentRepository.findAssessmentById(id);

  if (!existingAssessment) {
    throw new Error("ASSESSMENT_NOT_FOUND");
  }

  const data: Prisma.AssessmentUpdateInput = {
    status,
  };

  if (status === AssessmentStatus.PUBLISHED) {
    data.publishedAt = new Date();
  }

  if (status !== AssessmentStatus.PUBLISHED) {
    data.publishedAt = null;
  }

  const assessment =
    await assessmentRepository.updateAssessment(
      id,
      data
    );

  return assessment;
};

/**
 * DELETE assessment
 * Hanya Talent Acquisition.
 */
export const deleteAssessment = async (id: string) => {
  const existingAssessment =
    await assessmentRepository.findAssessmentById(id);

  if (!existingAssessment) {
    throw new Error("ASSESSMENT_NOT_FOUND");
  }

  await assessmentRepository.deleteAssessment(id);

  return {
    id,
    message: "Assessment deleted successfully",
  };
};
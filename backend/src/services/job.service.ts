import {
  EmploymentType,
  JobStatus,
  Prisma,
} from "@prisma/client";

import * as jobRepository from "../repositories/job.repository";

interface CreateJobInput {
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  experience?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  status?: JobStatus;
  competencyIds?: string[];
}

interface UpdateJobInput {
  title?: string;
  department?: string;
  location?: string;
  employmentType?: EmploymentType;
  experience?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  status?: JobStatus;
  competencyIds?: string[];
}

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const generateUniqueSlug = async (title: string) => {
  const baseSlug = generateSlug(title);

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingJob = await jobRepository.findJobBySlug(slug);

    if (!existingJob) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

const buildJobUpdateData = (
  input: UpdateJobInput
): Prisma.JobUpdateInput => {
  const {
    competencyIds,
    responsibilities,
    requirements,
    ...jobFields
  } = input;

  const data: Prisma.JobUpdateInput = {
    ...jobFields,
  };

  if (responsibilities !== undefined) {
    data.responsibilities = JSON.stringify(responsibilities);
  }

  if (requirements !== undefined) {
    data.requirements = JSON.stringify(requirements);
  }

  if (competencyIds !== undefined) {
    data.competencies = {
      deleteMany: {},
      create: competencyIds.map((competencyId) => ({
        competency: {
          connect: {
            id: competencyId,
          },
        },
        weight: 1,
      })),
    };
  }

  return data;
};

export const getActiveJobs = async () => {
  return jobRepository.findActiveJobs();
};

export const getActiveJobById = async (id: string) => {
  const job = await jobRepository.findActiveJobById(id);

  if (!job) {
    throw new Error("JOB_NOT_FOUND");
  }

  return job;
};

export const getJobById = async (id: string) => {
  const job = await jobRepository.findJobById(id);

  if (!job) {
    throw new Error("JOB_NOT_FOUND");
  }

  return job;
};

export const createJob = async (input: CreateJobInput) => {
  const {
    competencyIds = [],
    status = JobStatus.DRAFT,
    responsibilities,
    requirements,
    ...jobFields
  } = input;

  const slug = await generateUniqueSlug(input.title);

  return jobRepository.createJob({
    ...jobFields,
    slug,
    status,

    responsibilities: JSON.stringify(responsibilities),

    requirements: JSON.stringify(requirements),

    competencies: {
      create: competencyIds.map((competencyId) => ({
        competency: {
          connect: {
            id: competencyId,
          },
        },
        weight: 1,
      })),
    },
  });
};

export const updateJob = async (
  id: string,
  input: UpdateJobInput
) => {
  const existingJob = await jobRepository.findJobById(id);

  if (!existingJob) {
    throw new Error("JOB_NOT_FOUND");
  }

  let data = buildJobUpdateData(input);

  if (input.title && input.title !== existingJob.title) {
    const slug = await generateUniqueSlug(input.title);

    data = {
      ...data,
      slug,
    };
  }

  return jobRepository.updateJob(id, data);
};

export const updateJobStatus = async (
  id: string,
  status: JobStatus
) => {
  const existingJob = await jobRepository.findJobById(id);

  if (!existingJob) {
    throw new Error("JOB_NOT_FOUND");
  }

  return jobRepository.updateJob(id, {
    status,
  });
};

export const deleteJob = async (id: string) => {
  const existingJob = await jobRepository.findJobById(id);

  if (!existingJob) {
    throw new Error("JOB_NOT_FOUND");
  }

  return jobRepository.deleteJob(id);
};
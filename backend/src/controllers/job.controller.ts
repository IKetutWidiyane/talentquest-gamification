import { Request, Response } from "express";

import {
  createJobSchema,
  updateJobSchema,
  updateJobStatusSchema,
} from "../validators/job.validator";

import * as jobService from "../services/job.service";

export const getJobs = async (
  _req: Request,
  res: Response
) => {
  try {
    const jobs = await jobService.getActiveJobs();

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

export const getJobById = async (
  req: Request,
  res: Response
) => {
  try {
    const job = await jobService.getActiveJobById(
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "JOB_NOT_FOUND"
    ) {
      res.status(404).json({
        success: false,
        message: "Job not found",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch job",
    });
  }
};

export const createJob = async (
  req: Request,
  res: Response
) => {
  try {
    const input = createJobSchema.parse(req.body);

    const job = await jobService.createJob(input);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          message: "Invalid job data",
          errors: JSON.parse(error.message),
        });

        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
};

export const updateJob = async (
  req: Request,
  res: Response
) => {
  try {
    const input = updateJobSchema.parse(req.body);

    const job = await jobService.updateJob(
      String(req.params.id),
      input
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "JOB_NOT_FOUND"
    ) {
      res.status(404).json({
        success: false,
        message: "Job not found",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: "Invalid job data",
    });
  }
};

export const updateJobStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = updateJobStatusSchema.parse(
      req.body
    );

    const job = await jobService.updateJobStatus(
      String(req.params.id),
      status
    );

    res.status(200).json({
      success: true,
      message: "Job status updated successfully",
      data: job,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "JOB_NOT_FOUND"
    ) {
      res.status(404).json({
        success: false,
        message: "Job not found",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: "Invalid job status",
    });
  }
};

export const deleteJob = async (
  req: Request,
  res: Response
) => {
  try {
    await jobService.deleteJob(String(req.params.id));

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "JOB_NOT_FOUND"
    ) {
      res.status(404).json({
        success: false,
        message: "Job not found",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete job",
    });
  }
};
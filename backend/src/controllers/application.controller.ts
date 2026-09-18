import { Request, Response } from "express";

import {
  createApplicationSchema,
  updateApplicationStatusSchema,
} from "../validators/application.validator";

import * as applicationService from "../services/application.service";

export const createApplication = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const input = createApplicationSchema.parse(req.body);

    const application =
      await applicationService.createApplication({
        userId: req.user.userId,
        jobId: input.jobId,
      });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "JOB_NOT_FOUND") {
        res.status(404).json({
          success: false,
          message: "Job not found",
        });
        return;
      }

      if (error.message === "JOB_NOT_ACTIVE") {
        res.status(400).json({
          success: false,
          message: "Job is not currently active",
        });
        return;
      }

      if (error.message === "ALREADY_APPLIED") {
        res.status(409).json({
          success: false,
          message: "You have already applied to this job",
        });
        return;
      }

      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          message: "Invalid application data",
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
};

export const getMyApplications = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const applications =
      await applicationService.getCandidateApplications(
        req.user.userId
      );

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

export const getApplications = async (
  _req: Request,
  res: Response
) => {
  try {
    const applications =
      await applicationService.getAllApplications();

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

export const getApplicationById = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const application =
      await applicationService.getApplicationById(
        String(req.params.id),
        req.user.userId,
        req.user.role === "CANDIDATE"
      );

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "APPLICATION_NOT_FOUND") {
        res.status(404).json({
          success: false,
          message: "Application not found",
        });
        return;
      }

      if (error.message === "FORBIDDEN") {
        res.status(403).json({
          success: false,
          message:
            "You do not have permission to access this application",
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};

export const updateApplicationStatus = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const { status } =
      updateApplicationStatusSchema.parse(req.body);

    const application =
      await applicationService.updateApplicationStatus(
        String(req.params.id),
        status,
        req.user.userId
      );

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "APPLICATION_NOT_FOUND") {
        res.status(404).json({
          success: false,
          message: "Application not found",
        });
        return;
      }

      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          message: "Invalid application status",
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};
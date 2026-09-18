import { Request, Response } from "express";

import {
  createAssessmentSchema,
  updateAssessmentSchema,
  updateAssessmentStatusSchema,
} from "../validators/assessment.validator";

import * as assessmentService from "../services/assessment.service";

export const getAssessmentById = async (
  req: Request,
  res: Response
) => {
  try {
    const assessment =
      await assessmentService.getAssessmentById(
        String(req.params.id)
      );

    res.status(200).json({
      success: true,
      data: assessment,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "ASSESSMENT_NOT_FOUND"
    ) {
      res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch assessment",
    });
  }
};

export const getPublishedAssessmentById = async (
  req: Request,
  res: Response
) => {
  try {
    const assessment =
      await assessmentService.getPublishedAssessmentById(
        String(req.params.id)
      );

    res.status(200).json({
      success: true,
      data: assessment,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "ASSESSMENT_NOT_FOUND"
    ) {
      res.status(404).json({
        success: false,
        message: "Published assessment not found",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch assessment",
    });
  }
};


export const getAssessments = async (
  _req: Request,
  res: Response
) => {
  try {
    const assessments =
      await assessmentService.getAllAssessments();

    res.status(200).json({
      success: true,
      data: assessments,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch assessments",
    });
  }
};

export const createAssessment = async (
  req: Request,
  res: Response
) => {
  try {
    const input =
      createAssessmentSchema.parse(req.body);

    const assessment =
      await assessmentService.createAssessment(
        input
      );

    res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      data: assessment,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message ===
        "ASSESSMENT_ALREADY_EXISTS"
      ) {
        res.status(409).json({
          success: false,
          message:
            "An assessment already exists for this job",
        });
        return;
      }

      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          message: "Invalid assessment data",
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to create assessment",
    });
  }
};

export const updateAssessment = async (
  req: Request,
  res: Response
) => {
  try {
    const input =
      updateAssessmentSchema.parse(req.body);

    const assessment =
      await assessmentService.updateAssessment(
        String(req.params.id),
        input
      );

    res.status(200).json({
      success: true,
      message: "Assessment updated successfully",
      data: assessment,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "ASSESSMENT_NOT_FOUND"
      ) {
        res.status(404).json({
          success: false,
          message: "Assessment not found",
        });
        return;
      }

      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          message: "Invalid assessment data",
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to update assessment",
    });
  }
};

export const updateAssessmentStatus =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { status } =
        updateAssessmentStatusSchema.parse(
          req.body
        );

      const assessment =
        await assessmentService.updateAssessmentStatus(
          String(req.params.id),
          status
        );

      res.status(200).json({
        success: true,
        message:
          "Assessment status updated successfully",
        data: assessment,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message ===
          "ASSESSMENT_NOT_FOUND"
        ) {
          res.status(404).json({
            success: false,
            message: "Assessment not found",
          });
          return;
        }

        if (error.name === "ZodError") {
          res.status(400).json({
            success: false,
            message:
              "Invalid assessment status",
          });
          return;
        }
      }

      res.status(500).json({
        success: false,
        message:
          "Failed to update assessment status",
      });
    }
  };

export const deleteAssessment = async (
  req: Request,
  res: Response
) => {
  try {
    await assessmentService.deleteAssessment(
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      message: "Assessment deleted successfully",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "ASSESSMENT_NOT_FOUND"
    ) {
      res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete assessment",
    });
  }
};
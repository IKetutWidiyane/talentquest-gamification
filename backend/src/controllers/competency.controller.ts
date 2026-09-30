import { Request, Response } from "express";
import * as competencyService from "../services/competency.service";
import {
  createCompetencySchema,
  updateCompetencySchema,
} from "../validators/competency.validator";

export const getCompetencies = async (
  _req: Request,
  res: Response
) => {
  try {
    const competencies =
      await competencyService.getAllCompetencies();

    return res.status(200).json({
      success: true,
      data: competencies,
    });
  } catch (error) {
    console.error(
      "Get competencies error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get competencies",
    });
  }
};

export const getCompetency = async (
  req: Request,
  res: Response
) => {
  try {
    const competencyId =
      String(req.params.id);

    const competency =
      await competencyService.getCompetencyById(
        competencyId
      );

    return res.status(200).json({
      success: true,
      data: competency,
    });
  } catch (error: any) {
    console.error(
      "Get competency error:",
      error
    );

    if (
      error.message ===
      "COMPETENCY_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Competency not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to get competency",
    });
  }
};

export const createCompetency = async (
  req: Request,
  res: Response
) => {
  try {
    const validation =
      createCompetencySchema.safeParse(
        req.body
      );

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid competency data",
        errors: validation.error.flatten(),
      });
    }

    const competency =
      await competencyService.createCompetency(
        validation.data
      );

    return res.status(201).json({
      success: true,
      message: "Competency created successfully",
      data: competency,
    });
  } catch (error: any) {
    console.error(
      "Create competency error:",
      error
    );

    if (
      error.code === "P2002"
    ) {
      return res.status(409).json({
        success: false,
        message: "Competency name already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create competency",
    });
  }
};

export const updateCompetency = async (
  req: Request,
  res: Response
) => {
  try {
    const competencyId =
      String(req.params.id);

    const validation =
      updateCompetencySchema.safeParse(
        req.body
      );

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid competency data",
        errors: validation.error.flatten(),
      });
    }

    const competency =
      await competencyService.updateCompetency(
        competencyId,
        validation.data
      );

    return res.status(200).json({
      success: true,
      message: "Competency updated successfully",
      data: competency,
    });
  } catch (error: any) {
    console.error(
      "Update competency error:",
      error
    );

    if (
      error.message ===
      "COMPETENCY_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Competency not found",
      });
    }

    if (
      error.code === "P2002"
    ) {
      return res.status(409).json({
        success: false,
        message: "Competency name already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update competency",
    });
  }
};

export const deleteCompetency = async (
  req: Request,
  res: Response
) => {
  try {
    const competencyId =
      String(req.params.id);

    await competencyService.deleteCompetency(
      competencyId
    );

    return res.status(200).json({
      success: true,
      message: "Competency deleted successfully",
    });
  } catch (error: any) {
    console.error(
      "Delete competency error:",
      error
    );

    if (
      error.message ===
      "COMPETENCY_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Competency not found",
      });
    }

    if (
      error.message ===
      "COMPETENCY_IN_USE"
    ) {
      return res.status(409).json({
        success: false,
        message:
          "Competency cannot be deleted because it is currently in use",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete competency",
    });
  }
};
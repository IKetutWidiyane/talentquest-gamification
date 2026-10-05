import { Request, Response } from "express";

import * as talentPoolService from "../services/talentPool.service";

import {
  createTalentPoolSchema,
  updateTalentPoolSchema,
} from "../validators/talentPool.validator";

export const getTalentPool = async (
  _req: Request,
  res: Response
) => {
  try {
    const talentPool =
      await talentPoolService.getAllTalentPool();

    return res.json({
      success: true,
      data: talentPool,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch talent pool",
    });
  }
};

export const getTalentPoolById = async (
  req: Request,
  res: Response
) => {
  try {
    const talentPoolId = req.params.id as string;

    const talentPool =
      await talentPoolService.getTalentPoolById(
        talentPoolId
      );

    return res.json({
      success: true,
      data: talentPool,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "TALENT_POOL_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Talent pool entry not found",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch talent pool entry",
    });
  }
};

export const addToTalentPool = async (
  req: Request,
  res: Response
) => {
  try {
    const validation =
      createTalentPoolSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        errors: validation.error.flatten(),
      });
    }

    const userId = req.user!.userId;

    const talentPool =
      await talentPoolService.addToTalentPool(
        validation.data.candidateProfileId,
        userId,
        {
          status: validation.data.status,
          notes: validation.data.notes,
          tags: validation.data.tags,
        }
      );

    return res.status(201).json({
      success: true,
      message: "Candidate added to talent pool",
      data: talentPool,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "CANDIDATE_ALREADY_IN_TALENT_POOL"
    ) {
      return res.status(409).json({
        success: false,
        message: "Candidate is already in talent pool",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add candidate to talent pool",
    });
  }
};

export const updateTalentPool = async (
  req: Request,
  res: Response
) => {
  try {
    const talentPoolId = req.params.id as string;

    const validation =
      updateTalentPoolSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        errors: validation.error.flatten(),
      });
    }

    const talentPool =
      await talentPoolService.updateTalentPool(
        talentPoolId,
        validation.data
      );

    return res.json({
      success: true,
      message: "Talent pool updated",
      data: talentPool,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "TALENT_POOL_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Talent pool entry not found",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update talent pool",
    });
  }
};

export const deleteTalentPool = async (
  req: Request,
  res: Response
) => {
  try {
    const talentPoolId = req.params.id as string;

    await talentPoolService.deleteTalentPool(
      talentPoolId
    );

    return res.json({
      success: true,
      message: "Candidate removed from talent pool",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "TALENT_POOL_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Talent pool entry not found",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove candidate from talent pool",
    });
  }
};
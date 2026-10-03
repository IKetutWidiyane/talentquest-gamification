import { Request, Response } from "express";
import * as challengeService from "../services/challenge.service";
import {
  createChallengeSchema,
  updateChallengeSchema,
  createChallengeOptionSchema,
  updateChallengeOptionSchema,
} from "../validators/challenge.validator";

export const getChallenges = async (
  req: Request,
  res: Response
) => {
  try {
    const assessmentId =
      typeof req.query.assessmentId === "string"
        ? req.query.assessmentId
        : undefined;

    const data =
      await challengeService.getAllChallenges(assessmentId);

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Get challenges error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get challenges",
    });
  }
};

export const getChallenge = async (
  req: Request,
  res: Response
) => {
  try {
    const data =
      await challengeService.getChallengeById(req.params.id as string);

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "CHALLENGE_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    console.error("Get challenge error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get challenge",
    });
  }
};

export const createChallenge = async (
  req: Request,
  res: Response
) => {
  try {
    const result = createChallengeSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid challenge data",
        errors: result.error.flatten(),
      });
    }

    const data =
      await challengeService.createChallenge(result.data);

    return res.status(201).json({
      success: true,
      message: "Challenge created successfully",
      data,
    });
  } catch (error) {
    console.error("Create challenge error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create challenge",
    });
  }
};

export const updateChallenge = async (
  req: Request,
  res: Response
) => {
  try {
    const result = updateChallengeSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid challenge data",
        errors: result.error.flatten(),
      });
    }

    const data =
      await challengeService.updateChallenge(
        req.params.id as string,
        result.data
      );

    return res.json({
      success: true,
      message: "Challenge updated successfully",
      data,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "CHALLENGE_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    console.error("Update challenge error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update challenge",
    });
  }
};

export const deleteChallenge = async (
  req: Request,
  res: Response
) => {
  try {
    await challengeService.deleteChallenge(req.params.id as string);

    return res.json({
      success: true,
      message: "Challenge deleted successfully",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "CHALLENGE_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    console.error("Delete challenge error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete challenge",
    });
  }
};

export const createChallengeOption = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      createChallengeOptionSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid option data",
        errors: result.error.flatten(),
      });
    }

    const data =
      await challengeService.createChallengeOption(
        req.params.id as string,
        result.data
      );

    return res.status(201).json({
      success: true,
      message: "Challenge option created successfully",
      data,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "CHALLENGE_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    console.error("Create challenge option error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create challenge option",
    });
  }
};

export const updateChallengeOption = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      updateChallengeOptionSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid option data",
        errors: result.error.flatten(),
      });
    }

    const data =
      await challengeService.updateChallengeOption(
        req.params.id as string,
        req.params.optionId as string,
        result.data
      );

    return res.json({
      success: true,
      message: "Challenge option updated successfully",
      data,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "CHALLENGE_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    if (
      error instanceof Error &&
      error.message === "OPTION_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Challenge option not found",
      });
    }

    console.error("Update challenge option error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update challenge option",
    });
  }
};

export const deleteChallengeOption = async (
  req: Request,
  res: Response
) => {
  try {
    await challengeService.deleteChallengeOption(
      req.params.id as string,
      req.params.optionId as string
    );

    return res.json({
      success: true,
      message: "Challenge option deleted successfully",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "CHALLENGE_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    if (
      error instanceof Error &&
      error.message === "OPTION_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Challenge option not found",
      });
    }

    console.error("Delete challenge option error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete challenge option",
    });
  }
};
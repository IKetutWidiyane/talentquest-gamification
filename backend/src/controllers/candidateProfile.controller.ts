import { Request, Response } from "express";
import * as candidateProfileService from "../services/candidateProfile.service";
import { updateCandidateProfileSchema } from "../validators/candidateProfile.validator";

export const getCandidateProfile = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const profile =
      await candidateProfileService.getCandidateProfile(
        req.user.userId
      );

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    console.error(
      "Get candidate profile error:",
      error
    );

    if (error.message === "PROFILE_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Candidate profile not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to get candidate profile",
    });
  }
};

export const updateCandidateProfile = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const validation =
      updateCandidateProfileSchema.safeParse(
        req.body
      );

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid profile data",
        errors: validation.error.flatten(),
      });
    }

    const profile =
      await candidateProfileService.updateCandidateProfile(
        req.user.userId,
        validation.data
      );

    return res.status(200).json({
      success: true,
      message: "Candidate profile updated successfully",
      data: profile,
    });
  } catch (error: any) {
    console.error(
      "Update candidate profile error:",
      error
    );

    if (error.message === "PROFILE_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Candidate profile not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update candidate profile",
    });
  }
};
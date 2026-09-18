import { Request, Response } from "express";

import {
  startAssessmentSchema,
  submitResponseSchema,
} from "../validators/assessmentAttempt.validator";

import * as attemptService from "../services/assessmentAttempt.service";

export const startAssessment = async (
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

    const input =
      startAssessmentSchema.parse(req.body);

    const attempt =
      await attemptService.startAssessment({
        userId: req.user.userId,
        assessmentId: input.assessmentId,
        applicationId: input.applicationId,
      });

    res.status(201).json({
      success: true,
      message: "Assessment started successfully",
      data: {
        id: attempt.id,
        status: attempt.status,
        startedAt: attempt.startedAt,
        expiresAt: attempt.expiresAt,
        assessment: attempt.assessment,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "APPLICATION_NOT_FOUND"
      ) {
        res.status(404).json({
          success: false,
          message: "Application not found",
        });
        return;
      }

      if (error.message === "FORBIDDEN") {
        res.status(403).json({
          success: false,
          message: "Access denied",
        });
        return;
      }

      if (
        error.message ===
        "APPLICATION_NOT_ELIGIBLE"
      ) {
        res.status(400).json({
          success: false,
          message:
            "Application is not eligible for assessment",
        });
        return;
      }

      if (
        error.message === "ASSESSMENT_NOT_FOUND"
      ) {
        res.status(404).json({
          success: false,
          message: "Assessment not found",
        });
        return;
      }

      if (
        error.message ===
        "ASSESSMENT_NOT_PUBLISHED"
      ) {
        res.status(400).json({
          success: false,
          message:
            "Assessment is not currently published",
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
      message: "Failed to start assessment",
    });
  }
};

export const getAttempt = async (
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

    const attempt =
      await attemptService.getAttemptById(
        String(req.params.id),
        req.user.userId
      );

    res.status(200).json({
      success: true,
      data: attempt,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "ATTEMPT_NOT_FOUND"
      ) {
        res.status(404).json({
          success: false,
          message: "Assessment attempt not found",
        });
        return;
      }

      if (error.message === "FORBIDDEN") {
        res.status(403).json({
          success: false,
          message: "Access denied",
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch assessment attempt",
    });
  }
};

export const submitResponse = async (
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

    const input =
      submitResponseSchema.parse(req.body);

    const response =
      await attemptService.submitResponse({
        userId: req.user.userId,
        attemptId: String(req.params.id),
        challengeId: input.challengeId,
        optionId: input.optionId,
      });

    res.status(201).json({
      success: true,
      message: "Response submitted successfully",
      data: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "ATTEMPT_NOT_FOUND"
      ) {
        res.status(404).json({
          success: false,
          message: "Assessment attempt not found",
        });
        return;
      }

      if (error.message === "FORBIDDEN") {
        res.status(403).json({
          success: false,
          message: "Access denied",
        });
        return;
      }

      if (
        error.message === "ATTEMPT_NOT_ACTIVE"
      ) {
        res.status(400).json({
          success: false,
          message:
            "Assessment attempt is no longer active",
        });
        return;
      }

      if (
        error.message === "CHALLENGE_NOT_FOUND"
      ) {
        res.status(404).json({
          success: false,
          message: "Challenge not found",
        });
        return;
      }

      if (
        error.message === "INVALID_CHALLENGE"
      ) {
        res.status(400).json({
          success: false,
          message:
            "Challenge does not belong to this assessment",
        });
        return;
      }

      if (
        error.message === "OPTION_NOT_FOUND"
      ) {
        res.status(404).json({
          success: false,
          message: "Option not found",
        });
        return;
      }

      if (
        error.message === "INVALID_OPTION"
      ) {
        res.status(400).json({
          success: false,
          message:
            "Option does not belong to this challenge",
        });
        return;
      }

      if (
        error.message === "ALREADY_ANSWERED"
      ) {
        res.status(409).json({
          success: false,
          message:
            "This challenge has already been answered",
        });
        return;
      }

      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          message: "Invalid response data",
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit response",
    });
  }
};
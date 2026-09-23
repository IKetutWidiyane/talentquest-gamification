import { Request, Response } from "express";

import * as assessmentResultService from "../services/assessmentResult.service";

export const getCandidateAssessmentResult = async (
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

    const applicationId = String(
      req.params.applicationId
    );

    const result =
      await assessmentResultService.getCandidateAssessmentResult(
        applicationId
      );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error(
      "Get candidate assessment result error:",
      error
    );

    const errorStatusMap: Record<string, number> = {
      APPLICATION_NOT_FOUND: 404,
      ASSESSMENT_RESULT_NOT_FOUND: 404,
    };

    const status =
      errorStatusMap[error.message] ?? 500;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};
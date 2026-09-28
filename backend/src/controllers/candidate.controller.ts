import { Request, Response } from "express";

import * as candidateService from "../services/candidate.service";

export const getCandidates = async (
  _req: Request,
  res: Response
) => {
  try {
    const candidates =
      await candidateService.getAllCandidates();

    return res.status(200).json({
      success: true,
      data: candidates,
    });
  } catch (error: any) {
    console.error(
      "Get candidates error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get candidates",
    });
  }
};

export const getCandidate = async (
  req: Request,
  res: Response
) => {
  try {
    const candidateId =
      String(req.params.id);

    const candidate =
      await candidateService.getCandidateById(
        candidateId
      );

    return res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (error: any) {
    console.error(
      "Get candidate error:",
      error
    );

    if (
      error.message ===
      "CANDIDATE_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to get candidate",
    });
  }
};
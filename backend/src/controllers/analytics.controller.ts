import { Request, Response } from "express";
import * as analyticsService from "../services/analytics.service";

export const getDashboardAnalytics = async (
  _req: Request,
  res: Response
) => {
  try {
    const analytics =
      await analyticsService.getDashboardAnalytics();

    return res.status(200).json({
      success: true,
      message: "Dashboard analytics retrieved successfully",
      data: analytics,
    });
  } catch (error) {
    console.error("Get dashboard analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard analytics",
    });
  }
};

export const getApplicationAnalytics = async (
  _req: Request,
  res: Response
) => {
  try {
    const analytics =
      await analyticsService.getApplicationAnalytics();

    return res.status(200).json({
      success: true,
      message: "Application analytics retrieved successfully",
      data: analytics,
    });
  } catch (error) {
    console.error("Get application analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve application analytics",
    });
  }
};


export const getRecruitmentAnalytics = async (
  _req: Request,
  res: Response
) => {
  try {
    const analytics =
      await analyticsService.getRecruitmentAnalytics();

    return res.status(200).json({
      success: true,
      message: "Recruitment analytics retrieved successfully",
      data: analytics,
    });
  } catch (error) {
    console.error("Get recruitment analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve recruitment analytics",
    });
  }
};


export const getAssessmentAnalytics = async (
  _req: Request,
  res: Response
) => {
  try {
    const analytics =
      await analyticsService.getAssessmentAnalytics();

    return res.status(200).json({
      success: true,
      message: "Assessment analytics retrieved successfully",
      data: analytics,
    });
  } catch (error) {
    console.error("Get assessment analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve assessment analytics",
    });
  }
};


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
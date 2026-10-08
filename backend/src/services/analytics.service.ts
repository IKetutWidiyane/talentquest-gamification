import * as analyticsRepository from "../repositories/analytics.repository";

export const getDashboardAnalytics = async () => {
  return analyticsRepository.getDashboardAnalytics();
};
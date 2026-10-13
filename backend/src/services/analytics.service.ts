import * as analyticsRepository from "../repositories/analytics.repository";

export const getDashboardAnalytics = async () => {
  return analyticsRepository.getDashboardAnalytics();
};

export const getApplicationAnalytics = async () => {
  return analyticsRepository.getApplicationAnalytics();
};


export const getRecruitmentAnalytics = async () => {
  return analyticsRepository.getRecruitmentAnalytics();
};

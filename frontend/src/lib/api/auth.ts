import { apiClient } from "../api-client";
import type {
  AuthResponseData,
  AuthUser,
  LoginCredentials,
  RegisterData,
} from "@/types/auth";

export async function loginApi(
  credentials: LoginCredentials
): Promise<AuthResponseData> {
  return apiClient<AuthResponseData>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function registerApi(
  data: RegisterData
): Promise<AuthResponseData> {
  return apiClient<AuthResponseData>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getCurrentUserApi(): Promise<AuthUser> {
  return apiClient<AuthUser>("/auth/me", {
    method: "GET",
    requiresAuth: true,
  });
}


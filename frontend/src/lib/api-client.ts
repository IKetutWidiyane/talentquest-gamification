import { getAuthToken, removeAuthToken } from "./auth-storage";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://localhost:5000";

export interface ApiEnvelope<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = false, headers, ...restOptions } = options;

  const url = `${API_URL}/api${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const requestHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(headers as Record<string, string>),
  };

  if (!(restOptions.body instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json";
  }

  const token = getAuthToken();
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  } else if (requiresAuth) {
    throw new ApiError("Sesi login tidak ditemukan. Silakan login kembali.", 401);
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...restOptions,
      headers: requestHeaders,
      cache: "no-store",
    });
  } catch {
    throw new ApiError(
      "Tidak dapat terhubung ke server backend. Pastikan server aktif.",
      0
    );
  }

  let responseBody: unknown;
  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  if (!response.ok) {
    if (response.status === 401 && requiresAuth) {
      removeAuthToken();
    }

    const message =
      responseBody &&
      typeof responseBody === "object" &&
      "message" in responseBody &&
      typeof (responseBody as Record<string, unknown>).message === "string"
        ? String((responseBody as Record<string, unknown>).message)
        : `Permintaan gagal dengan status ${response.status}`;

    throw new ApiError(message, response.status, responseBody);
  }

  if (responseBody && typeof responseBody === "object") {
    const bodyRecord = responseBody as Record<string, unknown>;
    if ("success" in bodyRecord && bodyRecord.success === false) {
      throw new ApiError(
        typeof bodyRecord.message === "string"
          ? bodyRecord.message
          : "Permintaan API gagal.",
        response.status,
        responseBody
      );
    }

    if ("data" in bodyRecord && bodyRecord.data !== undefined) {
      return bodyRecord.data as T;
    }
  }

  return responseBody as T;
}

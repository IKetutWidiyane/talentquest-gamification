
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

export type Job = {
  id: string;
  title: string;
  department?: string | null;
  location?: string | null;
  employmentType?: string | null;
  category?: string | null;
  description?: string | null;
  summary?: string | null;
  workplace?: string | null;
  postedAt?: string | null;
  responsibilities?: string[] | string | null;
  requirements?: string[] | string | null;
  qualifications?: string[] | string | null;
};

type ApiResponse<T> = {
  success?: boolean;
  data?: T;
  message?: string;
};

async function request<T>(path: string): Promise<T> {
  if (!API_URL) {
    throw new Error(
      "Alamat backend belum dikonfigurasi. Periksa NEXT_PUBLIC_API_URL.",
    );
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}/api${path}`, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });
  } catch {
    throw new Error(
      "Tidak dapat terhubung ke server. Periksa koneksi dan status backend.",
    );
  }

  let body: unknown;

  try {
    body = await response.json();
  } catch {
    throw new Error("Server mengirim respons yang tidak valid.");
  }

  if (!response.ok) {
    const message =
      body &&
      typeof body === "object" &&
      "message" in body &&
      typeof body.message === "string"
        ? body.message
        : `Permintaan gagal dengan status HTTP ${response.status}.`;

    throw new Error(message);
  }

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    return body as T;
  }

  const envelope = body as ApiResponse<T>;

  if (envelope.success === false) {
    throw new Error(envelope.message || "Permintaan API gagal.");
  }

  // Mendukung respons { success: true, data: ... }
  // dan respons objek langsung.
  return (envelope.data !== undefined ? envelope.data : body) as T;
}

/**
 * Mengubah variasi format daftar teks menjadi string[].
 * Mendukung array, string biasa, dan string JSON berbentuk array.
 */
export function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter(
      (item): item is string => typeof item === "string",
    );
  }

  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  const trimmed = value.trim();

  try {
    const parsed: unknown = JSON.parse(trimmed);

    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is string => typeof item === "string",
      );
    }

    if (typeof parsed === "string" && parsed.trim()) {
      return [parsed.trim()];
    }
  } catch {
    // Bukan JSON; lanjutkan sebagai teks biasa.
  }

  // Mendukung daftar yang dipisahkan baris baru.
  const lines = trimmed
    .split(/\r?\n/)
    .map((item) => item.replace(/^\s*[-•*]\s*/, "").trim())
    .filter(Boolean);

  return lines.length > 1 ? lines : [trimmed];
}

function normalizeJob(value: unknown): Job {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Format detail lowongan dari backend tidak valid.");
  }

  const raw = value as Record<string, unknown>;

  if (
    typeof raw.id !== "string" ||
    typeof raw.title !== "string"
  ) {
    throw new Error(
      "Data lowongan tidak memiliki ID atau judul yang valid.",
    );
  }

  const nullableString = (field: string): string | null | undefined => {
    const value = raw[field];
    return typeof value === "string" || value === null
      ? value
      : undefined;
  };

  return {
    id: raw.id,
    title: raw.title,
    department: nullableString("department"),
    location: nullableString("location"),
    employmentType: nullableString("employmentType"),
    category: nullableString("category"),
    description: nullableString("description"),
    summary: nullableString("summary"),
    workplace: nullableString("workplace"),
    postedAt: nullableString("postedAt") ?? nullableString("createdAt"),
    responsibilities: toStringArray(raw.responsibilities),
    requirements: toStringArray(raw.requirements),
    qualifications: toStringArray(raw.qualifications),
  };
}

export async function getJobs(): Promise<Job[]> {
  const result = await request<unknown>("/jobs");

  // Respons dapat berupa array langsung.
  if (Array.isArray(result)) {
    return result.map(normalizeJob);
  }

  // Mendukung { jobs: [...] }.
  if (result && typeof result === "object" && !Array.isArray(result)) {
    const data = result as Record<string, unknown>;

    if (Array.isArray(data.jobs)) {
      return data.jobs.map(normalizeJob);
    }

    // Mendukung pembungkus tambahan { data: [...] }.
    if (Array.isArray(data.data)) {
      return data.data.map(normalizeJob);
    }
  }

  throw new Error(
    "Format daftar lowongan dari backend belum sesuai dengan frontend.",
  );
}

export async function getJobById(id: string): Promise<Job> {
  if (!id.trim()) {
    throw new Error("ID lowongan tidak boleh kosong.");
  }

  const result = await request<unknown>(
    `/jobs/${encodeURIComponent(id)}`,
  );

  // Mendukung detail langsung, { job: {...} },
  // atau { data: { job: {...} } }.
  let candidate = result;

  if (
    candidate &&
    typeof candidate === "object" &&
    !Array.isArray(candidate)
  ) {
    const data = candidate as Record<string, unknown>;

    if (data.job && typeof data.job === "object") {
      candidate = data.job;
    }
  }

  return normalizeJob(candidate);
}

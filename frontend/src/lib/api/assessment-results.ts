
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

export type CompetencyScore = {
  competencyId: string;
  name: string;
  score: number;
  weight: number;
};

export type CandidateAssessmentResult = {
  attemptId: string;
  assessment: {
    id: string;
    name: string;
    objective: string | null;
  };
  application: {
    id: string;
    status: string;
    job: {
      id: string;
      title: string;
      slug: string;
    };
  };
  overallScore: number;
  behavioralSummary: string | null;
  competencyScores: CompetencyScore[];
  completedAt: string;
};

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

function getAccessToken(): string {
  if (typeof window === "undefined") {
    throw new Error("Token hanya dapat diakses dari browser.");
  }

  // Gunakan key ini secara konsisten saat login backend diintegrasikan.
  const token = localStorage.getItem("eiger_access_token");

  if (!token) {
    throw new Error(
      "Sesi login tidak ditemukan. Silakan login kembali."
    );
  }

  return token;
}

export async function getCandidateAssessmentResult(
  attemptId: string
): Promise<CandidateAssessmentResult> {
  if (!API_URL) {
    throw new Error(
      "Alamat backend belum dikonfigurasi. Periksa NEXT_PUBLIC_API_URL."
    );
  }

  if (!attemptId.trim()) {
    throw new Error("ID assessment attempt tidak ditemukan.");
  }

  const token = getAccessToken();

  let response: Response;

  try {
    response = await fetch(
      `${API_URL}/api/assessment-attempts/${encodeURIComponent(attemptId)}/result`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
  } catch {
    throw new Error(
      "Tidak dapat terhubung ke backend. Periksa koneksi server."
    );
  }

  let body: ApiEnvelope<CandidateAssessmentResult>;

  try {
    body = await response.json();
  } catch {
    throw new Error("Respons backend tidak valid.");
  }

  if (!response.ok || body.success === false) {
    if (response.status === 401) {
      throw new Error("Sesi login berakhir. Silakan login kembali.");
    }

    if (response.status === 403) {
      throw new Error(
        "Kamu tidak memiliki akses ke hasil assessment ini."
      );
    }

    if (response.status === 404) {
      throw new Error(
        "Hasil assessment belum tersedia atau tidak ditemukan."
      );
    }

    if (response.status === 409) {
      throw new Error(
        "Assessment belum selesai. Selesaikan assessment terlebih dahulu."
      );
    }

    throw new Error(
      body.message || "Gagal mengambil hasil assessment."
    );
  }

  if (!body.data) {
    throw new Error("Data hasil assessment tidak ditemukan.");
  }

  return body.data;
}

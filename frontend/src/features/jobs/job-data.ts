export type EmploymentType =
  | "Full-time"
  | "Internship"
  | "Contract"
  | "Freelance";

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  category: string;
  employmentType: EmploymentType;
  workplace: "On-site" | "Hybrid" | "Remote";
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  postedAt: string;
};

export const jobs: Job[] = [
  {
    id: "junior-application-developer",
    title: "Junior Application Developer",
    department: "Technology",
    location: "Jakarta",
    category: "Technology",
    employmentType: "Full-time",
    workplace: "On-site",
    summary:
      "Berkontribusi dalam pengembangan, pemeliharaan, dan peningkatan aplikasi untuk mendukung kebutuhan bisnis perusahaan.",
    responsibilities: [
      "Mengembangkan dan memelihara aplikasi sesuai kebutuhan bisnis.",
      "Berkolaborasi dengan tim untuk menganalisis dan menyelesaikan masalah teknis.",
      "Melakukan pengujian dan dokumentasi fitur aplikasi.",
      "Memperbaiki bug serta meningkatkan kualitas dan performa aplikasi.",
    ],
    qualifications: [
      "Memiliki pemahaman dasar pemrograman dan pengembangan aplikasi.",
      "Memahami database dan konsep API.",
      "Mampu bekerja sama dalam tim dan berkomunikasi dengan baik.",
      "Memiliki kemauan belajar dan kemampuan memecahkan masalah.",
    ],
    postedAt: "2026-10-15",
  },
  {
    id: "management-trainee",
    title: "Management Trainee",
    department: "Business Development",
    location: "Jakarta",
    category: "Business",
    employmentType: "Full-time",
    workplace: "On-site",
    summary:
      "Program pengembangan talenta untuk mengenal proses bisnis dan mempersiapkan calon pemimpin masa depan.",
    responsibilities: [
      "Mengikuti program rotasi dan pelatihan lintas divisi.",
      "Menganalisis proses operasional dan peluang perbaikan.",
      "Menyusun laporan dan mempresentasikan hasil pekerjaan.",
      "Berkolaborasi dengan tim untuk mendukung target bisnis.",
    ],
    qualifications: [
      "Memiliki kemampuan analitis dan komunikasi yang baik.",
      "Mampu beradaptasi dengan lingkungan dan tanggung jawab baru.",
      "Memiliki inisiatif serta kemampuan bekerja dalam tim.",
      "Bersedia mengikuti program pengembangan yang ditetapkan perusahaan.",
    ],
    postedAt: "2026-10-12",
  },
  {
    id: "graphic-design-intern",
    title: "Graphic Design Intern",
    department: "Creative",
    location: "Bandung",
    category: "Creative",
    employmentType: "Internship",
    workplace: "Hybrid",
    summary:
      "Mendukung kebutuhan desain visual dan komunikasi kreatif untuk berbagai aktivitas brand.",
    responsibilities: [
      "Membantu membuat aset visual untuk kebutuhan digital.",
      "Menyesuaikan desain berdasarkan panduan identitas brand.",
      "Berkolaborasi dengan tim kreatif dan pemasaran.",
      "Mengelola revisi serta menyiapkan berkas desain.",
    ],
    qualifications: [
      "Memiliki ketertarikan pada desain grafis dan komunikasi visual.",
      "Memahami prinsip dasar layout, tipografi, dan warna.",
      "Mampu menggunakan perangkat desain yang relevan.",
      "Bersedia menerima masukan dan melakukan revisi.",
    ],
    postedAt: "2026-10-10",
  },
  {
    id: "retail-store-crew",
    title: "Retail Store Crew",
    department: "Retail Operations",
    location: "Bandar Lampung",
    category: "Retail",
    employmentType: "Full-time",
    workplace: "On-site",
    summary:
      "Mendukung operasional toko, pelayanan pelanggan, dan penataan produk agar pengalaman berbelanja tetap optimal.",
    responsibilities: [
      "Melayani pelanggan dan membantu kebutuhan informasi produk.",
      "Menjaga kerapian area penjualan dan penataan produk.",
      "Mendukung proses stok dan operasional toko.",
      "Bekerja sama dengan tim untuk mencapai target operasional.",
    ],
    qualifications: [
      "Memiliki keterampilan komunikasi dan pelayanan pelanggan.",
      "Mampu bekerja sama dan mengikuti prosedur operasional.",
      "Memiliki sikap profesional, disiplin, dan bertanggung jawab.",
      "Bersedia mengikuti jadwal kerja yang berlaku.",
    ],
    postedAt: "2026-10-08",
  },
];
import {
  PrismaClient,
  UserRole,
  UserStatus,
  JobStatus,
  EmploymentType,
  AssessmentStatus,
  ApplicationStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting EIGER Talent Quest seed...");

  // =====================================================
  // 1. USERS
  // =====================================================

  const passwordHash = await bcrypt.hash("Password123!", 10);

  const candidate = await prisma.user.upsert({
    where: {
      email: "candidate@eiger-talentquest.test",
    },
    update: {},
    create: {
      email: "candidate@eiger-talentquest.test",
      passwordHash,
      role: UserRole.CANDIDATE,
      status: UserStatus.ACTIVE,

      candidateProfile: {
        create: {
          firstName: "I Ketut",
          lastName: "Widiyane",
          phone: "081234567890",
          address: "Bandar Lampung",
          city: "Bandar Lampung",
          province: "Lampung",
          education: "S1 Sistem Informasi",
          experience:
            "Frontend development, full-stack development, IoT, dan machine learning.",
          skills:
            "React, Next.js, TypeScript, Node.js, Express.js, MySQL, PostgreSQL, Git",
        },
      },
    },
    include: {
      candidateProfile: true,
    },
  });

  const talentAcquisition = await prisma.user.upsert({
    where: {
      email: "ta@eiger-talentquest.test",
    },
    update: {},
    create: {
      email: "ta@eiger-talentquest.test",
      passwordHash,
      role: UserRole.TALENT_ACQUISITION,
      status: UserStatus.ACTIVE,
    },
  });

  console.log("✓ Users created");

  // =====================================================
  // 2. COMPETENCIES
  // =====================================================

  const competencyData = [
    {
      name: "Problem Solving",
      description:
        "Kemampuan mengidentifikasi masalah, menganalisis situasi, dan menentukan solusi yang efektif.",
    },
    {
      name: "Decision Making",
      description:
        "Kemampuan mengambil keputusan berdasarkan informasi, risiko, dan prioritas.",
    },
    {
      name: "Adaptability",
      description:
        "Kemampuan menyesuaikan diri terhadap perubahan situasi, prioritas, dan lingkungan kerja.",
    },
    {
      name: "Collaboration",
      description:
        "Kemampuan bekerja sama, berkomunikasi, dan berkontribusi secara efektif dalam tim.",
    },
    {
      name: "Creativity",
      description:
        "Kemampuan menghasilkan ide, pendekatan, atau solusi baru yang relevan.",
    },
    {
      name: "Communication",
      description:
        "Kemampuan menyampaikan informasi secara jelas, efektif, dan sesuai dengan konteks.",
    },
  ];

  const competencies = new Map<string, { id: string; name: string }>();

  for (const data of competencyData) {
    const competency = await prisma.competency.upsert({
      where: {
        name: data.name,
      },
      update: {
        description: data.description,
      },
      create: data,
    });

    competencies.set(competency.name, competency);
  }

  console.log("✓ Competencies created");

  // =====================================================
  // 3. JOBS
  // =====================================================

  const frontendCompetencies = [
    {
      name: "Problem Solving",
      weight: 1.2,
    },
    {
      name: "Collaboration",
      weight: 1,
    },
    {
      name: "Communication",
      weight: 1,
    },
    {
      name: "Adaptability",
      weight: 1,
    },
  ];

  const productCompetencies = [
    {
      name: "Problem Solving",
      weight: 1.2,
    },
    {
      name: "Decision Making",
      weight: 1.1,
    },
    {
      name: "Creativity",
      weight: 1.2,
    },
    {
      name: "Communication",
      weight: 1,
    },
  ];

  const frontendJob = await prisma.job.upsert({
    where: {
      slug: "frontend-developer",
    },
    update: {},
    create: {
      title: "Frontend Developer",
      slug: "frontend-developer",
      department: "Technology",
      location: "Bandung, Indonesia",
      employmentType: EmploymentType.FULL_TIME,
      experience: "1–2 years",
      description:
        "Bergabung dengan tim teknologi untuk membangun pengalaman digital yang fungsional, responsif, dan user-centered.",
      responsibilities:
        "Mengembangkan antarmuka web responsif.\nBerkolaborasi dengan UI/UX Designer dan Backend Developer.\nMelakukan testing dan debugging.\nMenjaga kualitas dan maintainability code.",
      requirements:
        "Memahami HTML, CSS, dan JavaScript.\nPengalaman menggunakan React atau framework modern.\nMemahami Git dan REST API.\nMampu bekerja dalam tim.",
      status: JobStatus.ACTIVE,
      publishedAt: new Date(),
    },
  });

  const productJob = await prisma.job.upsert({
    where: {
      slug: "digital-product-specialist",
    },
    update: {},
    create: {
      title: "Digital Product Specialist",
      slug: "digital-product-specialist",
      department: "Digital Product",
      location: "Jakarta, Indonesia",
      employmentType: EmploymentType.FULL_TIME,
      experience: "1–3 years",
      description:
        "Mendukung pengembangan produk digital melalui analisis kebutuhan pengguna, koordinasi lintas tim, dan pengembangan solusi.",
      responsibilities:
        "Menganalisis kebutuhan pengguna.\nMenyusun dan mengevaluasi solusi produk.\nBerkolaborasi dengan berbagai stakeholder.\nMengevaluasi performa produk.",
      requirements:
        "Memiliki analytical thinking yang baik.\nMampu berkomunikasi dengan stakeholder.\nMemahami product development lifecycle.\nMampu bekerja secara kolaboratif.",
      status: JobStatus.ACTIVE,
      publishedAt: new Date(),
    },
  });

  console.log("✓ Jobs created");

  // =====================================================
  // 4. JOB ↔ COMPETENCY
  // =====================================================

  for (const item of frontendCompetencies) {
    const competency = competencies.get(item.name);

    if (!competency) {
      throw new Error(`Competency not found: ${item.name}`);
    }

    await prisma.jobCompetency.upsert({
      where: {
        jobId_competencyId: {
          jobId: frontendJob.id,
          competencyId: competency.id,
        },
      },
      update: {
        weight: item.weight,
      },
      create: {
        jobId: frontendJob.id,
        competencyId: competency.id,
        weight: item.weight,
      },
    });
  }

  for (const item of productCompetencies) {
    const competency = competencies.get(item.name);

    if (!competency) {
      throw new Error(`Competency not found: ${item.name}`);
    }

    await prisma.jobCompetency.upsert({
      where: {
        jobId_competencyId: {
          jobId: productJob.id,
          competencyId: competency.id,
        },
      },
      update: {
        weight: item.weight,
      },
      create: {
        jobId: productJob.id,
        competencyId: competency.id,
        weight: item.weight,
      },
    });
  }

  console.log("✓ Job competencies created");

  // =====================================================
  // 5. TALENT QUEST ASSESSMENT
  // =====================================================

  const assessment = await prisma.assessment.upsert({
    where: {
      id: "talent-quest-core-assessment",
    },
    update: {
      name: "EIGER Talent Quest",
      objective:
        "Mengidentifikasi behavioral strengths kandidat melalui serangkaian situasi dan keputusan yang merepresentasikan kondisi kerja.",
      status: AssessmentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    create: {
      id: "talent-quest-core-assessment",
      name: "EIGER Talent Quest",
      objective:
        "Mengidentifikasi behavioral strengths kandidat melalui serangkaian situasi dan keputusan yang merepresentasikan kondisi kerja.",
      status: AssessmentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  console.log("✓ Assessment created");

  // =====================================================
  // 6. ASSESSMENT ↔ COMPETENCY
  // =====================================================

  const assessmentCompetencies = [
    {
      name: "Problem Solving",
      weight: 1.2,
    },
    {
      name: "Decision Making",
      weight: 1.1,
    },
    {
      name: "Adaptability",
      weight: 1,
    },
    {
      name: "Collaboration",
      weight: 1,
    },
    {
      name: "Creativity",
      weight: 0.9,
    },
    {
      name: "Communication",
      weight: 1,
    },
  ];

  for (const item of assessmentCompetencies) {
    const competency = competencies.get(item.name);

    if (!competency) {
      throw new Error(`Competency not found: ${item.name}`);
    }

    await prisma.assessmentCompetency.upsert({
      where: {
        assessmentId_competencyId: {
          assessmentId: assessment.id,
          competencyId: competency.id,
        },
      },
      update: {
        weight: item.weight,
      },
      create: {
        assessmentId: assessment.id,
        competencyId: competency.id,
        weight: item.weight,
      },
    });
  }

  console.log("✓ Assessment competencies created");

  // =====================================================
  // 7. CHALLENGES
  // =====================================================

  const challenges = [
    {
      name: "The Unexpected Route",
      competency: "Problem Solving",
      scenario:
        "Saat menjalankan sebuah project, tim menemukan masalah teknis yang tidak diperkirakan sebelumnya. Deadline project tetap sama.",
      question:
        "Apa langkah pertama yang paling mungkin kamu lakukan?",
      order: 1,
      weight: 1,
      options: [
        {
          label:
            "Menganalisis akar masalah dan menentukan beberapa alternatif solusi.",
          value: "ANALYZE",
          score: 100,
          behavioralIndicator:
            "Mengidentifikasi akar masalah sebelum menentukan solusi.",
        },
        {
          label: "Langsung mencoba solusi yang menurutmu paling mudah.",
          value: "QUICK_FIX",
          score: 60,
          behavioralIndicator:
            "Berorientasi pada tindakan namun belum melakukan analisis mendalam.",
        },
        {
          label: "Menunggu anggota tim lain menemukan solusinya.",
          value: "WAIT",
          score: 20,
          behavioralIndicator:
            "Cenderung menunggu sebelum mengambil tindakan.",
        },
        {
          label:
            "Mengabaikan masalah sementara dan melanjutkan pekerjaan lain.",
          value: "IGNORE",
          score: 0,
          behavioralIndicator:
            "Tidak memprioritaskan penyelesaian masalah yang berdampak pada project.",
        },
      ],
    },

    {
      name: "The Critical Choice",
      competency: "Decision Making",
      scenario:
        "Kamu harus memilih antara dua solusi. Solusi pertama lebih cepat tetapi memiliki risiko teknis, sedangkan solusi kedua membutuhkan waktu lebih lama namun lebih stabil.",
      question: "Bagaimana kamu menentukan keputusan?",
      order: 2,
      weight: 1,
      options: [
        {
          label:
            "Membandingkan dampak, risiko, effort, dan kebutuhan project sebelum memilih.",
          value: "EVALUATE",
          score: 100,
          behavioralIndicator:
            "Mengambil keputusan berdasarkan evaluasi risiko dan dampak.",
        },
        {
          label:
            "Memilih solusi yang paling cepat agar pekerjaan segera selesai.",
          value: "FAST",
          score: 60,
          behavioralIndicator:
            "Mengutamakan kecepatan dalam pengambilan keputusan.",
        },
        {
          label:
            "Mengikuti keputusan mayoritas tanpa mengevaluasi pilihan.",
          value: "FOLLOW",
          score: 40,
          behavioralIndicator:
            "Mempertimbangkan pendapat tim tetapi kurang melakukan evaluasi mandiri.",
        },
        {
          label: "Menunda keputusan sampai situasi berubah.",
          value: "DELAY",
          score: 0,
          behavioralIndicator:
            "Cenderung menghindari keputusan dalam situasi yang membutuhkan tindakan.",
        },
      ],
    },

    {
      name: "Changing Conditions",
      competency: "Adaptability",
      scenario:
        "Prioritas project berubah di tengah pengerjaan karena adanya kebutuhan bisnis baru.",
      question: "Apa respons yang paling mungkin kamu lakukan?",
      order: 3,
      weight: 1,
      options: [
        {
          label:
            "Memahami perubahan, menyesuaikan prioritas, lalu menyusun ulang rencana kerja.",
          value: "ADAPT",
          score: 100,
          behavioralIndicator:
            "Mampu menyesuaikan strategi dan prioritas terhadap perubahan.",
        },
        {
          label:
            "Mengubah sebagian pekerjaan sambil tetap mempertahankan rencana awal.",
          value: "PARTIAL",
          score: 70,
          behavioralIndicator:
            "Berusaha menyeimbangkan perubahan dan rencana awal.",
        },
        {
          label:
            "Meminta tim lain mengambil alih pekerjaan yang berubah.",
          value: "DELEGATE",
          score: 40,
          behavioralIndicator:
            "Mengandalkan bantuan eksternal ketika menghadapi perubahan.",
        },
        {
          label: "Tetap menjalankan rencana awal tanpa perubahan.",
          value: "RESIST",
          score: 0,
          behavioralIndicator:
            "Kurang menyesuaikan diri terhadap perubahan kebutuhan.",
        },
      ],
    },

    {
      name: "One Team",
      competency: "Collaboration",
      scenario:
        "Dalam sebuah project, terdapat perbedaan pendapat antara dua anggota tim mengenai pendekatan yang harus digunakan.",
      question: "Apa yang akan kamu lakukan?",
      order: 4,
      weight: 1,
      options: [
        {
          label:
            "Mendengarkan kedua perspektif dan membantu mencari solusi berdasarkan tujuan bersama.",
          value: "COLLABORATE",
          score: 100,
          behavioralIndicator:
            "Mendorong kolaborasi dan mencari kesepakatan berdasarkan tujuan bersama.",
        },
        {
          label:
            "Memilih salah satu pendapat yang menurutmu paling masuk akal.",
          value: "CHOOSE",
          score: 60,
          behavioralIndicator:
            "Berusaha menyelesaikan konflik dengan memilih salah satu alternatif.",
        },
        {
          label:
            "Membiarkan anggota tim menyelesaikan perbedaan sendiri.",
          value: "OBSERVE",
          score: 40,
          behavioralIndicator:
            "Tidak langsung terlibat dalam penyelesaian perbedaan.",
        },
        {
          label:
            "Menghindari diskusi agar konflik tidak semakin besar.",
          value: "AVOID",
          score: 0,
          behavioralIndicator:
            "Cenderung menghindari konflik daripada menyelesaikannya.",
        },
      ],
    },

    {
      name: "Beyond the Obvious",
      competency: "Creativity",
      scenario:
        "Tim diminta membuat pengalaman digital yang lebih menarik bagi kandidat tanpa menambah proses yang kompleks.",
      question:
        "Pendekatan apa yang paling mungkin kamu gunakan?",
      order: 5,
      weight: 1,
      options: [
        {
          label:
            "Mengeksplorasi beberapa ide dan menguji ide yang paling relevan dengan kebutuhan pengguna.",
          value: "EXPLORE",
          score: 100,
          behavioralIndicator:
            "Menghasilkan dan mengevaluasi beberapa pendekatan kreatif.",
        },
        {
          label:
            "Mengadaptasi solusi yang pernah berhasil di project lain.",
          value: "ADAPT_IDEA",
          score: 70,
          behavioralIndicator:
            "Menggunakan referensi yang telah terbukti efektif.",
        },
        {
          label:
            "Mengikuti pola yang sudah digunakan agar proses lebih aman.",
          value: "FOLLOW_PATTERN",
          score: 40,
          behavioralIndicator:
            "Mengutamakan pendekatan yang sudah tersedia.",
        },
        {
          label: "Menunggu arahan sebelum memberikan ide.",
          value: "WAIT_IDEA",
          score: 0,
          behavioralIndicator:
            "Kurang proaktif dalam menghasilkan ide.",
        },
      ],
    },

    {
      name: "Clear Signal",
      competency: "Communication",
      scenario:
        "Kamu menemukan risiko pada project yang perlu diketahui oleh anggota tim dan stakeholder.",
      question: "Bagaimana kamu menyampaikan informasi tersebut?",
      order: 6,
      weight: 1,
      options: [
        {
          label:
            "Menyampaikan masalah, dampak, bukti, dan rekomendasi secara ringkas dan jelas.",
          value: "CLEAR",
          score: 100,
          behavioralIndicator:
            "Menyampaikan informasi secara terstruktur dan berorientasi solusi.",
        },
        {
          label: "Menyampaikan masalah secara singkat tanpa banyak detail.",
          value: "SHORT",
          score: 70,
          behavioralIndicator: "Menyampaikan informasi secara ringkas.",
        },
        {
          label:
            "Menyampaikan masalah hanya kepada anggota tim terdekat.",
          value: "LIMITED",
          score: 40,
          behavioralIndicator:
            "Berkomunikasi tetapi belum memastikan seluruh pihak terkait mendapatkan informasi.",
        },
        {
          label: "Menunggu sampai masalah benar-benar terjadi.",
          value: "WAIT",
          score: 0,
          behavioralIndicator:
            "Tidak melakukan komunikasi risiko secara proaktif.",
        },
      ],
    },
  ];

  for (const challengeData of challenges) {
    const competency = competencies.get(challengeData.competency);

    if (!competency) {
      throw new Error(
        `Competency not found for challenge: ${challengeData.competency}`,
      );
    }

    const challenge = await prisma.challenge.findFirst({
      where: {
        assessmentId: assessment.id,
        order: challengeData.order,
      },
    });

    const savedChallenge = challenge
      ? await prisma.challenge.update({
          where: {
            id: challenge.id,
          },
          data: {
            name: challengeData.name,
            competencyId: competency.id,
            scenario: challengeData.scenario,
            question: challengeData.question,
            weight: challengeData.weight,
          },
        })
      : await prisma.challenge.create({
          data: {
            assessmentId: assessment.id,
            competencyId: competency.id,
            name: challengeData.name,
            scenario: challengeData.scenario,
            question: challengeData.question,
            order: challengeData.order,
            weight: challengeData.weight,
          },
        });

    // Replace options for this challenge so seed remains deterministic.
    await prisma.challengeOption.deleteMany({
      where: {
        challengeId: savedChallenge.id,
      },
    });

    await prisma.challengeOption.createMany({
      data: challengeData.options.map((option) => ({
        challengeId: savedChallenge.id,
        label: option.label,
        value: option.value,
        score: option.score,
        behavioralIndicator: option.behavioralIndicator,
      })),
    });
  }

  console.log("✓ Challenges and options created");

  // =====================================================
  // 8. SAMPLE APPLICATION
  // =====================================================

  const application = await prisma.application.upsert({
    where: {
      userId_jobId: {
        userId: candidate.id,
        jobId: frontendJob.id,
      },
    },
    update: {},
    create: {
      userId: candidate.id,
      jobId: frontendJob.id,
    },
  });

  // =====================================================
  // 9. APPLICATION HISTORY
  // =====================================================

  const existingHistory =
    await prisma.applicationStageHistory.findFirst({
      where: {
        applicationId: application.id,
        toStatus: ApplicationStatus.SUBMITTED,
      },
    });

  if (!existingHistory) {
    await prisma.applicationStageHistory.create({
      data: {
        applicationId: application.id,
        fromStatus: null,
        toStatus: ApplicationStatus.SUBMITTED,
        note: "Application submitted through EIGER Careers.",
      },
    });
  }

  console.log("✓ Sample application created");

  // =====================================================
  // 10. SUMMARY
  // =====================================================

  console.log("\n🎉 Seed completed successfully!\n");

  console.log("Demo accounts:");
  console.log("----------------------------------------");
  console.log("Candidate");
  console.log("Email    : candidate@eiger-talentquest.test");
  console.log("Password : Password123!");
  console.log("----------------------------------------");
  console.log("Talent Acquisition");
  console.log("Email    : ta@eiger-talentquest.test");
  console.log("Password : Password123!");
  console.log("----------------------------------------\n");

  console.log(`Candidate ID : ${candidate.id}`);
  console.log(`TA ID        : ${talentAcquisition.id}`);
  console.log(`Assessment   : ${assessment.name}`);
  console.log(`Jobs         : ${frontendJob.title}, ${productJob.title}`);
  console.log(`Challenges   : ${challenges.length}`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
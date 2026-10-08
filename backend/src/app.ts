import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import jobRoutes from "./routes/job.routes";
import applicationRoutes from "./routes/application.routes";
import assessmentRoutes from "./routes/assessment.routes";
import asssessmentAttemptRoutes from "./routes/assessmentAttempt.routes";
import assessmentResultRoutes from "./routes/assessmentResult.routes";
import candidateRoutes from "./routes/candidate.routes";
import candidateProfileRoutes from "./routes/candidateProfile.routes";
import competencyRoutes from "./routes/competency.routes";
import challengeRoutes from "./routes/challenge.routes";
import userRoutes from "./routes/user.routes";
import talentPoolRoutes from "./routes/talentPool.routes";
import analyticsRoutes from "./routes/analytics.routes";


dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "TalentQuest API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/competencies", competencyRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/talent-pool", talentPoolRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/assessment-attempts", asssessmentAttemptRoutes);
app.use("/api/assessment-results", assessmentResultRoutes);
app.use("/api/candidates/profile",candidateProfileRoutes);
app.use("/api/candidates", candidateRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`TalentQuest API running on port ${PORT}`);
});
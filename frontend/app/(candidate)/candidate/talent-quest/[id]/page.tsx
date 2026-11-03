import { redirect } from "next/navigation";

interface TalentQuestDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TalentQuestDetailPage({
  params,
}: TalentQuestDetailPageProps) {
  const { id } = await params;
  redirect(`/candidate/talent-quest/${id}/instructions`);
}


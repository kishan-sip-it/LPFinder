import PersonEdit from "@/components/PersonEdit";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PersonEdit personId={id} />;
}

import Card from "../ui/Card";

export default function CaseCard({ c }: { c: any }) {
  return (
    <Card title={c.title}>
      <div className="text-sm text-gray-600">{c.description || "No description"}</div>
      <div className="mt-2 text-xs text-gray-500">Created: {new Date(c.createdAt).toLocaleString()}</div>
    </Card>
  );
}

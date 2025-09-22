import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function CaseDetail() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data, mutate } = useSWR(id ? `/api/citizen/cases/${id}` : null, fetcher);
  async function analyze() {
    await fetch(`/api/citizen/cases/${id}/analyze`, { method: 'POST' });
    setTimeout(() => mutate(), 2000);
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{data?.case?.title}</h1>
      <div className="space-y-2">
        <h2 className="font-semibold">Documents</h2>
        <ul className="list-disc pl-5">
          {data?.documents?.map((d: any) => (
            <li key={d.id}>{d.filename} — v{d.version}</li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <h2 className="font-semibold">Analyses</h2>
        <ul className="list-disc pl-5">
          {data?.analyses?.map((a: any) => (
            <li key={a.id}>{a.result}</li>
          ))}
        </ul>
        <button className="primary" onClick={analyze}>Run Analysis</button>
      </div>
    </div>
  );
}

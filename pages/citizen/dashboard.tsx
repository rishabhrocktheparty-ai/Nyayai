import useSWR from 'swr';
import CaseCard from '../../components/citizen/CaseCard';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Dashboard() {
  // Demo: assume userId stored in localStorage or mocked
  const userId = typeof window !== 'undefined' ? (localStorage.getItem('userId') || '') : '';
  const { data } = useSWR(userId ? `/api/citizen/cases?userId=${userId}` : null, fetcher);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Cases</h1>
        <Link className="primary" href="/citizen/cases/new">New Case</Link>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {data?.cases?.map((c: any) => (
          <Link key={c.id} href={`/citizen/cases/${c.id}`}><CaseCard c={c} /></Link>
        ))}
      </div>
    </div>
  );
}

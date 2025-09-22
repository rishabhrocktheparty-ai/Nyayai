import useSWR from 'swr';

const fetcher = (u: string) => fetch(u).then(r => r.json());

export default function Notebook() {
  const userId = typeof window !== 'undefined' ? (localStorage.getItem('userId') || '') : '';
  const { data } = useSWR(userId ? `/api/citizen/notebook?userId=${userId}` : null, fetcher);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Notebook</h1>
      <ul className="list-disc pl-5">
        {data?.entries?.map((e: any) => (
          <li key={e.id}>{e.content}</li>
        ))}
      </ul>
    </div>
  );
}

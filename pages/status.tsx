import { useEffect, useState } from 'react';

type Status = {
  app: 'ok';
  env: Record<string, boolean>;
  db: { ok: boolean; error?: string };
  redis: { ok: true } | { ok: false; skipped?: true; error?: string };
  uptime: number;
};

export default function StatusPage() {
  const [data, setData] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch('/api/status')
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">System status</h1>
      {error && <p className="text-red-600">Error: {error}</p>}
      {!data && !error && <p>Loading…</p>}
      {data && (
        <div className="space-y-3">
          <div>
            <strong>App:</strong> {data.app}
          </div>
          <div>
            <strong>Uptime:</strong> {Math.round(data.uptime)}s
          </div>
          <div>
            <strong>DB:</strong> {data.db.ok ? 'ok' : `error (${data.db.error})`}
          </div>
          <div>
            <strong>Redis:</strong>{' '}
            {'skipped' in data.redis && (data.redis as any).skipped
              ? 'skipped'
              : data.redis.ok
              ? 'ok'
              : `error (${(data.redis as any).error})`}
          </div>
          <div>
            <strong>Env:</strong>
            <ul className="list-disc ml-6">
              {Object.entries(data.env).map(([k, v]) => (
                <li key={k} className={v ? 'text-green-700' : 'text-red-700'}>
                  {k}: {String(v)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

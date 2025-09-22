import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-10">
        <h1 className="text-3xl font-bold mb-2">NYAY Setu</h1>
        <p className="text-gray-600">Legal assistance & case management for citizens, lawyers, judges, and court staff.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link className="primary" href="/citizen/dashboard">File a Case</Link>
          <Link className="primary" href="/citizen/dashboard">Track a Case</Link>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link className="bg-white rounded shadow p-4" href="/citizen/dashboard">
          <h3 className="font-semibold mb-1">Citizen</h3>
          <p className="text-sm text-gray-600">Create and track your cases, upload documents, ask questions.</p>
        </Link>
        <Link className="bg-white rounded shadow p-4" href="/court-employee/dashboard">
          <h3 className="font-semibold mb-1">Court Employee</h3>
          <p className="text-sm text-gray-600">Manage cause lists, attendance, and reminders.</p>
        </Link>
        <Link className="bg-white rounded shadow p-4" href="/lawyer/dashboard">
          <h3 className="font-semibold mb-1">Lawyer</h3>
          <p className="text-sm text-gray-600">View assignments, draft filings, and manage subscriptions.</p>
        </Link>
        <Link className="bg-white rounded shadow p-4" href="/judge/dashboard">
          <h3 className="font-semibold mb-1">Judge</h3>
          <p className="text-sm text-gray-600">Prioritized docket, draft orders with AI advisory.</p>
        </Link>
      </section>
    </div>
  );
}

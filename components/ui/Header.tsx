import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/"><span className="text-xl font-semibold">NYAY Setu</span></Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/citizen/dashboard">Citizen</Link>
          <Link href="/court-employee/dashboard">Employee</Link>
          <Link href="/lawyer/dashboard">Lawyer</Link>
          <Link href="/judge/dashboard">Judge</Link>
        </nav>
      </div>
    </header>
  );
}

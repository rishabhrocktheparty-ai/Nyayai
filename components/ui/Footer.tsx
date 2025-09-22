export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="container py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} NYAY Setu — All outputs advisory; requires legal review.
      </div>
    </footer>
  );
}

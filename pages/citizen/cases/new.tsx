import { useState } from 'react';

export default function NewCase() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const userId = typeof window !== 'undefined' ? (localStorage.getItem('userId') || '') : '';

  async function createCase() {
    const res = await fetch('/api/citizen/cases', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, title, description }) });
    const data = await res.json();
    const caseId = data.case.id;
    if (file) {
      const pres = await fetch(`/api/citizen/cases/${caseId}/upload`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: file.name, contentType: file.type }) });
      const { url, publicUrl } = await pres.json();
      await fetch(url, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
      const fileBase64 = await file.arrayBuffer().then((b) => {
        let binary = '';
        const bytes = new Uint8Array(b);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
        return btoa(binary);
      });
      await fetch(`/api/documents/${caseId}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: file.name, url: publicUrl, userId, file: fileBase64 }) });
    }
    window.location.href = `/citizen/cases/${caseId}`;
  }

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">New Case</h1>
      <input className="w-full border p-2 rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="w-full border p-2 rounded" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button className="primary" onClick={createCase}>Create</button>
    </div>
  );
}

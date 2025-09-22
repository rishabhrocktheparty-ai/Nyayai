import { useState } from "react";

export default function DraftEditor({ initial = "", onSave }: { initial?: string; onSave: (content: string) => void }) {
  const [value, setValue] = useState(initial);
  return (
    <div className="space-y-2">
      <textarea className="w-full h-64 border rounded p-2" value={value} onChange={(e) => setValue(e.target.value)} />
      <button className="primary" onClick={() => onSave(value)}>Save Draft</button>
    </div>
  );
}

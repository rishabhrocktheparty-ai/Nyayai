import { PropsWithChildren } from "react";

export default function Card({ children, title, actions }: PropsWithChildren<{ title?: string; actions?: React.ReactNode }>) {
  return (
    <div className="bg-white rounded shadow p-4">
      {title && (
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{title}</h3>
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}

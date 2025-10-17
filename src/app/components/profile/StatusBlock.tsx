"use client";

import { ReactNode } from "react";

interface Props {
  label: string;
  ok?: boolean;
  value?: string | number;
  icon: ReactNode;
}

export default function StatusBlock({ label, ok, value, icon }: Props) {
  return (
    <div className="flex items-center justify-between  border p-2 bg-white/80">
      <div className="flex items-center gap-3">
        <div className="text-gray-600">{icon}</div>
        <div className="font-medium text-gray-900">{label}</div>
      </div>
      <div className="text-sm">
        {typeof ok === "boolean" ? (
          <span className={ok ? "text-green-600" : "text-orange-600"}>
            {ok ? "Completed" : "Pending"}
          </span>
        ) : (
          <span className="text-gray-700">{value}</span>
        )}
      </div>
    </div>
  );
}

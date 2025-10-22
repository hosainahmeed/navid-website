"use client";

import { ReactNode } from "react";

interface Props {
  label: string;
  value?: string | number;
  icon: ReactNode;
}

export default function DetailItem({ label, value, icon }: Props) {
  return (
    <div className="flex items-start p-2  gap-3 py-3">
      <div className="text-gray-500">{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-gray-900 break-all font-normal">{value ?? "—"}</div>
      </div>
    </div>
  );
}

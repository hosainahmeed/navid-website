"use client";

import { ReactNode } from "react";

interface Props {
  label: string;
  value?: string | number;
  icon: ReactNode;
}

export default function DetailItem({ label, value, icon }: Props) {
  return (
    <div className="flex items-center p-2  gap-3 py-3">
      <div className="text-black">{icon}</div>
      <div>
        <div className="text-lg text-black leading-5 font-bold">{label}</div>
        <div className="text-gray-500 break-all font-normal">{value ?? "— — — —"}</div>
      </div>
    </div>
  );
}

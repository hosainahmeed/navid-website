"use client";

import { Mail, Smartphone, FileText, ScanFace } from "lucide-react";
import DetailItem from "./DetailItem";
import StatusBlock from "./StatusBlock";

interface Props {
  data: any;
}

function formatDate(value: string) {
  const d = new Date(value);
  return d.toLocaleString();
}

export default function ProfileDetails({ data }: Props) {
  return (
    <div >
      <h2 className="text-xl font-bold border-b p-2">Account Details</h2>

      <div className="divide-y">
        <DetailItem label="Email Address" value={data.email} icon={<Mail className="size-5" />} />
        <DetailItem label="Phone Number" value={data.phone} icon={<Smartphone className="size-5" />} />
      </div>

      <h2 className="text-xl font-bold border-b p-2">Verification & History</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        <StatusBlock label="Identity Check (KYC)" ok={!!data.is_identity_verified} icon={<ScanFace className="size-5" />} />
        <StatusBlock
          label="Documents Submitted"
          value={`${data.documents?.length ?? 0} Files`}
          icon={<FileText className="size-5" />}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="rounded-none border p-2 bg-white/80">
          <div className="text-sm text-gray-500">Member Since</div>
          <div className="font-medium text-gray-900">{formatDate(data.createdAt)}</div>
        </div>
        <div className="rounded-none border p-2 bg-white/80">
          <div className="text-sm text-gray-500">Last Updated</div>
          <div className="font-medium text-gray-900">{formatDate(data.updatedAt)}</div>
        </div>
      </div>
    </div>
  );
}

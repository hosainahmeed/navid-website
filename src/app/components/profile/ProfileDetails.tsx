"use client";

import { Mail, Smartphone, FileText, ScanFace } from "lucide-react";
import DetailItem from "./DetailItem";
import StatusBlock from "./StatusBlock";
import cn from "@/app/utils/cn";
import { imageUrl } from "@/app/utils/imagePreview";
import { Image } from "antd";
import { memo } from "react";

interface Props {
  data: any;
}

function formatDate(value: string) {
  const d = new Date(value);
  return d.toLocaleString();
}

 function ProfileDetails({ data }: Props) {
  return (
    <div>
      <h2
       className="text-xl font-bold p-2 bg-[#EDEDED] border-b border-[var(--border-color)]">Account Details</h2>
      <div className="divide-y">
        <DetailItem label="Email Address" value={data?.email} icon={<Mail className="size-5" />} />
        <DetailItem label="Phone Number" value={data?.phone} icon={<Smartphone className="size-5" />} />
      </div>

      <h2 className="text-xl font-bold border-y bg-[#EDEDED] p-2 border-[var(--border-color)]">Verification & History</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        <StatusBlock label="Identity Check (KYC)" ok={!!data?.is_identity_verified} icon={<ScanFace className="size-5" />} />
        <StatusBlock
          label="Documents Submitted"
          value={`${data?.documents?.length ?? 0} Files`}
          icon={<FileText className={cn("size-5", data?.documents?.length > 0 ? "text-green-500" : "text-red-500")} />}
        />
      </div>
      <h2 className="text-xl font-bold border-y bg-[#EDEDED] p-2 border-[var(--border-color)]">Documents</h2>
      <div className="flex items-center justify-center gap-2">
        {
          data?.documents?.length > 0 ? data?.documents?.map((url: string, index: number) => (
            <Image
              key={index}
              src={imageUrl({ image: url })}
              alt={`Document ${index + 1}`}
              className="p-1 inset-0 max-h-[200px] object-contain aspect-video border border-[var(--border-color)]"
              style={{ width: "auto"}}
            />
          )) : <p className="text-center flex h-24 items-center justify-center">No documents submitted</p>
        }
      </div>

      <div className="grid grid-cols-1 border-t border-[var(--border-color)] sm:grid-cols-2">
        <div className="rounded-none border p-2 bg-white/80">
          <div className="text-sm text-gray-500">Member Since</div>
          <div className="font-normal  text-gray-900">{formatDate(data?.createdAt)}</div>
        </div>
        <div className="rounded-none border p-2 bg-white/80">
          <div className="text-sm text-gray-500">Last Updated</div>
          <div className="font-normal text-gray-900">{formatDate(data?.updatedAt)}</div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProfileDetails)

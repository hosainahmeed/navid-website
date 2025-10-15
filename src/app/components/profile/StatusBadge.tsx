"use client";

import { Tooltip } from "antd";
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from "@ant-design/icons";

interface Props {
    verified: boolean;
}

export default function StatusBadge({ verified }: Props) {
    return (
        <Tooltip title={verified ? "Verified" : "Not Verified"}>
            <span
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${verified
                        ? "bg-green-100 text-green-700 border-green-300"
                        : "bg-orange-100 text-orange-700 border-orange-300"
                    }`}
            >
                {verified ? (
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                    <ExclamationCircleTwoTone twoToneColor="#fa8c16" />
                )}
                {verified ? "Verified" : "Not Verified"}
            </span>
        </Tooltip>
    );
}

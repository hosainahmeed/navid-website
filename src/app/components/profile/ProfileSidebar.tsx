"use client";

import Image from "next/image";
import { User2, ShoppingCart, Settings } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface SidebarProps {
    data: {
        name: string;
        role: string;
        img?: string;
        is_verified?: boolean;
    };
    activeItem: string;
    setActiveItem: (label: string) => void;
}

export default function ProfileSidebar({ data, activeItem, setActiveItem }: SidebarProps) {
    const sideBarItem = [
        { label: "Profile", icon: <User2 className="size-4" /> },
        { label: "Orders", icon: <ShoppingCart className="size-4" /> },
        { label: "Settings", icon: <Settings className="size-4" /> },
    ];

    const initials = (name: string) =>
        name
            ?.split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((s) => s[0].toUpperCase())
            .join("");

    return (
        <div className="sticky top-20 bg-white">
            <div className="flex items-center gap-4">
                {data.img ? (
                    <Image
                        src={data.img}
                        alt={`${data.name}'s profile`}
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full border shadow-md object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 text-2xl font-bold">
                        {initials(data.name) || "JD"}
                    </div>
                )}
                <div>
                    <h1 className="text-xl font-semibold">{data.name}</h1>
                    <p className="text-sm text-gray-500">{data.role}</p>
                    <StatusBadge verified={!!data.is_verified} />
                </div>
            </div>

            <div className="divide-y py-4 divide-gray-200">
                {sideBarItem.map((item) => (
                    <div
                        key={item.label}
                        onClick={() => setActiveItem(item.label)}
                        className={`flex items-center gap-3 py-3 px-2 cursor-pointer transition ${activeItem === item.label ? "bg-[#EDEDED] font-semibold" : "hover:bg-gray-50"
                            }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

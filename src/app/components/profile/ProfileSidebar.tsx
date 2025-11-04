"use client";

import Image from "next/image";
import { User2, ShoppingCart, Settings, LogOut } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { imageUrl } from "@/app/utils/imagePreview";
import { Button } from "antd";
import { memo, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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

function ProfileSidebar({
    data,
    activeItem,
    setActiveItem,
}: SidebarProps) {
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
    const router = useRouter();

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
        <div className="overflow-hidden bg-white">

            <div className="flex items-center gap-4 p-4">
                {data?.img ? (
                    <Image
                        src={imageUrl({ image: data?.img })}
                        alt={`${data?.name}'s profile`}
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full border  object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 text-2xl font-bold">
                        {initials(data?.name) || "JD"}
                    </div>
                )}
                <div>
                    <h1 className="text-xl font-semibold">{data?.name}</h1>
                    <p className="text-sm text-gray-500">{data?.role}</p>
                    <StatusBadge verified={!!data?.is_verified} />
                </div>
            </div>


            <Button
                onClick={() => setShowLogoutModal(true)}
                size="large"
                icon={<LogOut size={16} />}
                style={{
                    width: "fit-content",
                    borderRadius: "0px",
                    backgroundColor: "var(--purple-light)",
                    color: "white",
                    padding: "0.5rem 1.2rem",
                    alignSelf: "end",
                }}
                className="!bg-[var(--purple-light)] !text-white"
            >
                Sign Out
            </Button>


            <AnimatePresence>
                {showLogoutModal && (
                    <>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowLogoutModal(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
                        />


                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.25 }}
                            className={cn(
                                "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]",
                                "bg-white  border border-[var(--border-color)] w-[90%] max-w-md p-6"
                            )}
                        >
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                Confirm Sign Out
                            </h2>
                            <p className="text-sm text-gray-600 mb-6">
                                Are you sure you want to sign out from your account? You’ll need
                                to log in again to access your profile.
                            </p>

                            <div className="flex justify-end gap-3">
                                <Button
                                    onClick={() => setShowLogoutModal(false)}
                                    style={{
                                        borderRadius: "0px",
                                        padding: "0.5rem 1rem",
                                        border: "1px solid var(--border-color)",
                                    }}
                                    className="!bg-[var(--purple-light)] !text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => {
                                        Cookies.remove("accessToken")
                                        router.push("/")
                                        if (window !== undefined) {
                                            window.location.reload()
                                        }
                                        setShowLogoutModal(false);
                                    }}
                                    style={{
                                        borderRadius: "0px",
                                        backgroundColor: "var(--purple-light)",
                                        color: "white",
                                        padding: "0.5rem 1rem",
                                    }}
                                    className='!bg-[var(--purple-light)] !text-white !rounded-none'
                                >
                                    Sign Out
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>


            <div className="divide-y mt-4 border border-[var(--border-color)] flex w-full divide-gray-200">
                {sideBarItem.map((item) => (
                    <div
                        key={item.label}
                        onClick={() => setActiveItem(item.label)}
                        className={`flex items-center gap-3 py-3 px-4 cursor-pointer transition ${activeItem === item.label
                            ? "!bg-[var(--purple-light)] !text-white !font-semibold"
                            : "hover:!bg-gray-50"
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
export default memo(ProfileSidebar)
'use client';
import { useState } from "react";
import { Card } from "antd";
import { cn } from "@/lib/utils";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import ProfileDetails from "../../components/profile/ProfileDetails";
import OrdersSection from "../../components/profile/OrdersSection";
import SettingsSection from "../../components/profile/SettingsSection";
import { IMAGE } from "../../constants/Image.index";

const mockProfile = {
    success: true,
    message: "profile fetched successfully",
    data: {
        _id: "679b457c5e7e5f16f04a59e9",
        name: "Navid Dione",
        email: "siyamoffice0273@gmail.com",
        phone: "1234567890",
        img: IMAGE.brand,
        role: "ADMIN",
        block: false,
        is_verified: true,
        provider: "CREDENTIAL",
        credits: 0,
        is_identity_verified: false,
        createdAt: "2025-01-30T09:25:16.919Z",
        updatedAt: "2025-02-02T11:40:40.695Z",
    },  
};


export default function ProfilePage() {
    const data = mockProfile.data;
    const [activeItem, setActiveItem] = useState("Profile");

    return (
        <main
            className="border-y  border-[var(--border-color)]"
        >
            <section className="mx-auto w-full  max-w-screen-2xl min-h-[calc(100vh-25rem)]">
                <div
                    className={cn(
                        `bg-white mx-auto border-x p-0 border-[var(--border-color)] rounded-none`,
                        )}
                >
                    <div className="w-full">
                        <div className="">
                            <ProfileSidebar
                                data={data}
                                activeItem={activeItem}
                                setActiveItem={setActiveItem}
                            />
                        </div>

                        <div className="w-full">
                            {activeItem === "Profile" && <ProfileDetails data={data} />}
                            {activeItem === "Orders" && <OrdersSection />}
                            {activeItem === "Settings" && <SettingsSection />}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

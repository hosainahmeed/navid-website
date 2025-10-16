'use client';
import { useState } from "react";
import { Card } from "antd";
import { cn } from "@/lib/utils";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileDetails from "../components/profile/ProfileDetails";
import OrdersSection from "../components/profile/OrdersSection";
import SettingsSection from "../components/profile/SettingsSection";
import { IMAGE } from "../constants/Image.index";

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

const design = {
    designName: "Modern User Profile",
    baseColors: {
        primaryBackground: "#FBE8EF",
        darkText: "#111111",
    },
    layout: {
        cardStyle: "rounded-2xl border border-[var(--border-color)] transition duration-300",
    },
};

export default function ProfilePage() {
    const data = mockProfile.data;
    const [activeItem, setActiveItem] = useState("Profile");

    return (
        <main
            className="px-4 md:px-8 py-8"
            style={{ backgroundColor: design.baseColors.primaryBackground }}
        >
            <section className="mx-auto w-full max-w-screen-2xl min-h-[calc(100vh-25rem)]">
                <Card
                    className={cn(
                        `bg-white mx-auto shadow-sm border-none`,
                        design.layout.cardStyle
                    )}
                    style={{
                        backgroundImage: `radial-gradient(125% 125% at 50% 20%, #ffffff 40%, #ec4899 100%)`,
                    }}
                >
                    <div className="p-6 flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3 sticky top-24 self-start">
                            <ProfileSidebar
                                data={data}
                                activeItem={activeItem}
                                setActiveItem={setActiveItem}
                            />
                        </div>

                        <div className="lg:w-2/3 w-full">
                            {activeItem === "Profile" && <ProfileDetails data={data} />}
                            {activeItem === "Orders" && <OrdersSection />}
                            {activeItem === "Settings" && <SettingsSection />}
                        </div>
                    </div>
                </Card>
            </section>
        </main>
    );
}

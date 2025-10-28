'use client';
import { useState } from "react";
import { cn } from "@/lib/utils";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import ProfileDetails from "../../components/profile/ProfileDetails";
import OrdersSection from "../../components/profile/OrdersSection";
import SettingsSection from "../../components/profile/SettingsSection";
import { useProfileQuery } from "@/app/redux/services/profileApis";
import { useSearchParams } from "next/navigation";


export default function ProfilePage() {
    const params = useSearchParams()
    const { data } = useProfileQuery(undefined)
    const [activeItem, setActiveItem] = useState(params.get('tab') || "Profile");


    return (
        <main
        >
            <section className="mx-auto w-full  max-w-screen-2xl min-h-[calc(100vh-25rem)]">
                <div
                    className={cn(
                        `bg-white mx-auto border-x py-12 border-[var(--border-color)] rounded-none`,
                    )}
                >
                    <div>
                        <ProfileSidebar
                            data={data?.data}
                            activeItem={activeItem}
                            setActiveItem={setActiveItem}
                        />
                    </div>

                    <div className="w-full">
                        {activeItem === "Profile" && <ProfileDetails data={data?.data} />}
                        {activeItem === "Orders" && <OrdersSection />}
                        {activeItem === "Settings" && <SettingsSection data={data?.data} />}
                    </div>
                </div>
            </section>
        </main>
    );
}

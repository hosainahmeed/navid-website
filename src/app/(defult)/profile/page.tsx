'use client';
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useProfileQuery } from "@/app/redux/services/profileApis";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
const ProfileSidebar = dynamic(() => import("../../components/profile/ProfileSidebar"));
const ProfileDetails = dynamic(() => import("../../components/profile/ProfileDetails"));
const OrdersSection = dynamic(() => import("../../components/profile/OrdersSection"));
const SettingsSection = dynamic(() => import("../../components/profile/SettingsSection"));


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
                        `bg-white mx-auto border-x-[0.2px] py-12 border-[var(--border-color)] rounded-none`,
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

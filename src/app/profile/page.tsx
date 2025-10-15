import { cn } from "@/lib/utils";
import { Mail, Smartphone, ScanFace, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { IMAGE } from "../constants/Image.index";

// Mock profile data (replace with real fetch later)
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
        accessToken: "",
        credits: 0,
        is_identity_verified: false,
        documents: [
            "uploads/documents/1738496440692-bg.png",
            "uploads/documents/1738496440692-bg.png",
        ],
        createdAt: "2025-01-30T09:25:16.919Z",
        updatedAt: "2025-02-02T11:40:40.695Z",
        __v: 0,
        business_profile: [],
    },
};

// Design JSON (referenced for styles mapping)
const design = {
    designName: "Modern User Profile",
    baseColors: {
        primaryBackground: "#FBE8EF",
        cardBackground: "#FFFFFF",
        darkText: "#111111",
    },
    layout: {
        type: "CenteredCard",
        responsiveLayout: "FlexRowLg",
        cardStyle: "rounded-2xl border border-gray-200 transition duration-300",
        maxContentWidth: "container",
    },
};

function formatNumber(n: number) {
    return new Intl.NumberFormat().format(n);
}

function formatDate(value: string, kind: "DateOnly" | "DateTime") {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    if (kind === "DateOnly") {
        return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "2-digit" }).format(d);
    }
    return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(d);
}

function initials(name?: string) {
    if (!name) return "";
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((s) => s[0]!.toUpperCase())
        .join("");
}

function StatusBadge({ verified }: { verified: boolean }) {
    return (
        <span
            className={
                `inline-flex items-center gap-1 px-2.5 py-1 text-sm rounded-full border ` +
                (verified ? "bg-green-100 text-green-700 border-green-200" : "bg-orange-100 text-orange-700 border-orange-200")
            }
            aria-label={`Account Status: ${verified ? "Verified" : "Not Verified"}`}
        >
            {verified ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
            {verified ? "Verified" : "Not Verified"}
        </span>
    );
}

function DetailItem({ label, value, icon }: { label: string; value?: string | number; icon: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3 py-3">
            <div className="shrink-0 text-gray-500">{icon}</div>
            <div>
                <div className="text-sm text-gray-500">{label}</div>
                <div className="font-medium text-gray-900 break-all">{value ?? "—"}</div>
            </div>
        </div>
    );
}

function StatusBlock({ label, ok, value, icon }: { label: string; ok?: boolean; value?: string | number; icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between rounded-xl border p-4 bg-white/80">
            <div className="flex items-center gap-3">
                <div className="text-gray-600">{icon}</div>
                <div className="font-medium text-gray-900">{label}</div>
            </div>
            <div className="text-sm">
                {typeof ok === "boolean" ? (
                    <span className={ok ? "text-green-600" : "text-orange-600"}>{ok ? "Completed" : "Pending"}</span>
                ) : (
                    <span className="text-gray-700">{value}</span>
                )}
            </div>
        </div>
    );
}

export default async function ProfilePage() {
    const data = mockProfile.data;

    return (
        <main
            className="px-3 md:px-6 lg:px-8 py-8"
            style={{ backgroundColor: design.baseColors.primaryBackground }}
        >
            <section className="mx-auto w-full max-w-7xl">
                <div
                    className={cn(`bg-white ${design.layout.cardStyle} ${design.layout.maxContentWidth} mx-auto`, "dark:bg-black")}
                    style={{
                        backgroundImage: `
        radial-gradient(125% 125% at 50% 20%, #ffffff 40%, #ec4899 100%)
      `,
                        backgroundSize: "100% 100%", color: design.baseColors.darkText
                    }}
                >
                    <div className="p-6 sm:p-8 lg:p-10">
                        <div className="flex flex-col lg:flex-row gap-8">

                            <div className="lg:w-1/3 w-full">
                                <div className="flex flex-col items-center text-center gap-4">
                                    {data.img ? (
                                        <Image
                                            src={data.img}
                                            alt={`${data.name}'s profile`}
                                            width={128}
                                            height={128}
                                            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-gray-200 flex items-center justify-center text-3xl font-bold">
                                            {initials(data.name) || "JD"}
                                        </div>
                                    )}

                                    <h1 className="text-2xl font-extrabold" style={{ color: design.baseColors.darkText }}>
                                        {data.name}
                                    </h1>
                                    <p className="text-lg font-medium text-gray-500">{data.role}</p>

                                    <StatusBadge verified={!!data.is_verified} />

                                    <div className="w-full grid grid-cols-1">
                                        <div className="bg-white rounded-xl text-indigo-600 border border-gray-100 p-4 text-center">
                                            <div className="text-sm text-gray-500">Available Credits</div>
                                            <div className="text-2xl font-bold">{formatNumber(data.credits)}</div>
                                        </div>
                                    </div>

                                    <button
                                        className="mt-2 inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 rounded-xl px-4 py-2 hover:bg-gray-900 hover:text-white transition"
                                        type="button"
                                        aria-label="Edit Profile"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>


                            <div className="lg:w-2/3 w-full">
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold border-b pb-2">Account Details</h2>

                                    <div className="divide-y">
                                        <DetailItem label="Email Address" value={data.email} icon={<Mail className="size-5" />} />
                                        <DetailItem label="Phone Number" value={data.phone} icon={<Smartphone className="size-5" />} />
                                    </div>

                                    <h2 className="text-xl font-bold border-b pb-2 mt-8">Verification & History</h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <StatusBlock label="Identity Check (KYC)" ok={!!data.is_identity_verified} icon={<ScanFace className="size-5" />} />
                                        <StatusBlock
                                            label="Documents Submitted"
                                            value={`${data.documents?.length ?? 0} Files`}
                                            icon={<FileText className="size-5" />}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="rounded-xl border p-4 bg-white/80">
                                            <div className="text-sm text-gray-500">Member Since</div>
                                            <div className="font-medium text-gray-900">{formatDate(data.createdAt, "DateOnly")}</div>
                                        </div>
                                        <div className="rounded-xl border p-4 bg-white/80">
                                            <div className="text-sm text-gray-500">Last Updated</div>
                                            <div className="font-medium text-gray-900">{formatDate(data.updatedAt, "DateTime")}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    );
}

'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import PrimaryButton from '../buttons/PrimaryButton';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const AgeVerificationPopUp = ({ children }: { children: React.ReactNode }) => {
    const [isVerified, setIsVerified] = useState<boolean | null>(null);
    const pathName = usePathname();
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const isMobile = window.innerWidth > 768;
        setIsMobile(isMobile)
        const allowedPaths = ['/terms', '/privacy-policy'];
        const verified = Cookies.get('age_verified') === 'true';
        if (verified || allowedPaths.includes(pathName)) {
            setIsVerified(true);
        } else {
            setIsVerified(false);
        }
    }, [pathName]);

    const handleAccept = () => {
        Cookies.set('age_verified', 'true', { expires: 7 });
        setIsVerified(true);
    };

    const handleExit = () => {
        window.location.href = 'https://www.google.com';
    };

    if (isVerified === null) return null;

    if (isVerified) return <>{children}</>;

    return (
        <div
            id='age-verification-pop-up'
            style={{
                ...isMobile && {
                    backgroundImage: `
          linear-gradient(to right, #dadada 1px, transparent 1px),
          linear-gradient(to bottom, #dadada 1px, transparent 1px)
        `,
                    backgroundSize: '120px 120px',
                    WebkitMaskImage:
                        'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)',
                    maskImage:
                            'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)',
                    }
                }
            }
            className={cn("fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-md")}
        >
            <div className="bg-white border border-gray-300 max-w-md w-full mx-4 p-6 shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-3">Age Verification Required</h2>
                <p className="text-gray-600 text-sm mb-5">
                    You must be of legal age to access this website. By confirming below, you
                    agree that you are of legal age to view and purchase tobacco-related
                    products in your region.
                </p>

                {/* <label className="block text-sm text-gray-700 mb-4 text-left">
                    <input
                        onChange={(e) => setChecked(e.target.checked)}
                        type="checkbox"
                        className="mr-2 align-middle"
                    />
                    I agree to the{' '}
                    <Link href="/terms" className="text-blue-500 underline">
                        Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy" className="text-blue-500 underline">
                        Privacy Policy
                    </Link>
                    .
                </label> */}

                <div className="flex justify-center gap-4">
                    <PrimaryButton
                        className="rounded-none"
                        // disabled={!checked}
                        onPointerDown={handleAccept}
                        title="Yes, I’m 21+"
                    />
                    <PrimaryButton
                        className="rounded-none"
                        onPointerDown={handleExit}
                        title="Exit"
                    />
                </div>
            </div>
        </div>
    );
};

export default AgeVerificationPopUp;

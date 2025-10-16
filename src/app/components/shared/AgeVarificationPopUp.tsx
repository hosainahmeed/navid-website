'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import PrimaryButton from '../buttons/PrimaryButton';

const AgeVerificationPopUp = ({ children }: { children: React.ReactNode }) => {
    const [checked, setChecked] = useState(false);
    const [isVerified, setIsVerified] = useState<boolean | null>(null);

    useEffect(() => {
        const verified = Cookies.get('age_verified');
        setIsVerified(verified === 'true');
    }, []);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--purple-light)]/50 backdrop-blur-sm">
            <div className="bg-white max-w-md w-full mx-4 p-6 rounded-2xl shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-3">Age Verification Required</h2>
                <p className="text-gray-600 text-sm mb-5">
                    To access this website, you must be of legal age according to the laws of your jurisdiction.
                    By proceeding, you confirm that you are of the legal age required to purchase and use tobacco products.
                </p>

                <label className="block text-sm text-gray-700 mb-4 text-left">
                    <input
                        onChange={(e) => setChecked(e.target.checked)}
                        type="checkbox"
                        className="mr-2 align-middle"
                    />
                    By clicking <span className="font-semibold">Yes</span>, you agree to our{' '}
                    <Link href="/terms" className="text-blue-500 underline">Terms & Conditions</Link>{' '} and{' '}
                    <Link href="/privacy-policy" className="text-blue-500 underline">Privacy Policy</Link>.
                </label>

                <div className="flex justify-center gap-4">
                    <PrimaryButton
                        disabled={!checked}
                        onClick={handleAccept}
                        title="Yes, I’m 18+"
                    />
                    <PrimaryButton
                        onClick={handleExit}
                        title="Exit"
                    />
                </div>
            </div>
        </div>
    );
};

export default AgeVerificationPopUp;

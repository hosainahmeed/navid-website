'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
interface SectionTitleFormalProps {
    title: string;
    description?: string;
    button?: boolean;
    buttonText?: string;
    className?: string;
    buttonClassName?: string;
    icon?: React.ReactNode;
    routes?: string;
}
function SectionHeader(
    { title,
        description,
        button = false,
        buttonText = "Get Started",
        className,
        buttonClassName,
        icon,
        routes
    }: SectionTitleFormalProps) {
    const router = useRouter()
    return (
        <div className={cn("container my-12 py-4 border-b border-gray-200 mx-auto", "flex justify-between md:flex-row flex-col md:items-center", className)}>
            <div>
                <h2 className="text-xl font-semibold md:text-3xl lg:text-4xl font-optima tracking-wide leading-tight">
                    {title}
                </h2>
                <span className="mt-6 text-base text-gray-400 font-normal">
                    {description}
                </span>
            </div>
            {button && (
                <Button
                    onClick={() => {
                        if (routes && typeof routes === 'string') {
                            router.push(routes)
                        }
                    }}
                    className={cn("mt-6 flex items-center gap-2 cursor-pointer", buttonClassName)}>{icon && icon}{buttonText}</Button>
            )}
        </div>
    )
}

export default SectionHeader


{/* <SectionTitleFormal
                title="How It Works"
                description="Simple Steps to Find or List Youth Sport Events — Fast"
                button={true}
                buttonText='Explore All Events'
                icon={<ArrowRightIcon className="w-6 h-6" />}
                buttonClassName='bg-[var(--blue)] text-white'
            /> */}
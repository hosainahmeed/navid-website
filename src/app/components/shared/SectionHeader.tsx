'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion';
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
    const [isHovered, setIsHovered] = React.useState(false)
    return (
        <div className={cn("my-12 border-y py-4 bg-[#EDEDED] border-[var(--border-color)] mx-auto", className)}>
            <div className="max-w-screen-2xl mx-auto flex justify-between md:flex-row flex-col items-center py-2">
                <div>
                    <h2 className="text-xl font-semibold md:text-3xl lg:text-4xl font-optima tracking-wide leading-tight">
                        {title}
                    </h2>
                    <span className="text-base text-gray-400 font-normal">
                        {description}
                    </span>
                </div>
                {button && (
                    <motion.h1
                        onClick={() => {
                            if (routes && typeof routes === 'string') {
                                router.push(routes)
                            }
                        }}
                        className={cn(
                            "flex hover:bg-transparent flex-col w-fit items-center cursor-pointer",
                            buttonClassName)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className='flex relative items-center gap-2'>
                            {icon && icon}{buttonText}
                            {isHovered &&
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        exit={{ width: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className='w-full absolute h-[2px] bg-[var(--purple-light)]'
                                    ></motion.div>
                                </AnimatePresence>
                            }
                        </div>

                    </motion.h1>
                )}
            </div>
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
'use client'
import cn from '@/app/utils/cn'
import React from 'react'

function PrimaryButton({ className, title, onClick, icon, disabled = false }:
    { className?: string, title?: string, onClick: () => void, icon?: React.ReactNode, disabled?: boolean }) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={cn(
                "bg-[var(--color-primary)] flex items-center justify-center gap-2 hover:bg-[var(--color-primary-dark)] cursor-pointer transition-colors duration-300 w-full text-white px-4 py-2 rounded",
                className,
                disabled && "opacity-50 cursor-not-allowed"
            )}>
            {icon}
            {title}
        </button>
    )
}

export default PrimaryButton
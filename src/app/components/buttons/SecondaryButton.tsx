'use client'
import cn from '@/app/utils/cn'
import React from 'react'

function SecondaryButton({ clasName, title, onClick, icon }:
    { clasName?: string, title: string, onClick: () => void, icon?: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={cn("bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] hover:text-[var(--color-bg)] flex items-center justify-center gap-2 text-[var(--color-primary-dark)]  cursor-pointer transition-colors duration-300 w-full px-4 py-2 rounded", clasName)}>
            {icon}
            {title}
        </button>
    )
}
export default SecondaryButton
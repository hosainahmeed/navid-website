'use client'
import cn from '@/app/utils/cn'
import { Tooltip } from 'antd'
import React from 'react'

function PrimaryButton({ className, title, tooltipTitle, onClick, icon, iconClassName, disabled = false }:
    { className?: string, title?: string, tooltipTitle?: string, onClick: () => void, icon?: React.ReactNode, iconClassName?: string, disabled?: boolean }) {
    return (
        <Tooltip
         title={tooltipTitle}
         >
            <button
                disabled={disabled}
                onClick={onClick}
                className={cn(
                    "bg-[var(--color-primary)] flex items-center justify-center gap-2 hover:bg-[var(--color-primary-dark)] cursor-pointer transition-colors duration-300 w-full text-white px-4 py-2 rounded",
                    className,
                    disabled && "opacity-50 cursor-not-allowed"
                )}>
                {icon && <span className={cn(iconClassName)}>{icon}</span>}
                {title}
            </button>
        </Tooltip>
    )
}

export default PrimaryButton
'use client'
import React, { useRef, useState, MouseEvent } from 'react'
import { mockCategoryData } from '@/app/lib/mockCategoryData'
import SectionStyleCategoryDesign from '../category/SectionStyleCategoryDesign'

function TopPageCategory() {
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeft(scrollRef.current.scrollLeft)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollRef.current) return
        e.preventDefault()
        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = (x - startX) * 1.5 // Adjust scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk
    }

    return (
        <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`md:flex hidden flex-nowrap hide-scroll overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 
                ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
        >
            {mockCategoryData.map((item) => (
                <SectionStyleCategoryDesign key={item._id} item={item} />
            ))}
        </div>
    )
}

export default TopPageCategory

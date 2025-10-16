import { mockCategoryData } from '@/app/lib/mockCategoryData'
import React from 'react'
import SectionStyleCategoryDesign from '../category/SectionStyleCategoryDesign'
import Link from 'next/link'

function TopPageCategory() {
    return (
        <div className='flex flex-nowrap justify-between'>
            {mockCategoryData.slice(0, 4).map((item) => (
                <SectionStyleCategoryDesign key={item._id} item={item} />
            ))}
            <Link className='w-full h-auto cursor-pointer hover:bg-[var(--purple-light)] hover:text-white transition-all duration-300 bg-[var(--purple-light)] flex items-center justify-center' href='/categories'>
                <p className='text-white text-sm font-medium'>See More</p>
            </Link>
            
        </div>
    )
}

export default TopPageCategory
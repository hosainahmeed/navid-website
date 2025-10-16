import SubCategoryCard from '@/app/components/category/SubCategoryCard'
import { mockSubcategryData } from '@/app/lib/mockSubcategryData'
import React from 'react'

function page() {
    return (
        <div className="max-w-screen-2xl min-h-[calc(100vh-400px)] mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockSubcategryData.map((item) => (
                    <SubCategoryCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default page
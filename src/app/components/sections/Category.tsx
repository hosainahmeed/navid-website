import React from 'react'
import { mockCategoryData } from '@/app/lib/mockCategoryData'
import SectionHeader from '../shared/SectionHeader'
import { ArrowRightIcon } from 'lucide-react'
import CategoryCard from '../category/CategoryCard'

function Category() {
  return (
    <div>
      <SectionHeader
        title="Categories"
        description="Explore our wide range of categories"
        button={true}
        buttonText='Explore All Categories'
        icon={<ArrowRightIcon className="w-6 h-6" />}
        buttonClassName='bg-[var(--color-primary)] text-white'
        routes='/categories'
      />
      <div className='grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2'>
        {mockCategoryData.slice(0, 4).map((item) => (
          <CategoryCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Category
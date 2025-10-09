import { Category } from '@/app/types/product'
import Image from 'next/image'
import React from 'react'

function SectionStyleCategoryDesign({item}: {item: Category}) {
  return (
    <div className='border shadow-2xs'>
        <div className='flex items-center gap-4'>
            <Image src={item.img} className='w-20 h-20 object-cover' alt={item.name} width={100} height={100} />
            <h2 className='text-2xl font-bold line-clamp-1'>{item.name}</h2>
        </div>
    </div>
  )
}

export default SectionStyleCategoryDesign
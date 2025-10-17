import { Category } from '@/app/types/product'
import Image from 'next/image'
import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

function SectionStyleCategoryDesign({ item }: { item: Category }) {
  return (
    <div className='border min-w-[250px] cursor-pointer hover:bg-[#EDEDED] hover:text-[var(--purple-light)] transition-all duration-300 border-[var(--border-color)] w-full shadow-2xs'>
      <div className='flex items-center flex-col gap-4 p-4'>
        <Image src={item.img} className='w-16 h-16 object-contain' alt={item.name} width={100} height={100} />
        <h2 className='text-xl font-bold line-clamp-1'>{item.name}</h2>
        <MdKeyboardArrowDown />
      </div>
    </div>
  )
}

export default SectionStyleCategoryDesign
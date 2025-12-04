'use client'

import React from 'react'
import { Category } from '@/app/types/product'
import Image from 'next/image'
import { imageUrl } from '@/app/utils/imagePreview'
import { IoMdArrowDropdown } from 'react-icons/io'
import { FaSortUp } from 'react-icons/fa'

interface CategoryItemProps {
  item: Category
  selectedCategory: string | null
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>
}

const SectionStyleCategoryDesign: React.FC<CategoryItemProps> = ({
  item,
  selectedCategory,
  setSelectedCategory,
}) => {
  const isOpen = selectedCategory === item._id

  const handleClick = () => {
    if (isOpen) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(item._id)
    }
  }

  return (
    <div className="relative  w-full">
      <button
        className="flex flex-col w-full items-center justify-center text-center px-4 py-3 
                   border border-[var(--border-color)] rounded-none 
                   bg-white hover:bg-[#EDEDED] cursor-pointer hover:text-[#cc83ee] 
                   min-w-[140px] transition-all duration-300"
        onPointerDown={handleClick}
      >
        <Image
          src={imageUrl({ image: item.img })}
          alt={item.name}
          width={50}
          height={50}
          className="w-12 h-12 object-contain"
        />
        <span className="text-sm font-semibold mt-2">{item.name}</span>
        {/* Icon toggles based on open state */}
        {!isOpen ? <IoMdArrowDropdown className="w-6 h-6 mt-1" /> : <FaSortUp className="w-6 h-6 mt-1" />}
      </button>
    </div>
  )
}

export default SectionStyleCategoryDesign

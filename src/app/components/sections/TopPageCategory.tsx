'use client'
import React, { memo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Category } from '@/app/types/product'
import { Subcategory } from '@/app/types/subcategory'
import { imageUrl } from '@/app/utils/imagePreview'
import Image from 'next/image'
import { useGetAllCategoryQuery } from '@/app/redux/services/catrgoryApis'
import { useGetAllSubCategoryQuery } from '@/app/redux/services/subcategoryApis'
import { cn } from '@/lib/utils'

interface CategoryItemProps {
  item: Category
  selectedCategory: string | null
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  item,
  selectedCategory,
  setSelectedCategory,
}) => {
  const isOpen = selectedCategory === item._id

  const handleClick = () => {
    setSelectedCategory(isOpen ? null : item._id)
  }


  return (
    <div className="w-1/5 min-w-[140px] flex-shrink-0">
      <button
        className={cn(`flex flex-col items-center justify-center text-center px-4 py-4 w-full h-full
                   border-r border-gray-200 bg-white hover:bg-gray-50
                   transition-all duration-200
                   ${isOpen ? 'bg-[#EDEDED] text-purple-600' : 'text-gray-700'}`)}
        onClick={handleClick}
      >
        <Image
          src={imageUrl({ image: item.img })}
          alt={item.name}
          width={64}
          height={64}
          className="w-12 h-12 object-contain mb-2"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/48?text=No+Image'
          }}
        />
        <span className="text-sm font-semibold mb-1 line-clamp-1">{item.name}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-purple-600" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
    </div>
  )
}


const TopPageCategory = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data: categoryData, isLoading, isError } = useGetAllCategoryQuery(undefined)
  const { data: subCategoryData, isLoading: subLoading, isFetching } = useGetAllSubCategoryQuery(
    { category_id: selectedCategory || '' },
    { skip: !selectedCategory }
  )

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const categories: Category[] = categoryData?.data || []
  const subcategories: Subcategory[] = subCategoryData?.data || []

  const selectedCategoryName = categories.find(c => c._id === selectedCategory)?.name || ''

  if (isLoading) {
    return (
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-gray-600">Loading categories...</span>
        </div>
      </div>
    )
  }

  if (isError || !categories.length) {
    return (
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="text-center text-gray-500">
          No categories available
        </div>
      </div>
    )
  }

  return (
    <div className="relative hidden md:block border border-[var(--border-color)] border-b bg-white">
      {/* Category Navigation - Fixed 5 items per row with scroll */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex  flex-nowrap overflow-x-auto overflow-y-visible
                   select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                   hide-scrollbar scroll-smooth`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {categories
          .filter(item => item.is_active)
          .map((item) => (
            <CategoryItem
              key={item._id}
              item={item}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ))}
      </div>
      {selectedCategory && <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm'
        onClick={() => setSelectedCategory(null)}
      />}

      {/* Subcategory Dropdown */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute border border-[var(--border-color)] left-0 right-0 top-full bg-white border-b  z-50 overflow-hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              className="container mx-auto p-2"
            >
              <h2 className="text-lg line-clamp-2 text-wrap font-bold bg-[var(--color-primary-light)] px-2 text-white mb-4">
                {selectedCategoryName} Subcategories ({subcategories?.length || 0})
              </h2>

              {/* Subcategory Loading */}
              {subLoading || isFetching ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <span className="ml-3 text-gray-600">Loading subcategories...</span>
                </div>
              ) : subcategories.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No subcategories available for this category
                </div>
              ) : (
                <div className="grid grid-cols-1 max-h-[200px] md:max-h-[400px] overflow-y-scroll  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {subcategories.map((sub) => {
                    return (
                      <div
                        key={sub._id}
                        className="flex hover:underline items-center gap-3 p-1 cursor-pointer transition-all"
                      >
                        <span className="text-sm px-2 line-clamp-1 font-medium text-center text-gray-700">
                          {sub.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      `}</style>
    </div>
  )
}

export default memo(TopPageCategory)
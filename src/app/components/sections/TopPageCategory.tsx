'use client'

import React, { useRef, useState, MouseEvent } from 'react'
import { useGetAllCategoryQuery } from '@/app/redux/services/catrgoryApis'
import { useGetAllSubCategoryQuery } from '@/app/redux/services/subcategoryApis'
import { Category } from '@/app/types/product'
import { Subcategory } from '@/app/types/subcategory'
import SectionStyleCategoryDesign from '../category/SectionStyleCategoryDesign'
import { AnimatePresence, motion } from 'framer-motion'

const TopPageCategory = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data: categoryData, isLoading } = useGetAllCategoryQuery(undefined)
  const { data: subCategoryData } = useGetAllSubCategoryQuery(
    { category_id: selectedCategory || '' },
    { skip: !selectedCategory }
  )

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="hidden relative md:flex flex-nowrap overflow-x-auto overflow-y-visible hide-scrollbar
                 border-b border-[var(--border-color)] bg-white select-none cursor-grab"
    >
      {categoryData?.data?.map((item: Category) => (
        <SectionStyleCategoryDesign
          key={item._id}
          item={item}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}

      {/* Dropdown */}
      <AnimatePresence>
        {selectedCategory && subCategoryData?.data?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 bg-white border border-[var(--border-color)] shadow-md p-4 w-full z-50"
          >
            <h1 className="text-lg font-semibold mb-2">All Subcategories</h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              {subCategoryData.data.map((sub: Subcategory) => (
                <div
                  key={sub._id}
                  className="flex flex-col items-center gap-2 border p-2 w-full hover:bg-gray-100 cursor-pointer transition-all"
                >
                  <img
                    src={sub.img}
                    alt={sub.name}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-sm font-medium">{sub.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TopPageCategory

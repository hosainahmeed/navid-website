// src/app/components/shop/FiltersSidebar.tsx
'use client'
import React, { useState } from 'react'
import { Slider } from 'antd'
import { ChevronDown, ChevronUp, Filter } from 'lucide-react'
import { useProfileQuery } from '@/app/redux/services/profileApis'
import { useGetAllCategoryQuery } from '@/app/redux/services/catrgoryApis'
import { useGetAllSubCategoryQuery } from '@/app/redux/services/subcategoryApis'

interface FiltersSidebarProps {
    selectedCategory: string
    setSelectedCategory: (value: string) => void
    subCategory: string
    setSubCategory: (value: string) => void
    wholeSale: boolean
    setWholeSale: (value: boolean) => void
    priceRange: [number, number]
    setPriceRange: (value: [number, number]) => void
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
    selectedCategory,
    setSelectedCategory,
    subCategory,
    setSubCategory,
    wholeSale,
    setWholeSale,
    priceRange,
    setPriceRange,
}) => {
    const { data: profileData } = useProfileQuery(undefined)
    const { data: categoryData } = useGetAllCategoryQuery(undefined)
    const { data: subcategoryData } = useGetAllSubCategoryQuery(
        { category_id: selectedCategory },
        { skip: !selectedCategory }
    )

    const categories = categoryData?.data?.map((item: any) => ({
        key: item?._id,
        label: item?.name,
    })) || []

    const subCategories = subcategoryData?.data?.map((item: any) => ({
        key: item?._id,
        label: item?.name,
    })) || []

    const handleCategorySelect = ({ key }: { key: string }) => {
        setSelectedCategory(key)
        setSubCategory('')
    }

    const handleSubCategorySelect = ({ key }: { key: string }) => {
        setSubCategory(key)
    }

    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        price: true,
        categories: true,
        subcategories: true,
    })

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    return (
        <div className="w-full max-w-xs bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-[80vh]">
            {/* Product Type Section */}
            <div className="border-b border-gray-100">
               <div className="px-4 pb-4 pt-2">
                        <div className="space-y-2">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    checked={!wholeSale}
                                    onChange={() => {
                                        setSubCategory('')
                                        setWholeSale(false)
                                    }}
                                />
                                <span className="text-gray-700">All Products</span>
                            </label>
                            <label className={`flex items-center space-x-3 ${!profileData?.data?.tax_id ? 'opacity-50' : 'cursor-pointer'}`}>
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    checked={wholeSale}
                                    disabled={!profileData?.data?.tax_id}
                                    onChange={() => {
                                        setSubCategory('')
                                        setWholeSale(true)
                                    }}
                                />
                                <span className="text-gray-700">Wholesale Only</span>
                                {!profileData?.data?.tax_id && (
                                    <span className="text-xs text-gray-500">(Requires tax ID)</span>
                                )}
                            </label>
                        </div>
                    </div>
            </div>
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-indigo-600" />
                    Filters
                </h2>
                <button
                    onClick={() => {
                        setSelectedCategory('')
                        setSubCategory('')
                        setWholeSale(false)
                        setPriceRange([0, 10000])
                    }}
                    className="text-sm cursor-pointer font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                    Clear All
                </button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {/* Price Range Section */}
                <div className="border-b border-gray-100">
                    <button
                        onClick={() => toggleSection('price')}
                        className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                        <span className="font-medium text-gray-700">Price Range</span>
                        {openSections.price ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </button>

                    {openSections.price && (
                        <div className="px-4 pb-4 pt-2">
                            <Slider
                                range
                                min={0}
                                max={10000}
                                step={100}
                                value={priceRange}
                                onChange={(value) => setPriceRange(value as [number, number])}
                                trackStyle={[{ backgroundColor: '#4f46e5' }]}
                                handleStyle={[
                                    { borderColor: '#4f46e5' },
                                    { borderColor: '#4f46e5' }
                                ]}
                                className="mb-2"
                            />
                            <div className="flex justify-between items-center mt-3 space-x-3">
                                <div className="flex-1">
                                    <label htmlFor="minPrice" className="block text-xs font-medium text-gray-500 mb-1">
                                        Min Price
                                    </label>
                                    <div className="relative rounded-md">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            id="minPrice"
                                            min={0}
                                            max={priceRange[1] - 1}
                                            value={priceRange[0]}
                                            onChange={(e) => {
                                                const value = Math.min(Number(e.target.value), priceRange[1] - 1)
                                                setPriceRange([value, priceRange[1]])
                                            }}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 py-2 text-sm border-gray-300 rounded-md"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center pt-5">
                                    <span className="text-gray-400">-</span>
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="maxPrice" className="block text-xs font-medium text-gray-500 mb-1">
                                        Max Price
                                    </label>
                                    <div className="relative rounded-md">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            id="maxPrice"
                                            min={priceRange[0] + 1}
                                            max={10000}
                                            value={priceRange[1]}
                                            onChange={(e) => {
                                                const value = Math.max(Number(e.target.value), priceRange[0] + 1)
                                                setPriceRange([priceRange[0], value])
                                            }}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 py-2 text-sm border-gray-300 rounded-md"
                                            placeholder="10000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                {/* Categories Section */}
                <div className="border-b border-gray-100">
                    <button
                        onClick={() => toggleSection('categories')}
                        className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                        <span className="font-medium text-gray-700">Categories</span>
                        {openSections.categories ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </button>

                    {openSections.categories && (
                        <div className="px-4 pb-3">
                            <div className="space-y-1">
                                {categories.map((category: any) => (
                                    <button
                                        key={category.key}
                                        onClick={() => handleCategorySelect({ key: category.key })}
                                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === category.key
                                            ? 'bg-indigo-50 text-indigo-700 font-medium'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Subcategories Section */}
                <div className="border-b border-gray-100">
                    <button
                        onClick={() => toggleSection('subcategories')}
                        className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                        <span className="font-medium text-gray-700">Subcategories</span>
                        {openSections.subcategories ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </button>

                    {openSections.subcategories && (
                        <div className="px-4 pb-3">
                            {!selectedCategory ? (
                                <p className="text-sm text-gray-500 py-2">Select a category to see subcategories</p>
                            ) : subCategories.length === 0 ? (
                                <p className="text-sm text-gray-500 py-2">No subcategories available</p>
                            ) : (
                                <div className="space-y-1">
                                    {subCategories.map((subCat: any) => (
                                        <button
                                            key={subCat.key}
                                            onClick={() => handleSubCategorySelect({ key: subCat.key })}
                                            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${subCategory === subCat.key
                                                ? 'bg-indigo-50 text-indigo-700 font-medium'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {subCat.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>


            </div>
        </div>
    )
}

export default FiltersSidebar
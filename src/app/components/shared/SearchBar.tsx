'use client'
import { productData } from '@/app/constants/exmpleData'
import { imageUrl } from '@/app/utils/imagePreview'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { IoMdMenu } from 'react-icons/io'

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(productData)
  const router = useRouter()
  const handleSearch = () => {
    if (query === '') return
    const filteredResults = productData.filter((product) =>
      product?.name?.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filteredResults)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }


  const getFirstImage = (item: any) => {
    if (!item?.variantImages) return '';

    const variantColors = Object.keys(item.variantImages);
    if (variantColors.length === 0) return '';

    const firstColor = variantColors[0];
    const firstVariant = item.variantImages[firstColor];

    if (firstVariant?.img && firstVariant.img.length > 0) {
      return firstVariant.img[0];
    }

    return '';
  };

  return (
    <div className='flex relative md:flex-row flex-col w-full mx-auto items-center my-4 gap-2'>
      <div className='flex items-center gap-2 w-full md:hidden'>
        <button
        onClick={() => router.push('/shop')}
        className='bg-[var(--purple-light)]   w-fit h-10 flex items-center cursor-pointer text-white px-4 py-2'>
          <IoMdMenu />
        </button>
        <div className='h-10 text-white w-full  md:w-fit flex-nowrap text-nowrap bg-[var(--purple-light)] flex items-center justify-center px-4 cursor-pointer'>
          Whole sale
        </div>
      </div>
      <div className='flex w-full items-center gap-2'>
        <input
          type='text'
          placeholder='Search'
          className='w-full p-2 border pl-4 border-[var(--border-color)]'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        <button
          onClick={handleSearch}
          className='bg-[var(--purple-light)] w-fit flex items-center gap-2 cursor-pointer text-white px-4 py-2'
        >
          <FaSearch />
          Search
        </button>
      </div>
      {showResults && <div className='absolute top-12 rounded z-[999] left-0 w-full h-72 p-3 shadow-2xl border overflow-y-auto bg-white'>
        {results.length === 0 ?
          <div className='flex items-center justify-center h-full flex-col gap-2'>
            <p className='text-gray-500'>No results found</p>
            <p className='text-gray-500'>Try searching for something else</p>
          </div>
          : results.map((product) => (
            <div
              onMouseDown={(e) => {
                e.preventDefault()
                router.push(`/shop?productName=${product.name}`)
              }}
              key={product._id}
              className='p-4 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer'
            >
              <div className='flex items-center gap-4'>
                {getFirstImage(product) && <Image
                  src={imageUrl({ image: getFirstImage(product) })}
                  alt={product.name}
                  width={50}
                  height={50}
                />}
                <div className='flex items-start gap-2 flex-col'>
                  <span className='font-semibold'>{product.name}</span>
                  <span className='text-gray-700 flex items-center gap-2 font-semibold'>{product.price}{product.previous_price && <small className='line-through'>{product.previous_price}</small>}</span>
                </div>
              </div>
            </div>
          ))}
      </div>}
    </div >
  )
}

export default SearchBar

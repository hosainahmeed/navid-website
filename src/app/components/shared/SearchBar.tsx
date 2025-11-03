'use client'
import { imageUrl } from '@/app/utils/imagePreview'
import Image from 'next/image'
import React, { memo, useMemo, useState } from 'react'
import { FaArrowLeft, FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { IoMdClose, IoMdMenu } from 'react-icons/io'
import { useGetAllProductQuery } from '@/app/redux/services/productApis'
import { Category, Iproduct } from '@/app/types/product'
import debounce from 'lodash.debounce'
import { useGetAllCategoryQuery } from '@/app/redux/services/catrgoryApis'
import { AnimatePresence, motion } from 'framer-motion'
import { useGetAllSubCategoryQuery } from '@/app/redux/services/subcategoryApis'
import { Subcategory } from '@/app/types/subcategory'
import { message, Skeleton } from 'antd'
import { useProfileQuery } from '@/app/redux/services/profileApis'
import { cn } from '@/lib/utils'
import { IMAGE } from '@/app/constants/Image.index'
import toast from 'react-hot-toast'

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [showSubCategory, setShowSubCategory] = useState(false)
  const { data: productData, isLoading: productLoading, isFetching } = useGetAllProductQuery({
    ...(search !== '' && { search }),
  })
  const router = useRouter()
  const { data: profileData } = useProfileQuery(undefined)
  const [showCategory, setShowCategory] = useState(false)
  const { data: categoryData, isLoading: categoryLoading } = useGetAllCategoryQuery(undefined)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { data: subCategoryData } = useGetAllSubCategoryQuery({
    category_id: selectedCategory
  }, { skip: selectedCategory === null })


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value.trim())
      }, 500),
    []
  )

  const handleSearch = () => {
    if (search === '') return
    setSearch(search)
    setShowResults(true)
    router.push(`/shop?productName=${search}`)
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

  const handleWholeSale = () => {
    if (profileData?.data?.tax_id === null || profileData?.data?.tax_id === '') {
      toast.error('Please provide the tax id')
      router.push('/profile?tab=Settings')
      return
    }
    router.push('/shop?whole_sale=true')
  }

  return (
    <div className='flex relative md:flex-row flex-col w-full mx-auto items-center border border-[var(--border-color)] my-4'>
      <div className={cn('w-full z-50 relative flex flex-col md:flex-row',
        showResults ? 'z-50' : 'z-0'
      )}>
        <div className='flex bg-white items-center justify-between border-b md:border-b-0 border-[var(--border-color)] w-full md:w-fit'>
          <button
            onClick={() => setShowCategory(!showCategory)}
            className='border-r border-[var(--border-color)]  w-fit h-[80px] md:h-fit flex items-center cursor-pointer text-black px-4 py-2'>
            {showCategory ? <IoMdClose /> : <IoMdMenu />}
          </button>
          <div className='w-[80px] md:hidden block h-[80px] md:h-fit py-1'>
            <Image src={IMAGE.brand} alt="Whole sale" width={80} height={80} className='h-full w-auto' />
          </div>
          <div
            onClick={handleWholeSale}
            className='h-[80px] md:h-fit text-black border-l md:border-l-0 md:border-r border-[var(--border-color)] w-fit flex-nowrap text-nowrap flex items-center justify-center px-4 cursor-pointer'>
            Whole sale
          </div>
        </div>
        <div className='flex w-full items-center'>
          <input
            type='text'
            placeholder='Search'
            className='w-full p-2 bg-white outline-none focus:outline-none border-none'
            onChange={(e) => debouncedSearch(e.target.value)}
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
      </div>
      {
        showResults &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm'
          onClick={() => setShowResults(false)}
        />
      }

      {showResults && <div className='absolute md:top-12 top-32 rounded z-[888] left-0 w-full h-72 p-3 shadow-2xl border overflow-y-auto bg-white'>
        {productData?.data?.length === 0 ?
          <div className='flex items-center justify-center h-full flex-col gap-2'>
            <p className='text-gray-500'>No results found</p>
            <p className='text-gray-500'>Try searching for something else</p>
          </div>
          : (productLoading || isFetching) ? <Skeleton /> : productData?.data?.map((product: Iproduct) => (
            <div
              onMouseDown={(e) => {
                e.preventDefault()
                router.push(`/shop?productName=${product?.name}`)
              }}
              key={product?._id}
              className='p-4 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer'
            >
              <div className='flex items-center gap-4'>
                {getFirstImage(product) && <Image
                  src={imageUrl({ image: getFirstImage(product) })}
                  alt={product?.name}
                  width={50}
                  height={50}
                />}
                <div className='flex items-start gap-2 flex-col'>
                  <span className='font-semibold'>{product?.name}</span>
                  <span className='text-gray-700 flex items-center gap-2 font-semibold'>{product?.price}{product?.previous_price && <small className='line-through'>{product?.previous_price}</small>}</span>
                </div>
              </div>
            </div>
          ))}
      </div>}
      {showCategory &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm'
          onClick={() => setShowCategory(false)}
        />}
      {showCategory &&
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className='absolute top-12 z-[999] left-0 w-full h-96 pb-4 border border-[var(--border-color)] shadow-2xl overflow-y-auto bg-white'>
            {categoryData?.data.length === 0 ?
              <div className='flex items-center justify-center h-full flex-col gap-2'>
                <p className='text-gray-500'>No results found</p>
              </div>
              : showSubCategory ?
                <>
                  <h1 onClick={() => setShowSubCategory(false)}
                    className='sticky top-0 z-50 cursor-pointer text-xl text-white flex bg-[var(--purple-light)] p-1 items-center gap-2 flex-nowrap mb-2'><FaArrowLeft /> Back</h1>
                  {subCategoryData?.data.map((sub: Subcategory) => {
                    return (
                      <div key={sub?._id} className='p-4 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer'>
                        <div
                          className="flex hover:underline items-center gap-3 p-1 cursor-pointer transition-all"
                        >
                          <Image
                            src={imageUrl({ image: sub?.img })}
                            alt={sub?.name}
                            width={50}
                            height={50}
                          />
                          <span className="text-xl px-2 line-clamp-1 font-medium text-center text-gray-700">
                            {sub?.name}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </>
                :
                categoryLoading ?
                  <Skeleton />
                  :
                  <>
                    <div className='flex items-center border-b border-black sticky top-0 z-50 bg-white justify-between'>
                      <h1 className='text-2xl font-semibold py-4 px-3'>Categories</h1>
                      <IoMdClose onClick={() => setShowCategory(false)} className='cursor-pointer text-2xl' />
                    </div>
                    {categoryData?.data?.map((category: Category) => (
                      <div
                        onClick={() => {
                          setShowSubCategory(true)
                          setSelectedCategory(category?._id)
                        }}
                        key={category?._id}
                        className='p-4 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer'
                      >
                        <div className='flex items-center gap-4'>
                          <Image
                            src={imageUrl({ image: category?.img })}
                            alt={category?.name}
                            width={50}
                            height={50}
                          />
                          <div className='flex items-center gap-2 w-full justify-between'>
                            <span className='font-semibold text-xl'>{category?.name}</span> {">"}
                          </div>
                        </div>
                      </div>
                    ))}

                  </>}
          </motion.div>
        </AnimatePresence>
      }
    </div >
  )
}

export default memo(SearchBar)

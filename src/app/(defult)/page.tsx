import React from 'react'
import NewArrivalsProducts from '../components/sections/NewArrivalsProducts'
import BannerCarousel from '../components/sections/BannerCarousel'
import SlidingCarosel from '../components/shared/SlidingCarosel'
import TopPageCategory from '../components/sections/TopPageCategory'
import SearchBar from '../components/shared/SearchBar'

function page() {
  return (
    <div
      className='max-w-screen-2xl py-12 mx-auto border-x border-[var(--border-color)] px-3 space-y-2'>
      <SearchBar />
      <TopPageCategory />
      <BannerCarousel />
      <SlidingCarosel />
      <NewArrivalsProducts />
    </div>
  )
}

export default page
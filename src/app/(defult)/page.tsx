import React from 'react'
import NewArrivalsProducts from '../components/sections/NewArrivalsProducts'
import BannerCarousel from '../components/sections/BannerCarousel'
import Category from '../components/sections/Category'
import SearchBar from '../components/shared/SearchBar'

function page() {
  return (
    <div
      className='max-w-7xl px-1 mx-auto'>
      <SearchBar />
      <BannerCarousel />
      <Category />
      <NewArrivalsProducts />
    </div>
  )
}

export default page
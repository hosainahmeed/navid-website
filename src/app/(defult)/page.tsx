import React from 'react'
import NewArrivalsProducts from '../components/sections/NewArrivalsProducts'
import BannerCarousel from '../components/sections/BannerCarousel'
import Category from '../components/sections/Category'

function page() {
  return (
    <div
      className='max-w-7xl px-1 mx-auto'>
      <BannerCarousel />
      <Category />
      <NewArrivalsProducts />
    </div>
  )
}

export default page
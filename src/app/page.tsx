import React from 'react'
import NewArrivalsProducts from './components/sections/NewArrivalsProducts'
import BannerCarousel from './components/sections/BannerCarousel'

function page() {
  return (
    <div
      className='container mx-auto'>
      <BannerCarousel />
      <NewArrivalsProducts />
    </div>
  )
}

export default page
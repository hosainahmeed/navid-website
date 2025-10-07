import React from 'react'
import ProductCard from './components/products/ProductCard'
import { productData } from './constants/exmpleData'

function page() {
  return (
    <div>
      {productData.map((item) => <ProductCard key={item._id} item={item} />)}
    </div>
  )
}

export default page
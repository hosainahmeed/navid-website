'use client'
import React, { useState } from 'react'
import PrimaryButton from '../buttons/PrimaryButton'
import { AddToCartIcon, EyeIcon, ViewDetailIcons } from '@/app/constants/icon.index'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'
import { Modal } from 'antd'
import { ImageGallery } from './ImageGallery'
import { ProductInfo } from './ProductInfo'
import { mockProductData } from '@/app/lib/mockProductData'

function ProductCardClientSide({ id }: { id: string }) {
    const router = useRouter()
    const { addToCart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { data: product } = mockProductData

    const handleQuickView = (id: string) => {
        console.log(id)
        setIsModalOpen(true)
    }
    return (
        <div className='flex items-center mt-3 justify-center gap-2'>
            <PrimaryButton
                tooltipTitle='Add to Cart'
                onClick={() => addToCart(id)}
                icon={<AddToCartIcon className="w-5 h-5" fill="white" />}
                className='shadow  rounded-full h-12 w-12 p-0'
            />
            <PrimaryButton
                tooltipTitle='View Details'
                onClick={() => router.push(`/product/${id}`)}
                icon={<ViewDetailIcons className='w-5 h-5' fill='white' />}
                className='shadow rounded-full h-12 w-12 p-0'
            />
            <PrimaryButton
                tooltipTitle='Quick View'
                onClick={() => handleQuickView(id)}
                icon={<EyeIcon className='w-5 h-5' fill='white' />}
                className='shadow rounded-full h-12 w-12 p-0'
            />
            <Modal
                // loading={true}
                title="Quick View"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={1200}    
            >
                <main className=" mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    {/* Product Details Section */}
                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                        {/* Image Gallery */}
                        <div className="lg:sticky lg:top-24 lg:self-start">
                            <ImageGallery images={product.banner} productName={product.name} />
                        </div>

                        {/* Product Information */}
                        <div>
                            <ProductInfo product={product} />
                        </div>
                    </div>
                </main>
            </Modal>

        </div>
    )
}

export default ProductCardClientSide
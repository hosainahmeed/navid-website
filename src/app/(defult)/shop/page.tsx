import ProductCard from '@/app/components/products/ProductCard'
import SectionHeader from '@/app/components/shared/SectionHeader'
import { productData } from '@/app/constants/exmpleData'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

function page() {
    return (
        <div className='max-w-7xl px-2 mx-auto'>
            <SectionHeader
                title='All products'
                description="Looking for a hookah? We've got you covered! We carry a wide variety of hookah products, from traditional hookahs to modern hookah pipes. Whether you're a hookah beginner or a hookah aficionado, we've got the perfect hookah for you. In addition to our hookahs, we also carry all the hookah accessories you'll need, from coals to mouthpieces. So what are you waiting for? Check out our hookah products today!"
            />
            <div className='flex justify-between mb-3 gap-4 items-center'>
                    <Input className='' type="text" placeholder='Search products' />
                <Select>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="hookah">Hookah</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {productData.slice(0, 6).map((item) => <ProductCard key={item._id} item={item} />)}
            </div>
        </div>
    )
}

export default page
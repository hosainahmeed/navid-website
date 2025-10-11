import React from 'react'
import Image from 'next/image'
import ProductCardClientSide from './ProductCardClientSide';
import { Iproduct } from '@/app/types/product';
import { CardContent } from '@/components/ui/card';
import { imageUrl } from '@/app/utils/imagePreview';



function ProductCard({ item }: { item: Iproduct }) {
    const hasDiscount = item?.previous_price > item?.price;

    // Safe way to get the first available image

    const getFirstImage = () => {
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
    const productImage = getFirstImage();

    return (
        <div className="w-full shadow inset-0 z-0 border bg-[#FFFFFF] border-gray-300 rounded transition-transform duration-300 group p-3">
            <figure className="overflow-hidden shadow rounded-lg relative mb-1">
                {productImage ? (
                    <Image
                        src={imageUrl({ image: productImage })}
                        width={400}
                        height={400}
                        alt={item?.name}
                        className="object-cover w-full h-full object-center aspect-square bg-gray-400"
                    />
                ) : (
                    <div className="w-full h-full aspect-square bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                    </div>
                )}
                <span className="absolute top-2 left-2 px-3 py-1 line-clamp-1 bg-gray-950/20 backdrop-blur-sm text-xs rounded-full text-gray-50">
                    {item?.category?.name}
                </span>
            </figure>
            <CardContent className="p-4">
                <div className="space-y-2">
                    <h3 className="font-semibold text-foreground line-clamp-2">
                        {item?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground h-12 line-clamp-2">{item?.description}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-foreground">${item?.price.toFixed(2)}</span>
                        {hasDiscount && (
                            <span className="text-sm text-muted-foreground line-through">
                                ${item?.previous_price.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>
                <ProductCardClientSide id={item?._id} />
            </CardContent>
        </div>
    )
}

export default ProductCard
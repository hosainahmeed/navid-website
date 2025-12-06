import { Order } from '@/app/types/order';
import { imageUrl } from '@/app/utils/imagePreview';
import React, { memo } from 'react'

function ItemDetailSection({ order }: { order: Order }) {
    return (
        <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Order Items</h3>
            <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-96 overflow-y-auto pr-1 sm:pr-2">
                {order?.items?.map((item: any, idx: number) => (
                    <div
                        key={item._id || idx}
                        className="bg-gray-50 rounded border p-3 sm:p-4 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex gap-3 sm:gap-4">
                            {item.variant?.img?.[0] ? (
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                    <img
                                        src={imageUrl({ image: item.variant.img[0] })}
                                        alt={item.product?.name || 'Product'}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-gray-400 text-xs">No Image</span>
                                </div>
                            )}

                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-1 truncate">
                                    {item.product?.name || 'Product'}
                                </h4>
                                <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-2">
                                    <span className="flex items-center gap-1">
                                        <span className="font-medium">Size:</span>
                                        <span className="bg-white px-2 py-0.5 rounded">
                                            {item.variant?.size || 'N/A'}
                                        </span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="font-medium">Qty:</span>
                                        <span className="bg-white px-2 py-0.5 rounded">
                                            {item.quantity || 1}
                                        </span>
                                    </span>
                                    {item.variant?.color && (
                                        <span className="flex items-center gap-1">
                                            <span className="font-medium">Color:</span>
                                            <div
                                                className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                                                style={{ backgroundColor: item.variant.color }}
                                                title={item.variant.color}
                                            />
                                        </span>
                                    )}
                                </div>
                                <p className="text-base sm:text-lg font-bold text-gray-800">
                                    ${(item.variant?.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(ItemDetailSection)
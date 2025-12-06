import { Order } from '@/app/types/order'
import React, { memo } from 'react'

function DeliveryInformation({ order }: { order: Order }) {
    return (
        <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                Delivery Information
            </h3>
            {order?.delivery_address ? (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded p-4 sm:p-5 border border-gray-200">
                    <div className="flex items-start gap-2">
                        <span className="text-gray-600 font-medium min-w-[70px] sm:min-w-[80px]">Name:</span>
                        <span className="text-gray-800 break-words">{order?.delivery_address.name}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-gray-600 font-medium min-w-[70px] sm:min-w-[80px]">Address:</span>
                        <span className="text-gray-800 break-words">{order?.delivery_address.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-gray-600 font-medium min-w-[70px] sm:min-w-[80px]">Phone:</span>
                        <span className="text-gray-800">{order?.delivery_address.phone}</span>
                    </div>
                </div>
            ) : order?.pick_up_address ? (
                <div className="space-y-2 text-sm sm:text-base">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-2">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        Pickup Location
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-gray-600 font-medium min-w-[70px] sm:min-w-[80px]">Name:</span>
                        <span className="text-gray-800 break-words">{order?.pick_up_address.name}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-gray-600 font-medium min-w-[70px] sm:min-w-[80px]">Address:</span>
                        <span className="text-gray-800 break-words">{order?.pick_up_address.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-gray-600 font-medium min-w-[70px] sm:min-w-[80px]">Phone:</span>
                        <span className="text-gray-800">{order?.pick_up_address.phone}</span>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 italic">No delivery information available</p>
            )}
        </div>
    )
}

export default memo(DeliveryInformation)
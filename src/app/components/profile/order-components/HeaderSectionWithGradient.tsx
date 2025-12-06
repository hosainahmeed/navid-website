import React, { memo } from 'react'
import dayjs from "dayjs";
import { Order } from '@/app/types/order';

function HeaderSectionWithGradient({ order }: { order: Order }) {
    return (
        <div className="bg-gray-400 px-4 py-2 text-white">
            <div className="flex justify-between items-start flex-wrap gap-3 sm:gap-4">
                <div>
                    <p className="text-xs sm:text-sm opacity-90 mb-1">Order ID</p>
                    <p className="font-mono text-base font-semibold truncate max-w-[150px]">
                        {order?._id}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs sm:text-sm opacity-90 mb-1">Order Date</p>
                    <p className="text-base font-semibold">
                        {dayjs(order?.createdAt).format("MMM DD, YYYY")}
                    </p>
                    <p className="text-xs opacity-75">
                        {dayjs(order?.createdAt).format("h:mm A")}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default memo(HeaderSectionWithGradient)
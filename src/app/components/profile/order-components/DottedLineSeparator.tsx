import React, { memo } from 'react'

function DottedLineSeparator() {
    return (
        <div className="relative my-6">
            <div className="absolute left-0 top-1/2 w-full border-t-2 border-dashed border-gray-300"></div>
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 rounded-full"></div>
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 rounded-full"></div>
        </div>
    )
}

export default memo(DottedLineSeparator)
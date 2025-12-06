import { Order } from '@/app/types/order'
import { Switch } from 'antd'
import React, { memo } from 'react'
interface Iprops {
    order: Order,
    showDetails: any,
    handleToggleChange: any
}
function SwitchSection(props: Iprops) {
    return (
        <div className="switch-toggle mt-12 flex justify-between items-start border-b pb-2">
            <span>{`Switch for ${props?.showDetails ? "Delivery Information" : "Order Items"}`}</span>
            <Switch
                checkedChildren="Order Items"
                unCheckedChildren="Delivery Info"
                size="default"
                checked={props?.showDetails}
                onChange={(value) => props?.handleToggleChange(props?.order?._id, value)}
            />
        </div>
    )
}

export default memo(SwitchSection)
"use client";

import { memo, useState } from "react";
import { Spin, Empty, Pagination, Switch, Tag, Radio, Button } from "antd";
import dayjs from "dayjs";
import { useGetAllOrdersQuery } from "@/app/redux/services/orderApis";
import { imageUrl } from "@/app/utils/imagePreview";
import { MdOutlinePayment } from "react-icons/md";
import { useCreatePaymentMutation } from "@/app/redux/services/paymentApis";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface OrderProduct {
  _id: string;
  name: string;
}

interface OrderVariant {
  _id: string;
  img: string[];
  color: string;
  size: string;
  quantity: number;
  price: number;
  discount: number;
}

interface OrderItem {
  _id: string;
  product: OrderProduct;
  variant: OrderVariant;
  quantity: number;
}

interface DeliveryAddress {
  _id: string;
  address: string;
  phone: string;
  name: string;
}
interface PickupAddress {
  _id: string;
  address: string;
  phone: string;
  name: string;
}

interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: OrderItem[];
  payment_status: string;
  total_amount: number;
  delivery_status: string;
  delivery_address: DeliveryAddress | null;
  pick_up_address: PickupAddress | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function OrdersSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState(null)
  const { data: orderResponse, isLoading, error } = useGetAllOrdersQuery({ page: currentPage, limit: 6, sort: 'createdAt', order: 'desc', ...(status !== null ? { delivery_status: status } : {}) });
  // Store toggle state per order ID
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});
  const [createPayment, { isLoading: createPaymentLoading }] = useCreatePaymentMutation()
  const router = useRouter()
  const orders: Order[] = orderResponse?.data || [];
  const pagination = orderResponse?.pagination;

  const handleToggleChange = (orderId: string, value: boolean) => {
    setToggleStates(prev => ({
      ...prev,
      [orderId]: value
    }));
  };

  // Initialize all orders to show details (true) by default
  const getToggleState = (orderId: string) => {
    return toggleStates[orderId] !== undefined ? toggleStates[orderId] : true;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load orders</p>
      </div>
    );
  }


  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'processing':
        return 'blue';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'green';
      case 'unpaid':
        return 'red';
      case 'pending':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  const handlePayment = async (id: string) => {
    try {
      if (!id) {
        throw new Error("Order is not found!")
      }
      const data = {
        order_id: id
      }
      const res = await createPayment(data).unwrap()
      if (!res?.success) {
        throw new Error(res?.message || "something is wrong while payment!")
      }
      toast.success(res?.message || 'Your payment link has been created.')
      if (window !== undefined) {
        window.location.href = res?.url
      } else {
        router.push(res?.url)
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "something is wrong while payment!")

    }
  }

  return (
    <div className="space-y-6 p-2 sm:p-4 ">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My Orders</h2>
      <Radio.Group
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={[
          { value: 'pending', label: 'Pending' },
          { value: 'shipped', label: 'Shipped' },
          { value: 'delivered', label: 'Delivered' },
        ]}
      />
      <div className="grid  mt-6 sm:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-3">
        {
          orders?.length === 0 ?
            <div className="py-10 col-span-5">
              <Empty description="No orders found" />
            </div>
            : orders?.map((order) => {
              const showDetails = getToggleState(order?._id);
              return (
                <div
                  key={order?._id}
                  className="bg-white overflow-hidden border border-gray-200  shadow transition-shadow duration-300"
                >
                  {/* Header Section with gradient */}
                  <div className="bg-gray-400 px-4 py-2 text-white">
                    <div className="flex justify-between items-start flex-wrap gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm opacity-90 mb-1">Order ID</p>
                        <p className="font-mono text-base font-semibold">{order?._id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm opacity-90 mb-1">Order Date</p>
                        <p className="text-base  font-semibold">
                          {dayjs(order?.createdAt).format("MMM DD, YYYY")}
                        </p>
                        <p className="text-xs opacity-75">
                          {dayjs(order?.createdAt).format("h:mm A")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="p-2">
                    {/* Status and Amount Section */}
                    <div className="grid grid-cols-1  gap-4 mb-6">
                      <div className="bg-gray-50 border rounded  p-3 sm:p-4">
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Total Amount</p>
                          <p className="text-sm font-bold text-gray-800">
                            ${order?.total_amount?.toFixed(2) || '0.00'}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Payment Status</p>
                          <Tag color={getPaymentStatusColor(order?.payment_status)}>
                            {order?.payment_status || 'N/A'}
                          </Tag>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Delivery Status</p>
                          <Tag color={getStatusColor(order?.delivery_status)}>
                            {order?.delivery_status || 'N/A'}
                          </Tag>
                        </div>
                        <Button
                          loading={createPaymentLoading}
                          disabled={createPaymentLoading}
                          onPointerDown={() => handlePayment(order?._id)}
                          icon={<MdOutlinePayment />}
                          style={{ width: '100%', marginTop: '1rem' }}
                        >Payment now</Button>
                      </div>
                    </div>

                    {/* Dotted Line Separator */}
                    <div className="relative my-6">
                      <div className="absolute left-0 top-1/2 w-full border-t-2 border-dashed border-gray-300"></div>
                      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 rounded-full"></div>
                      <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 rounded-full"></div>
                    </div>

                    {/* Switch Section - now per order */}
                    <div className="mt-12 flex justify-between items-start border-b pb-2">
                      <span>{`Switch for ${!showDetails ? "Order Items" : "Delivery Information"}`}</span>
                      <Switch
                        checkedChildren="Order Items"
                        unCheckedChildren="Delivery Info"
                        size="default"
                        checked={showDetails}
                        onChange={(value) => handleToggleChange(order?._id, value)}
                      />
                    </div>

                    {/* Items Section */}
                    {showDetails && (
                      <div className="mb-4 sm:mb-6">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Order Items</h3>
                        <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-96 overflow-y-auto pr-1 sm:pr-2">
                          {order?.items?.map((item, idx) => (
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
                                      <span className="bg-white px-2 py-0.5 rounded">{item.variant?.size || 'N/A'}</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <span className="font-medium">Qty:</span>
                                      <span className="bg-white px-2 py-0.5 rounded">{item.quantity || 1}</span>
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
                    )}

                    {/* Delivery Information */}
                    {!showDetails && (
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
                    )}
                  </div>
                </div>
              );
            })}
      </div>

      {/* Pagination */}
      {pagination?.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            total={pagination.totalItems}
            pageSize={pagination.itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}

export default memo(OrdersSection);
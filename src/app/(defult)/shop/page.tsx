// src/app/(defult)/shop/page.tsx
'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Input, Layout, Spin, Button, Drawer, Badge, Result } from 'antd'
import debounce from 'lodash.debounce'
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'
import SectionHeader from '@/app/components/shared/SectionHeader'
import ProductCard from '@/app/components/products/ProductCard'
import { Iproduct } from '@/app/types/product'
import { useGetAllProductQuery } from '@/app/redux/services/productApis'
import { useGetAllCategoryQuery } from '@/app/redux/services/catrgoryApis'
import Image from 'next/image'
import { IMAGE } from '@/app/constants/Image.index'
import { useProfileQuery } from '@/app/redux/services/profileApis'
import FiltersSidebar from '@/components/shop/FiltersSidebar'

const { Content, Sider } = Layout

const Page: React.FC = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const [mobileFilterVisible, setMobileFilterVisible] = useState(false)
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '')
    const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '')
    const [subCategory, setSubCategory] = useState<string>(searchParams.get('subCategory') || '')
    const [wholeSale, setWholeSale] = useState<boolean>(searchParams.get('wholeSale') === 'true')

    const { data: profileData } = useProfileQuery(undefined)
    const { data: productData, isLoading: productLoading } = useGetAllProductQuery({
        search: searchQuery,
        ...(selectedCategory && { category: selectedCategory }),
        ...(subCategory && { sub_category: subCategory }),
        ...(wholeSale && { whole_sale: true }),
        limit: 9999,
    })

    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                const params = new URLSearchParams(searchParams.toString())
                if (value) {
                    params.set('search', value)
                } else {
                    params.delete('search')
                }
                router.push(`${pathname}?${params.toString()}`)
            }, 500),
        [router, pathname, searchParams]
    )

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
        debouncedSearch(value)
    }

    const updateUrlParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString())
        Object.entries(updates).forEach(([key, value]) => {
            if (value) {
                params.set(key, value)
            } else {
                params.delete(key)
            }
        })
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId)
        setSubCategory('')
        updateUrlParams({
            category: categoryId,
            subCategory: null
        })
    }

    const handleSubCategoryChange = (subCategoryId: string) => {
        setSubCategory(subCategoryId)
        updateUrlParams({ subCategory: subCategoryId })
    }

    const handlePriceRangeChange = (range: [number, number]) => {
        setPriceRange(range)
    }

    const handleWholeSaleChange = (value: boolean) => {
        setWholeSale(value)
        updateUrlParams({ wholeSale: value ? 'true' : null })
    }

    const filteredProducts = useMemo(() => {
        if (!productData?.data) return []
        return productData.data.filter((product: Iproduct) => {
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
            const matchesSearch = searchQuery
                ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
                : true
            return matchesPrice && matchesSearch
        })
    }, [productData, priceRange, searchQuery])

    const activeFilterCount = [
        searchQuery,
        selectedCategory,
        subCategory,
        wholeSale,
        priceRange[0] > 0 || priceRange[1] < 10000
    ].filter(Boolean).length

    return (
        <Spin spinning={productLoading}>
            <div className="max-w-screen-2xl border border-[var(--border-color)] mx-auto">
                <SectionHeader title="All Products" className="my-0 p-2" />

                <div className="lg:hidden p-2">
                    <Button
                        type="default"
                        icon={<FilterOutlined />}
                        onClick={() => setMobileFilterVisible(true)}
                        className="w-full flex items-center justify-center"
                    >
                        Filters
                        {activeFilterCount > 0 && (
                            <Badge count={activeFilterCount} className="ml-2" />
                        )}
                    </Button>
                </div>

                <Layout className="bg-white">
                    <Sider
                        width={300}
                        className="hidden lg:block h-full bg-white border-r"
                        theme="light"
                    >
                        <div className="p-4 border-b">
                            <Input
                                prefix={<SearchOutlined />}
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                allowClear
                                size="large"
                            />
                        </div>
                        <FiltersSidebar
                            selectedCategory={selectedCategory}
                            setSelectedCategory={handleCategoryChange}
                            subCategory={subCategory}
                            setSubCategory={handleSubCategoryChange}
                            wholeSale={wholeSale}
                            setWholeSale={handleWholeSaleChange}
                            priceRange={priceRange}
                            setPriceRange={handlePriceRangeChange}
                        />
                    </Sider>

                    <Layout className="bg-white">
                        <Content className="p-4">
                            <div className="mb-4 lg:hidden">
                                <Input
                                    prefix={<SearchOutlined />}
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    allowClear
                                    size="large"
                                />
                            </div>

                            {productLoading ? (
                                <div className="w-full mx-auto grid grid-cols-2 border border-[var(--border-color)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-gray-300">
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <div key={index} className="bg-gray-100 rounded-lg p-4 animate-pulse h-64" />
                                    ))}
                                </div>
                            ) : filteredProducts.length > 0 ? (
                                <div className="w-full mx-auto grid grid-cols-2 border border-[var(--border-color)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-gray-300">
                                    {filteredProducts.map((item: Iproduct) => (
                                        <ProductCard key={item?._id} item={item} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center p-12 text-center">
                                    <Result
                                        status="404"
                                        title="No products found"
                                        subTitle="Try adjusting your search or filter criteria"
                                    />
                                </div>
                            )}
                        </Content>
                    </Layout>
                </Layout>

                <Drawer
                    title={
                        <div className="flex items-center">
                            <span>Filters</span>
                            {activeFilterCount > 0 && (
                                <Badge count={activeFilterCount} className="ml-2" />
                            )}
                        </div>
                    }
                    placement="left"
                    onClose={() => setMobileFilterVisible(false)}
                    open={mobileFilterVisible}
                    width={300}
                >
                    <div className="mb-4">
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            allowClear
                            size="large"
                        />
                    </div>
                    <FiltersSidebar
                        selectedCategory={selectedCategory}
                        setSelectedCategory={handleCategoryChange}
                        subCategory={subCategory}
                        setSubCategory={handleSubCategoryChange}
                        wholeSale={wholeSale}
                        setWholeSale={handleWholeSaleChange}
                        priceRange={priceRange}
                        setPriceRange={handlePriceRangeChange}
                    />
                </Drawer>
            </div>
        </Spin>
    )
}

export default Page
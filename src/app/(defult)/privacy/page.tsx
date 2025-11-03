'use client'
import TopPageCategory from '@/app/components/sections/TopPageCategory'
import SectionHeader from '@/app/components/shared/SectionHeader'
import { useGetPrivacyPolicyQuery } from '@/app/redux/services/privacyPolicyApis'
import React from 'react'

function PrivacyPolicy() {
  const { data, isLoading, isError } = useGetPrivacyPolicyQuery(undefined)
  return (
    <div className='max-w-screen-2xl border-x p-2 border-[var(--border-color)] mx-auto'>
      <TopPageCategory />
      <SectionHeader title='Privacy Policy' className='px-2 my-2' />
      <div className='px-2'>
        {
          isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error fetching privacy policy</div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: data?.data?.desc || '' }} />
          )
        }
      </div>
    </div>
  )
}

export default PrivacyPolicy
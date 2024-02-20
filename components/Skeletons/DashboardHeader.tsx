import React from 'react'
import { Skeleton } from '../ui/skeleton'

function DashboardHeaderSkeleton() {
  return (
  <div className='w-[90%] p-2 flex'>
            {/* img skeleton */}
        <Skeleton className='flex rounded-full h-5 w-5 bg-muted'></Skeleton>
        <div className='flex flex-col ml-1 justify-center'>
        <Skeleton className='flex rounded-full h-2 w-40 bg-muted my-1'></Skeleton>
        <Skeleton className='flex rounded-full h-2 w-20 bg-muted my-1'></Skeleton>
        </div>
  </div>
    
  )
}

export default DashboardHeaderSkeleton
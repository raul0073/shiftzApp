import React from 'react'

function loading() {
  return (
    <div className='w-full flex flex-col items-center justify-center min-h-screen'>
        <span className='loader'></span>
        <p className='text-sm text-muted-foreground'>Loading...</p>
    </div>
  )
}

export default loading
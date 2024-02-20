import Logo from '@/components/root/Logo'
import ThemeSwitcher from '@/components/root/ThemeSwitcher'
import Navbar from '@/components/root/Navbar'
import React, { ReactNode } from 'react'

function Layout({children} : {children: ReactNode}) {
  return (
    <div>
    <nav className='w-full'>
     <Navbar />
    </nav>
    <main>
    {children}
    </main>
    <footer>
    </footer>
    </div>
  )
}

export default Layout
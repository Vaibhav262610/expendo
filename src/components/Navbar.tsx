"use client"
import { UserButton } from '@clerk/nextjs'
import { CheckSquare, Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
    
  return (
    <header className="border-b  backdrop-blur sticky top-0 z-40">
            <div className="container  mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className=" flex items-center justify-center">
                    <Image src="/logo.png" alt="logo" width={40} height={40} />
                </div>
                <h1 className="text-xl font-bold">Expendo</h1>
              </div>
              <div className='flex items-center gap-4'>
                {dark ? (
                  <Sun className='cursor-pointer' onClick={() => setDark(!dark)} />
                ) : (
                  <Moon className='cursor-pointer' onClick={() => setDark(!dark)} />
                )}
                <UserButton afterSignOutUrl="/"  />
              </div>
            </div>
          </header>
  )
}


export default Navbar
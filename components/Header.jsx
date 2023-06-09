import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { getCategories } from '@/services';

const Header = () => {
    const [categories, setCategories] = useState([]);
    
      useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
      }, []);
  return (
    <div className="container mx-auto px-10 mb-8">
        <div className="border-b w-full inline-block border-blue-400 py-8">
            <div className='md:float-left block'>
                <Link href='/'>
                    <span className='cursor-pointer font-bold text-4xl text-black hover:text-orange-500 transition duration-500'>
                        Ken's Blog
                    </span>
                </Link>
            </div>
            <div className='hidden md:float-left md:contents'>
                 {categories.map((category) => (
                    <Link key={categories.slug} href={`category/${category.slug}`}>
                        <span className='md:float-right mt-2 align-middle text-black ml-4 font-semibold hover:text-orange-500 transition duration-500 cursor-pointer'>
                            {category.name}
                        </span>
                    </Link>
                 ))}
            </div>
        </div>
    </div>
  )
}

export default Header
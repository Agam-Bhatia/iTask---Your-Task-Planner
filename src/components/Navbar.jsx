import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-violet-950 text-white'>
        <div className='logo p-2'>
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
        <ul className='flex gap-1  cursor-pointer'>
            <li className='p-2 hover:bg-violet-950'>Home</li>
            <li className='p-2 hover:bg-violet-950'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar

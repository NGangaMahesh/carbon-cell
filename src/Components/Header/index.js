import React from 'react'
import { Link } from 'react-router-dom'
import { TabItems } from './styledComponents'
import { AiOutlineHome } from "react-icons/ai";
import { MdPriceChange } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Header = (props) => {
  console.log(document.location.pathname)
  const path = document.location.pathname

  return (
    <nav className='bg-stone-900 flex md:w-2/12 md:h-screen flex-col text-white px-2 py-7 rounded-r-md rounded-br-md'>
      <div>
        <img className='md:w-38 h-12' src="https://carboncell.io/assets/img/logo2.png" alt="website logo" />
      </div>
      <ul className='mt-24 text-white'>
        <Link to="/">
          <TabItems isActive={path === '/'}>
            <AiOutlineHome className='mr-4' /> Home
          </TabItems>
        </Link>
        <Link to="/prices">
          <TabItems isActive={path === '/prices'}>
            <MdPriceChange className='mr-4' /> Price
          </TabItems>
        </Link>
        <Link to="/about">
          <TabItems isActive={path === '/about'}>
            <IoMdInformationCircleOutline className='mr-4' /> About
          </TabItems>
        </Link>
      </ul>
      <ul className='mt-auto flex flex-row md:w-7/12 justify-between items-center'>
        <li><img className='h-10 hover:h-11' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" alt="media icons" /></li>
        <li><img className='h-10 hover:h-11' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" alt="media icons" /></li>
        <li><img className='h-10 hover:h-11' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" alt="media icons" /></li>
      </ul>
      <p className='mt-3 font-serif text-amber-200'>Empower Your Portfolio, Embrace Crypto Excellence</p>
    </nav>
  )
}

export default Header
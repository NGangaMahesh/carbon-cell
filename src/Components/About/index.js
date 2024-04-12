import React from 'react'
import Header from '../Header'

const About = () => {
  return (
    <div className='bg-black md:flex w-full'>
        <Header />
        <div className='w-full h-screen text-center text-white flex justify-center items-center flex-col px-8'>
            <h1 className='bg-gradient-to-r from-green-500 to-yellow-400 inline-block text-transparent bg-clip-text text-6xl'>Work with US</h1>
            <p className='font-bold text-xl mt-8'>We actively are on a lookout for geniuses in tech, marketing and research. If you are looking to contribute to the next revolution in
decentralized finance, apply below to join our team.</p>
        </div>
      </div>
  )
}

export default About

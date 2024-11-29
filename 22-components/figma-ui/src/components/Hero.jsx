import React from 'react'
import img from '../assets/illustration.png'

const Hero = () => {
  return (
    <div className='container mx-auto p-4'>
      <div className='flex mt-10 h-[719px]'>
        <div className='items-center justify-center flex flex-col'>
          <div className='md:w-1/2 space-y-4'>
            <h1 className='text-4xl font-bold leading-tight'>Virtual healthcare
              for you</h1>
            <p>Trafalgar provides progressive, and affordable
              healthcare, accessible on mobile and online
              for everyone</p>
            <button className='bg-blue-500 rounded-full text-white px-4 py-3'>Consult Today</button>
          </div>
        </div>
        <div className='flex justify-center md:w-1/2 p-4'>
          <img src={img} alt="img" 
          className='w-full h-auto object-contain'/>
        </div>
      </div>
    </div>
  )
}

export default Hero
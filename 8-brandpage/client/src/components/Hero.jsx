import React from 'react'
import amazon from '../assets/amazon.png'
import flipkart from '../assets/flipkart.png'
import HeroImage from '../assets/shoe_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-content'>
        <h1>YOUR FEET
          DESERVE
          THE BEST</h1>
        <p>YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR SHOES.YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR SHOES.</p>

        <div className='hero-buttons'>
          <button>Shop Now</button>
          <button>Catefory</button>
        </div>
        <div className='shopping'>
          <p>Also Available On</p>
        </div>
        <div className='brand-icon'>
          <img src={flipkart} alt="Amazon" />
          <img src={amazon} alt="Flipkart" />
        </div>
      </div>

      <div className='hero-image'>
        <img src={HeroImage} alt="Shoe" />
      </div>
    </div>
  )
}

export default Hero
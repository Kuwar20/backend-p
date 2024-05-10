import React from 'react'
import { Link } from 'react-scroll'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'

const About = () => {
    return (
        <section className='about' id='about'>
            <div className="container">
                <div className="banner">
                    <div className="top">
                        <h1 className='heading'>ABOUT US</h1>
                        <p>The only thing we are serious about is food</p>
                    </div>
                    <p className="mid">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati dignissimos quas ad impedit. Dicta magni non ut optio, quisquam voluptatum mollitia ad ratione quo hic voluptate, doloribus a nostrum aperiam.
                    </p>
                    <Link to={"/"}>Explore Menu <span><HiOutlineArrowNarrowRight /></span></Link>
                </div>
                <div className="banner">
                    <img src="/about.png" alt="about" />
                </div>
            </div>
        </section>
    )
}

export default About
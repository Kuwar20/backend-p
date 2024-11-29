import React from 'react'
import Hero from './components/Hero'
import NavList from './components/NavList'
import Services from './components/Services'
import GridItems from './components/GridItems'

const App = () => {
  return (
    <div>
      <NavList/>
      <Hero />
      <Services />
      <GridItems />
    </div>
  )
}

export default App
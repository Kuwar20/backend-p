import React from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import GridItems from './components/GridItems'
import Layout from './layout/Layout'

const App = () => {
  return (
    <div>
      <Layout>
      <Hero />
      <Services />
      <GridItems />
      </Layout>
    </div>
  )
}

export default App
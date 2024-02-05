import React from 'react'
import './Page1.css'
import Form from '../../components/Form/Form'

const Page1 = () => {
  return (
    <div>
      <p className='content'>Page1 - We use Form Component on this page</p>
      <div>
        <Form />
      </div>
    </div>
  )
}

export default Page1
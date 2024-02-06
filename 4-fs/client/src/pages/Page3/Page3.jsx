import React from 'react'
import './Page3.css'
import Form from '../../components/Form/Form'
import FormSearch2 from '../../components/FormSearch2/FormSearch2'

const Page3 = () => {
  return (
    <div>
      <div className='content2'>
        <p>This is also a page - Page 3</p>
        <p>Form component is also used here only UI</p>
      </div>
      <FormSearch2/>
      <br />
      <Form />
    </div>
  )
}

export default Page3
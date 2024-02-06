import React from 'react'
import './Page2.css'
import Form from '../../components/Form/Form'
import FormSearch from '../../components/FormSearch/FormSearch'

const Page2 = () => {
  return (
    <div>
      <div className='content1'>
        <p>This is also a page - Page 2</p>
        <p>Form component is also used here but only UI</p>
      </div>
      <FormSearch/>
      <br />
      <Form />
    </div>

  )
}

export default Page2
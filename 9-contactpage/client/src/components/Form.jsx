import React from 'react'
import './Form.css'
import Formbutton from './Formbutton'

const Form = () => {
    return (
        <div className='form'>
            <div className='button'>
                <button>
                    <Formbutton/>
                    VIA SUPPORT CHAT</button>
                <button>VIA CALL</button>
            </div>
            
            <div>
                <button>VIA EMAIL FORM</button>
            </div>
        </div>
    )
}

export default Form
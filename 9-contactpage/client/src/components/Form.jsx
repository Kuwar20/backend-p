import React from 'react'
import './Form.css'
import Formbutton from './Formbutton'
import { MdEmail, MdMessage } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa';

const Form = () => {
    return (
        <div className='form'>
            <div className='button'>
                <div className='top-button'>
                    <Formbutton
                        text="VIA SUPPORT CHAT"
                        color="blue"
                        icon={<MdMessage />}
                    />
                    <Formbutton
                        text="VIA EMAIL FORM"
                        color="green"
                        icon={<MdEmail />}
                    />
                </div>
            </div>
                <div className='outline-button'>
                    <Formbutton
                        text="CALL US"
                        color="blue"
                        icon={<FaPhoneAlt />}
                    />
                </div>
        </div>
    )
}

export default Form
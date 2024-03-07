import React from 'react'
import './Formbutton.css'
import { MdEmail, MdMessage } from 'react-icons/md'

const Formbutton = (props) => {
    console.log(props);
    return (
        <div>
            <div className='primary-button'>
                {props.icon}{props.text}
            </div>
        </div>
    )
}

export default Formbutton
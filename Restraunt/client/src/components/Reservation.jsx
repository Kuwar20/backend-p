import React from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Reservation = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(0);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const navigate = useNavigate();

    const handleReservation = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:4000/api/v1/reservation/send', {
                firstName,
                lastName,
                email,
                phone,
                date,
                time
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            toast.success(data.message);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone(0);
            setDate('');
            setTime('');
            navigate('/success');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <section className='reservation' id='reservation'>
            <div className="container">
                <div className="banner">
                    <img src="./reservation.png" alt="res" />
                </div>
                <div className="banner">
                    <div className="reservation_form_box">
                        <h1>MAKE A RESERVATION</h1>
                        <p>For Further Questions, Please Call</p>
                        <form>
                            <div>
                                <input type="text"
                                    placeholder='First Name'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <input type="text"
                                    placeholder='Last Name'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div>
                                <input type="date"
                                    placeholder='Date'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <input type="time"
                                    placeholder='Time'
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                            <div>
                                <input type="email"
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input type="number"
                                    placeholder='Phone'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <button type='submit' onClick={handleReservation}>Reserve Now
                                    <span><HiOutlineArrowRight /></span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Reservation
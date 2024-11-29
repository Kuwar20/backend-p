import React from 'react'

const GridItems = () => {

    const items = [
        {
            id: 1,
            image: 'https://via.placeholder.com/150',
            title: 'Appointment',
            description: 'Schedule your appointment with our trusted doctors with a simple step',
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/150',
            title: 'Online Pharmacy',
            description: 'Buy your medicines with our mobile application with a simple delivery system',
        },
        {
            id: 3,
            image: 'https://via.placeholder.com/150',
            title: 'Consultation',
            description: 'Free consultation with our trusted doctors and get the best recomendations',
        },
        {
            id: 4,
            image: 'https://via.placeholder.com/150',
            title: 'Details Info',
            description: 'Free consultation with our trusted doctors and get the best recomendations',
        },
        {
            id: 5,
            image: 'https://via.placeholder.com/150',
            title: 'Emergency Care',
            description: 'You can get 24/7 urgent care for yourself or your children and your lovely family',
        },
        {
            id: 6,
            image: 'https://via.placeholder.com/150',
            title: 'Tracking',
            description: 'Track and save your medical history and health data ',
        },
    ]

    return (
        <div className='flex justify-center mt-10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl p-2' >
                {
                    items.map((item) => (
                        <div key={item.id}
                            className='h-50 border flex flex-col items-start justify-center p-4 space-y-2'
                        >
                            <img src={item.image} alt={item.description} />
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GridItems
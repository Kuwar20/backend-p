import { useState } from 'react';

function Toggle() {
    const [isVisible, setIsVisible] = useState(true);

    const toggleParagraph = () => {
        setIsVisible((prevState) => !prevState);
    };

    const ToggleableParagraph = ({ position }) => (
        <div className={`bg-gray-200 absolute ${position} flex flex-col items-center justify-center font-semibold`}>
            {isVisible && (
                <p className='mb-4'>This is the paragraph you can toggle.</p>
            )}
            <button
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
                onClick={toggleParagraph}>
                Toggle Paragraph
            </button>
        </div>
    );

    return (
        <>
            {/* Center */}
            <ToggleableParagraph position="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

            {/* Top Left */}
            {/* <ToggleableParagraph position="top-0 left-0" /> */}

            {/* Top Right */}
            {/* <ToggleableParagraph position="top-0 right-0" /> */}

            {/* Bottom Left */}
            {/* <ToggleableParagraph position="bottom-0 left-0" /> */}

            {/* Bottom Right */}
            {/* <ToggleableParagraph position="bottom-0 right-0" /> */}
            
            
        </>
    );
}

export default Toggle;


// import { useState } from 'react'

// function Toggle() {
//     const [isvisible, setIsvisible] = useState(true)
//     const toggleParagarh = () => {
//         setIsvisible((prevState) => !prevState)
//     }

//     return (
//         <>
//             {/* Center */}
//             <div className='bg-gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'> {/* absolute for width of container , flex make all the element in single line, to make it one by one in column use flex-col */}
//                 {isvisible && (
//                     <p className='mb-4'>This is the paragraph you can toggle.</p>
//                 )}

//                 <button
//                     className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
//                     onClick={toggleParagarh}>
//                     Toggle Paragraph
//                 </button>
//             </div>
            
//             {/* Top Left */}
//             <div className='bg-gray-200 absolute top-0 left-0 flex flex-col items-center justify-center'> {/* absolute for width of container , flex make all the element in single line, to make it one by one in column use flex-col */}
//                 {isvisible && (
//                     <p className='mb-4'>This is the paragraph you can toggle.</p>
//                 )}

//                 <button
//                     className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
//                     onClick={toggleParagarh}>
//                     Toggle Paragraph
//                 </button>
//             </div>

//             {/* Top Right */}
//             <div className='bg-gray-200 absolute top-0 right-0 flex flex-col items-center justify-center'> {/* absolute for width of container , flex make all the element in single line, to make it one by one in column use flex-col */}
//                 {isvisible && (
//                     <p className='mb-4'>This is the paragraph you can toggle.</p>
//                 )}

//                 <button
//                     className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
//                     onClick={toggleParagarh}>
//                     Toggle Paragraph
//                 </button>
//             </div>

//             {/* Bottom Left */}
//             <div className='bg-gray-200 absolute bottom-0 left-0 flex flex-col items-center justify-center'> {/* absolute for width of container , flex make all the element in single line, to make it one by one in column use flex-col */}
//                 {isvisible && (
//                     <p className='mb-4'>This is the paragraph you can toggle.</p>
//                 )}

//                 <button
//                     className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
//                     onClick={toggleParagarh}>
//                     Toggle Paragraph
//                 </button>
//             </div>

//             {/* Bottom Right */}
//             <div className='bg-gray-200 absolute bottom-0 right-0 flex flex-col items-center justify-center'> {/* absolute for width of container , flex make all the element in single line, to make it one by one in column use flex-col */}
//                 {isvisible && (
//                     <p className='mb-4'>This is the paragraph you can toggle.</p>
//                 )}

//                 <button
//                     className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
//                     onClick={toggleParagarh}>
//                     Toggle Paragraph
//                 </button>
//             </div>
//         </>
//     )
// }

// export default Toggle

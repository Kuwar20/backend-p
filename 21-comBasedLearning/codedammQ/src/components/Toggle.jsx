import { useState } from 'react'

function Toggle() {
	const [isvisible, setIsvisible] = useState(true)
	const toggleParagarh = () => {
		setIsvisible((prevState) => !prevState)
	}

	return (
		<div className='bg-gray-200 absolute flex flex-col items-center justify-center'> {/* absolute for width of container , flex make all the element in single line, to make it one by one in column use flex-col */}
			{isvisible && (
				<p className='mb-4'>This is the paragraph you can toggle.</p>
			)}

			<button 
            className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
            onClick={toggleParagarh}>
				Toggle Paragraph
			</button>
		</div>
	)
}

export default Toggle

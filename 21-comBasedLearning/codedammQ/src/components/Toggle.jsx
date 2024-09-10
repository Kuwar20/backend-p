import { useState } from 'react'

function Toggle() {
	const [isvisible, setIsvisible] = useState(true)
	const toggleParagarh = () => {
		setIsvisible((prevState) => !prevState)
	}

	return (
		<div>
			{isvisible && (
				<p id="my-paragraph">This is the paragraph you can toggle.</p>
			)}

			<button id="toggle-btn" onClick={toggleParagarh}>
				Toggle Paragraph
			</button>
		</div>
	)
}

export default Toggle

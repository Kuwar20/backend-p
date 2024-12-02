import React from 'react'
import Notes2 from './components/Notes2'
import MultiSelectDropdown from './components/Dropdown2'

const App = () => {
  return (
    <div>
      <MultiSelectDropdown apiUrl={'https://jsonplaceholder.typicode.com/users'} />
      {/* <Notes2 /> */}
    </div>
  )
}

export default App
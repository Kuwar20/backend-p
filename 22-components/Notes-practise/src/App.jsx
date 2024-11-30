import React from 'react'
import Notes2 from './components/Notes2'
import MultiSelectDropdown from './components/Dropdown1'

const App = () => {
  return (
    <div>
      <Notes2 />
      <MultiSelectDropdown apiUrl={'https://jsonplaceholder.typicode.com/users'} />
    </div>
  )
}

export default App
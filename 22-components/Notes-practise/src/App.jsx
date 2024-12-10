import React from 'react'
import Notes2 from './components/Notes2'
import MultiSelectDropdown from './components/Dropdown2'
import BeautifulDragDrop from './components/DragDrop'

const App = () => {
  return (
    <div>
      <MultiSelectDropdown apiUrl={'https://jsonplaceholder.typicode.com/users'} />
      <BeautifulDragDrop />
      <Notes2 />
    </div>
  )
}

export default App
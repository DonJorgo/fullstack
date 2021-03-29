import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const newNameExists = () =>
    persons.some(({ name }) => name === newName)


  const addName = (event) => {
    event.preventDefault()
    if (!newNameExists()) {
      const personsObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personsObject))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
          <div>
            number:
            <input
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(({ name, number }) =>
        <div key={name}>{name} {number}</div>
      )}

    </div>
  )
}

export default App

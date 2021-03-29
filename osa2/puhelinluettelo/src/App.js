import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterString.toLowerCase())
  )

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }

  const handlePersonSubmit = (event) => {
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

  const newNameExists = () =>
    persons.some(({ name }) => name === newName)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        value={filterString}
        onChange={handleFilterChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        name={newName}
        number={newNumber}
        onSubmit={handlePersonSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} />

    </div>
  )
}

export default App

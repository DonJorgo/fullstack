import React, { useState, useEffect } from 'react'

import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
      personService
      .create(personsObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
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

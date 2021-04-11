import React, { useState, useEffect } from 'react'

import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [notification, setNotification] = useState(null)

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


  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleFilterChange = event => {
    setFilterString(event.target.value)
  }


  const handlePersonSubmit = event => {

    const newNameExists = () =>
      persons.some(({ name }) => name === newName)

    const createPerson = () => {
      personService
        .create({
          name: newName,
          number: newNumber
        })
        .then(returnedPerson => {
          notify(`Added ${returnedPerson.name}`)
          setPersons(persons.concat(returnedPerson))
        })
    }

    const updatePerson = () => {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }
      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          notify(`${returnedPerson.name} number changed from ${person.number} to ${returnedPerson.number}`)
          setPersons(persons.map(p =>
            p.id !== person.id ? p : returnedPerson)
          )
        })
    }

    event.preventDefault()
    if (!newNameExists()) {
      createPerson()
    } else {
      const question = `${newName} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(question)) {
        updatePerson()
      }
    }
  }


  const handleNameChange = event => {
    setNewName(event.target.value)
  }


  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }


  const handleRemove = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person)
        .then(() => {
          notify(`${person.name} removed succesfully`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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

      <Persons persons={personsToShow} onRemove={handleRemove} />

    </div>
  )
}

export default App

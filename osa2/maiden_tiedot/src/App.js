import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(filterString.toLowerCase())
  )

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }

  return (
    <div>
      <Filter value={filterString} onChange={handleFilterChange} />
      <Countries countries={countriesToShow} />
    </div>

  )
}

export default App;

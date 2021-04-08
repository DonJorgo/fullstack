import React from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
    if (countries.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    } else if (countries.length === 1) {
      return (
        <Country country={countries[0]} />
      )
    } else {
      return (
        <div>
          {countries.map(country =>
            <div key={country.name}>{country.name}</div>
          )}
        </div>
      )
    }
  }

  export default Countries
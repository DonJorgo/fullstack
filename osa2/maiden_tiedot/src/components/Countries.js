import React from 'react'
import Country from './Country'


const CountryList = ({ countries, onSelect }) =>
    <div>
        {countries.map(country =>
            <div key={country.name}>
                {country.name}
                <button
                    onClick={onSelect}
                    value={country.name}>
                    show
                </button>
            </div>
        )}
    </div>

const Countries = ({ countries, onSelect }) => {
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
            <CountryList
                countries={countries}
                onSelect={onSelect}
            />
        )
    }
}

export default Countries
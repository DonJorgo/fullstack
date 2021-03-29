import React from 'react'

const Persons = ({ persons }) =>
    <div>
        {persons.map(({ name, number }) =>
            <div key={name}>{name} {number}</div>
        )}
    </div>

export default Persons
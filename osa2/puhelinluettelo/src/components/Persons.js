import React from 'react'

const Persons = ({ persons, onRemove }) =>
    <div>
        {persons.map(({ name, number, id }) =>
            <div key={name}>
                {name} {number}
                <button onClick={() => onRemove({ name, id })}>
                    delete
                </button>
            </div>

        )}
    </div>

export default Persons
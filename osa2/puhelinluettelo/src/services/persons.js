import axios from 'axios'

const baseUrl = '/api/persons'


const response = request => request.then(res => res.data)


const getAll = () =>
    response(axios.get(baseUrl))

const create = newPerson =>
    response(axios.post(baseUrl, newPerson))

const remove = person =>
    axios.delete(`${baseUrl}/${person.id}`)

const update = (id, updatedPerson) =>
    response(axios.put(`${baseUrl}/${id}`, updatedPerson))


const personService = { getAll, create, remove, update }
export default personService
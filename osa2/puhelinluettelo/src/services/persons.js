import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'


const response = request => request.then(res => res.data)


const getAll = () =>
    response(axios.get(baseUrl))

const create = newPerson =>
    response(axios.post(baseUrl, newPerson))

const remove = person =>
    axios.delete(`${baseUrl}/${person.id}`)

const update = (id, updatedPerson) =>
    response(axios.put(`${baseUrl}/${id}`, updatedPerson))


export default { getAll, create, remove, update }
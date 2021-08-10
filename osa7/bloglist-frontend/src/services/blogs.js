import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, blogObject) => {
  const blog = {
    user: blogObject.user.id,
    likes: blogObject.likes,
    author: blogObject.author,
    title: blogObject.title,
    url: blogObject.url
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const exports = { getAll, create, update, remove, setToken }

export default exports
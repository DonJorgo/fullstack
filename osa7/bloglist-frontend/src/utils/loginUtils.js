import blogService from '../services/blogs'

const LOCAL_STORAGE_KEY = 'loggedBlogappUser'

const getLoggedUser = () => {
  const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  return loggedUserJSON ? JSON.parse(loggedUserJSON) : loggedUserJSON
}

const login = (user) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_KEY, JSON.stringify(user)
  )
  blogService.setToken(user.token)
}

const logout = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY)
  blogService.setToken(null)
}

export default { getLoggedUser, login, logout }
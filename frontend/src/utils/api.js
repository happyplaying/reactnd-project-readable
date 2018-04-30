const api = "http://localhost:3001"
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const post = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())

export const categories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const posts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())
export const addPost = data =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      Authorization: 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())
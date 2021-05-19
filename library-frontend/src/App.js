
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery } from '@apollo/client'
import { GET_USER } from './queries'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const client = useApolloClient()
  const userQuery = useQuery(GET_USER)

  useEffect(() => {
    if (userQuery.data) {
      setUser(userQuery.data.me)
    }
  }, [userQuery.data])

  const logoutHandler = () => {
    setUser(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {(user !== null)
          ? <span>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommendations</button>
              <button onClick={logoutHandler}>logout</button>
            </span>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        user={user}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        user={user}
        setUser={setUser}
      />

      <Recommendations
        show={page === 'recommend'}
        user={user}
      />

    </div>
  )
}

export default App
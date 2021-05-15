  
import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import EditAuthorForm from '../components/EditAuthorForm'

const Authors = (props) => {
  const queryResult = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (queryResult.loading) {
    return <div>loading...</div>
  }

  const authors = queryResult.data ? queryResult.data.allAuthors : []

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {authors.length ? <EditAuthorForm authors={authors} /> : null}
    </div>
  )
}

export default Authors

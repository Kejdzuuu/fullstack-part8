import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const queryResult = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  if (queryResult.loading) {
    return <div>loading...</div>
  }

  const books = queryResult.data ? queryResult.data.allBooks : []
  const filteredBooks = genre ? books.filter(book => book.genres.includes(genre)) : books
  let genres = []
  
  for (const book of books) {
    for (const genre of book.genres) {
      if (!genres.includes(genre)) {
        genres = genres.concat(genre)
      }
    }
  }

  return (
    <div>
      <h2>books</h2>
      {(genre !== null)
        ? <span>in genre <b>{genre}</b></span>
        : <span>all genres</span>
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <span>
        {genres.map((genre, index) =>
          <button key={index} onClick={() => setGenre(genre)}>{genre}</button>
        )}
        <button onClick={() => setGenre(null)}>all genres</button>
      </span>
    </div>
  )
}

export default Books
import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthorForm = ({authors}) => {
  const [author, setAuthor] = useState(authors[0].name)
  const [year, setYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({ variables: { name: author, setBornTo: year } })

    setYear('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          author
          <select onChange={({ target }) => setAuthor(target.value)}>
            {authors.map((author, index) =>
              <option key={index} value={author.name}>{author.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={year}
            onChange={({ target }) => setYear(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthorForm

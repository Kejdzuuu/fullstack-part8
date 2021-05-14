import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthorForm = () => {
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({ variables: { name: author, setBornTo: year } })

    setAuthor('')
    setYear('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
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

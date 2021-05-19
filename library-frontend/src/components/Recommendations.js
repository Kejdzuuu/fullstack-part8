import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries' 

const Recommendations = ({ show, user }) => {
  const recommendationsQuery = useQuery(ALL_BOOKS, { variables: { genre: user ? user.favoriteGenre : null } })
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    if (recommendationsQuery.data) {
      setRecommendations(recommendationsQuery.data.allBooks)
    }
  }, [recommendationsQuery.data])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{user.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              <b>author</b>
            </th>
            <th>
              <b>published</b>
            </th>
          </tr>
          {recommendations.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations

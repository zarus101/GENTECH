import React from 'react'
import { useParams } from 'react-router-dom'

const SingleArtist = () => {

    const {id}= useParams();
  return (
    <div>this is single artist {id}</div>
  )
}

export default SingleArtist
import React from 'react'
import { useParams } from 'react-router-dom'

const Messages = () => {

  const params = useParams();
  console.log("params", params);

  return (
    <div>
      Messages
      Messages
    </div>
  )
}

export default Messages

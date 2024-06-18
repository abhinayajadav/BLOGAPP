import React from 'react'
import { useRouteError } from 'react-router-dom'
function Errorpage() {
  let routingError =useRouteError()
  return (
    <div>
        <h2 className='text-center text-black fs-4 m-4'> {routingError.status}--{routingError.data}</h2>
    </div>
  )
}

export default Errorpage
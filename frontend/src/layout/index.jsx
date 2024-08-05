import React from 'react'

const AuthLayouts = ({children}) => {
  return (
    <>
          <header className='flex justify-center items-center py-5 h-20 shadow-lg bg-white'>
            <h1 className='text-5xl font-semibold'>Chat App</h1>
          </header>
          {children}
    </>
  )
}

export default AuthLayouts

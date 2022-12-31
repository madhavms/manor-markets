import React, { useState } from 'react'

const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true' || false)
  
  const login = () => {
    if(!isLoggedIn) 
    {
        setIsLoggedIn(true)
        localStorage.setItem('isLoggedIn', true)
    }
  }

  const logout = () => {
    if(isLoggedIn) 
    {
        setIsLoggedIn(false)
        localStorage.setItem('isLoggedIn', false)
    }
  }
  
  return {isLoggedIn, login, logout}
}

export default useAuthentication
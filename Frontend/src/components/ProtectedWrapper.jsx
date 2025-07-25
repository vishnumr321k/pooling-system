import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedWrapper = ({children}) => {
    const {token} = useContext(AuthContext);

    if(!token){
        return <Navigate to='/login' replace />
    }

  return (
    children
  )
}

export default ProtectedWrapper
import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const RequierePermiso = ({permiso, children}) => {
    const {tienePermiso, cargando} = useAuth()

    if (cargando) return <></>;

    if(!tienePermiso(permiso)) return <Navigate to="/"/>
    
    return children;
  
}

export default RequierePermiso
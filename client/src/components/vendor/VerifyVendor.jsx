import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const VerifyVendor = () => {
    const vendor = useSelector(state => state.vendor)
    return vendor ?  <Outlet /> : <Navigate to="/vendor/login" />
}

export default VerifyVendor
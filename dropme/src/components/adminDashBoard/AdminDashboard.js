import React from 'react'
import { Outlet } from 'react-router';

const AdminDashboard = () => {
    return (
        <>
            <div>AdminDashboard</div>
            <Outlet />
        </>
    )
}

export default AdminDashboard
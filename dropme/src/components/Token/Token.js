import React from 'react'
import { Outlet } from 'react-router';

const Token = () => {
    return (
        <>
            <div>Token</div>
            <Outlet />
        </>
    )
}

export default Token
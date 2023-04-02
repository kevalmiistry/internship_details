import React, { FC } from 'react'
import Navbar from './Navbar'

type TProp = {}
const Profile: FC<TProp> = () => {
    return (
        <>
            <Navbar />
            <h1>Profile</h1>
        </>
    )
}

export default Profile

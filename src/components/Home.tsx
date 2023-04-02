import { signOut } from 'firebase/auth'
import { FC, useState } from 'react'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { getUserState } from '../contexts/UserContext'
import Navbar from './Navbar'

type TProp = {}
const Home: FC<TProp> = () => {
    const { userData, setUserData } = getUserState()
    const navigate = useNavigate()

    return (
        <>
            <Navbar />
            <div className="container">
                <h1>Hi {userData?.name}</h1>
            </div>
        </>
    )
}

export default Home

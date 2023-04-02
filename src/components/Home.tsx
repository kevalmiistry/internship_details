import { signOut } from 'firebase/auth'
import { FC, useState } from 'react'
import { auth } from '../config/auth'
import { useNavigate } from 'react-router-dom'
import { getUserState } from '../contexts/UserContext'

type TProp = {}
const Home: FC<TProp> = () => {
    const { setUserData } = getUserState()
    const navigate = useNavigate()

    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true)
            signOut(auth).then(() => {
                localStorage.removeItem('g-user')
                setUserData(null)
                navigate('/auth')
                setIsLoggingOut(false)
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container">
            Home
            <br />
            <br />
            <br />
            <br />
            <button onClick={handleLogout} disabled={isLoggingOut}>
                {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    )
}

export default Home

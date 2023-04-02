import { FC } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { getUserState } from '../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { IoMdLogOut } from 'react-icons/io'

type TProp = {}
const Navbar: FC<TProp> = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { setUserData } = getUserState()

    const handleLogout = async () => {
        try {
            signOut(auth).then(() => {
                localStorage.removeItem('g-user')
                setUserData(null)
                navigate('/auth')
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="navbar">
            <Link to="/" className={pathname === '/' ? 'active' : ''}>
                Home
            </Link>
            <Link
                to="/profile"
                className={pathname === '/profile' ? 'active' : ''}
            >
                Profile
            </Link>
            <button className="logout" onClick={handleLogout}>
                <IoMdLogOut />
            </button>
        </div>
    )
}

export default Navbar

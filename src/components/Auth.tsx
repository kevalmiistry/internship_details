import { FC, useEffect } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../config/auth'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { getUserState } from '../contexts/UserContext'

type TProp = {}
const Auth: FC<TProp> = () => {
    const { setUserData } = getUserState()
    const navigate = useNavigate()
    const handleLogin = async () => {
        const result = await signInWithPopup(auth, provider)
        if (result) {
            setUserData({
                name: result.user.displayName,
                photoURL: result.user.photoURL,
                email: result.user.email,
                uid: result.user.uid,
            })
            localStorage.setItem(
                'g-user',
                JSON.stringify({
                    name: result.user.displayName,
                    photoURL: result.user.photoURL,
                    email: result.user.email,
                    uid: result.user.uid,
                })
            )
            navigate('/')
        }
    }
    useEffect(() => {
        const localUser = localStorage.getItem('g-user')
        if (localUser) {
            navigate('/')
        }
    }, [])

    return (
        <div className="container flex-center">
            <button className="flex-center" onClick={handleLogin}>
                <FcGoogle />
                &nbsp; Login with Google
            </button>
        </div>
    )
}

export default Auth

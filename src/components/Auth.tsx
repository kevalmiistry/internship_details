import { FC, useEffect } from 'react'
import { auth, db, provider } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { getUserState } from '../contexts/UserContext'
import { signInWithPopup } from 'firebase/auth'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'

type TProp = {}
const Auth: FC<TProp> = () => {
    const { setUserData } = getUserState()
    const navigate = useNavigate()

    const handleLogin = async () => {
        const result = await signInWithPopup(auth, provider)

        const usersRef = collection(db, 'users')
        const queryRef = query(usersRef, where('uid', '==', result.user.uid))

        const querySnapshot = await getDocs(queryRef)

        const arr = querySnapshot?.docs?.map((doc) => ({ ...doc.data() }))

        if (arr.length <= 0) {
            await addDoc(usersRef, {
                uid: result.user.uid,
                name: result.user.displayName,
                profile_pic: result.user.photoURL,
                email: result.user.email,
                internship: false,
            })
        }

        if (result) {
            setUserData({
                uid: result.user.uid,
                name: result.user.displayName,
                profile_pic: result.user.photoURL,
                email: result.user.email,
                internship: arr[0].internship,
            })
            localStorage.setItem(
                'g-user',
                JSON.stringify({
                    name: result.user.displayName,
                    photoURL: result.user.photoURL,
                    email: result.user.email,
                    uid: result.user.uid,
                    internship: arr[0].internship,
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
            <div>
                <p
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: '500',
                        marginBottom: '1rem',
                    }}
                >
                    Login kar loude 😃👇
                </p>
                <button className="flex-center" onClick={handleLogin}>
                    <FcGoogle />
                    &nbsp; Login with Google
                </button>
            </div>
        </div>
    )
}

export default Auth

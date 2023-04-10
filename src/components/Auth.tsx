import { FC, useEffect } from 'react'
import { auth, db, provider } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { getUserState } from '../contexts/UserContext'
import { signInWithPopup } from 'firebase/auth'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import S from './Auth.module.css'

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
                internship: arr.length > 0 ? arr[0].internship : false,
            })
            localStorage.setItem(
                'g-user',
                JSON.stringify({
                    name: result.user.displayName,
                    photoURL: result.user.photoURL,
                    email: result.user.email,
                    uid: result.user.uid,
                    internship: arr.length > 0 ? arr[0].internship : false,
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
        <div className={S.auth_page}>
            <div className={`${S.circle} ${S.c1}`} style={{ bottom: 0 }} />
            <div className={`${S.circle} ${S.c2}`} />
            <div className={S.overlay} />
            <div className="container flex-center">
                <div className={S.auth_card}>
                    <p
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            color: '#333',
                        }}
                    >
                        Login kar Laude 😃👇
                    </p>
                    <button className="flex-center" onClick={handleLogin}>
                        <FcGoogle />
                        &nbsp; Login with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Auth

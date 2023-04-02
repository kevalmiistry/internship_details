import { FC, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserState } from '../contexts/UserContext'

type TProp = {
    children: ReactNode
}
const PrivateRoute: FC<TProp> = ({ children }) => {
    const navigate = useNavigate()
    const { setUserData } = getUserState()

    useEffect(() => {
        const localUser = localStorage.getItem('g-user')
        if (localUser) {
            setUserData(JSON.parse(localUser))
            navigate('/')
        } else {
            navigate('/auth')
        }
    }, [])

    return <>{children}</>
}

export default PrivateRoute

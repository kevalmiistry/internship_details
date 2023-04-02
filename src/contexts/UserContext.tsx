import { signOut } from 'firebase/auth'
import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { auth } from '../config/auth'

type TUserContext = {
    userData: TUserData | null
    setUserData: React.Dispatch<React.SetStateAction<TUserData | null>>
    firebaseLogout: () => void
}

type TUserData = {
    name: string | null
    photoURL: string | null
    email: string | null
    uid: string
}
const UserContext = createContext<TUserContext>({} as TUserContext)

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<TUserData | null>(null)

    const firebaseLogout = async () => {
        await signOut(auth)
    }

    const values = { userData, setUserData, firebaseLogout }
    return (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    )
}

export function getUserState() {
    return useContext(UserContext)
}

import { signOut } from 'firebase/auth'
import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { auth } from '../config/firebase'

type TUserContext = {
    userData: TUserData | null
    setUserData: React.Dispatch<React.SetStateAction<TUserData | null>>
    intershipData: TInternshipData[]
    setIntershipData: React.Dispatch<React.SetStateAction<TInternshipData[]>>
}

const UserContext = createContext<TUserContext>({} as TUserContext)

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<TUserData | null>(null)
    const [intershipData, setIntershipData] = useState<TInternshipData[]>([])

    const values = {
        userData,
        setUserData,
        intershipData,
        setIntershipData,
    }
    return (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    )
}

export function getUserState() {
    return useContext(UserContext)
}

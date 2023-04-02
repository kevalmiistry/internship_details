import { FC } from 'react'
import { auth, provider } from './config/firebase'
import { getIdTokenResult, signOut } from 'firebase/auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './components/Auth'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home'
import { UserProvider } from './contexts/UserContext'
import Profile from './components/Profile'

type TProp = {}
const App: FC<TProp> = () => {
    const handleGetDetails = async () => {
        const user = auth.currentUser
        if (user) {
            try {
                const idTokenResult = await getIdTokenResult(user)
                const { email, name, picture } = idTokenResult.claims
                console.log('User Name:', name)
            } catch (error) {
                console.error(error)
            }
        } else {
            console.log('No User Logged in')
        }
    }

    return (
        <>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth" element={<Auth />} />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </>
    )
}

export default App

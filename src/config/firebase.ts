import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyB_qE_fMFG0BifvYC1Tqciquzf1rNWSuZ8',
    authDomain: 'first-test-ddb64.firebaseapp.com',
    projectId: 'first-test-ddb64',
    storageBucket: 'first-test-ddb64.appspot.com',
    messagingSenderId: '1006762942188',
    appId: '1:1006762942188:web:0be7e76bab7c3ddd0e4fc9',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore()

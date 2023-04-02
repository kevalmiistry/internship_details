// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB_qE_fMFG0BifvYC1Tqciquzf1rNWSuZ8',
    authDomain: 'first-test-ddb64.firebaseapp.com',
    projectId: 'first-test-ddb64',
    storageBucket: 'first-test-ddb64.appspot.com',
    messagingSenderId: '1006762942188',
    appId: '1:1006762942188:web:0be7e76bab7c3ddd0e4fc9',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }

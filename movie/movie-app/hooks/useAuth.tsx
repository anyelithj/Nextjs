import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'

  import { useRouter } from 'next/router'
  import { createContext, useContext, useEffect, useMemo, useState } from 'react'
  import { auth } from '../firebase'

function useAuth() {
    const [loading, setLoading] = useState(false)

    const signUp = async (email: string, password: string) => {
        setLoading(true)
        await createUserWithEmailAndPassword(auth, email, password).then()
    }
    return <div>useAuth</div>
}

export default useAuth
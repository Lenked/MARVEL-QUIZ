import React, { useEffect, useState } from 'react'
import Logout from '../Logout'
import Quiz from '../Quiz'
import { auth, db } from '../Firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import Loader from '../Loader'

const Welcome = () => {

    const [userSession, setUserSession] = useState(null)
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        let listener = auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : navigate('/')
        })

        return () => {
            listener()
        }

    }, [userSession, navigate])

    if(!!userSession){
    const docRef = doc(db, "users", userSession.uid)
    getDoc(docRef)
    .then(doc => {
        if(doc && doc.exists) {
            const myData = doc.data()
            setUserData(myData)
        }
    })
    .catch(error => {
        console.log(error)
    })
    }
    

    return userSession === null ? (
        <Loader 
                loadingMsg={"Authentification ..."}
                styling={{textAlign: 'center', color: '#FFF'}}
              />
    ) : (
        <div className='quiz-bg'>
            <div className='container'>
                <Logout />
                <Quiz userData={userData} />
            </div>
        </div>
    )
}

export default Welcome
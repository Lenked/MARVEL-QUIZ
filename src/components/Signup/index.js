import React, { useState, /*useContext*/ } from 'react'
//import { FirebaseContext } from '../Firebase'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../Firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Signup = () => {

   // const firebase = useContext(FirebaseContext)
   const navigate = useNavigate()
   

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmpassword: ''
    }

    const [loginData, setLoginData] = useState(data)
    const [error, setError] = useState('')

    const handleChange = e => {
        setLoginData({...loginData, [e.target.id]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const {email, password, pseudo} = loginData
        createUserWithEmailAndPassword(auth, email, password)
        .then( authUser => { 
            return setDoc(doc(db, 'users/' + authUser.user.uid), {
                pseudo,
                email
            })
        })
        .then(() => {
            setLoginData({...data})
            navigate('/welcome')
        })
        .catch(error =>{
            setError(error)
            setLoginData({...data})
        })
    }

    const {pseudo, email, password, confirmpassword} = loginData

    const btn = pseudo === '' || email === '' || password === '' || password !== confirmpassword
    ? <button disabled>Inscription</button> : <button>Inscription</button>

    // Gestion des erreurs
    const errorMsg = error !== '' && <span>{error.message}</span>

    return (
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftSignup'></div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        <form onSubmit={handleSubmit}>
                            {errorMsg}
                            <h2>Inscription</h2>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={pseudo} type='text' id='pseudo' autoComplete='off' required/>
                                <label htmlFor='pseudo'>Pseudo</label>
                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={email} type='email' id='email' autoComplete='off' required/>
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={password} type='password' id='password' autoComplete='off' required/>
                                <label htmlFor='password'>Mot de passe</label>
                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={confirmpassword} type='password' id='confirmpassword' autoComplete='off' required/>
                                <label htmlFor='confirmpassword'>Confirmez le mot de passe</label>
                            </div>

                            {btn}
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to="/login">Déjà inscrit? Connectez-vous</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
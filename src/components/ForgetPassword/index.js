import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Firebase/firebase'

const ForgetPassword = () => {

    const [email, setEmail] =  useState("")
    const [succes, setSucces] =  useState(null)
    const [error, setError] =  useState(null)
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setError(null)
                setSucces('Consultez votre email ' + email + ' pour changer le mot de passe')
                setEmail('')

                setTimeout(() => {
                    navigate('/login')
                }, 5000)
            })
            .catch(() => {
                setError(error)
                setEmail('')
                console.log(error)
            })
    }

    const disabled = email === ""

  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
            <div className='formBoxLeftForget'></div>
            <div className='formBoxRight'>
                <div className='formContent'>

                    { 
                    succes && <span 
                        style={{
                        border: '1px solid green',
                        background: 'green',
                        color: '#ffffff'
                    }}>
                        {succes}
                    </span> 
                    }

                    { error && <span>{error.message}</span> }

                <h2>Mot de passe oublié?</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='inputBox'>
                            <input onChange={e => setEmail(e.target.value)} value={email} type='email' autoComplete='off' required/>
                            <label htmlFor='email'>Email</label>
                        </div>

                        <button disabled={disabled}>Récupérer</button>

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

export default ForgetPassword

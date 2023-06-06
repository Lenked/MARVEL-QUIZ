import React, { useEffect, useState } from 'react'
import { auth } from '../Firebase/firebase'
import { signOut } from 'firebase/auth'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const Logout = () => {

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if(checked) {
            console.log("Deconnexion")
            signOut(auth)
        }
    }, [checked])

    const handleChange = event => {
        setChecked(event.target.checked)
    }

  return (
    <div className='logoutContainer'>
      <label className='switch'>
        <input
            onChange={handleChange}
            type='checkbox'
            checked={checked}
        />
        <span className='slider round' data-tooltip-id="tooltip-deconnexion" data-tooltip-content="Déconnexion"></span>
      </label>
      <ReactTooltip
           id="tooltip-deconnexion"
           place='left'
           effect='solid'
      />
    </div>
  )
}

export default Logout

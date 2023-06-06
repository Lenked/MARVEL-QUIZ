import React, { useRef, useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {

    const [btn, setBtn] = useState(false)

    const refWolverine = useRef(null)

    useEffect(() => {
        refWolverine.current.classList.add("startingImg")
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg")
            setBtn(true)
        }, 1000)
    }, [])

    const setleftImg = () => {
        refWolverine.current.classList.add('leftImg')
    }

    const setRightImg = () => {
      refWolverine.current.classList.add('rightImg')
  }

  const clearImg = () => {
    if(refWolverine.current.classList.contains('rightImg')) {
      refWolverine.current.classList.remove('rightImg')
    } else if (refWolverine.current.classList.contains('leftImg')){
      refWolverine.current.classList.remove('leftImg')
    }
  }

  const displayBtn =  btn && (
    <Fragment>
        <div className='leftBox' onMouseOver={setleftImg}  onMouseOut={clearImg}>
          <Link className='btn-welcome' to="/signup" >Inscription</Link>
        </div>
       <div className='rightBox' onMouseOver={setRightImg} onMouseOut={clearImg}>
          <Link className='btn-welcome' to="/login" >Connexion</Link>
      </div>
    </Fragment>
    )

    return (
       <main ref={refWolverine} className='welcomePage'>
        {displayBtn}
       </main>
    )
}

export default Landing
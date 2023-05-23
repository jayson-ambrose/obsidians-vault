import React from 'react'
import '../styles/App.css'

function Login () {
    
    return(
        <div className='stacked'>
            <form id='loginEntry'>
                <input type='text' placeholder='Username'/>
                <input type='text' placeholder='Password'/>
                <button type ='submit'> Login </button>
            </form>
        </div>       
    )
}

export default Login
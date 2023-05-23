import React from 'react'
import '../styles/App.css'
import { Link } from 'react-router-dom'

function Nav () {
    
    return(
        <div className = 'nav'>
            <Link to='/login'>
                <h2> Login </h2>
            </Link> 
            <Link to='/library'>
                <h2> Library </h2>
            </Link>              
            <Link to='/rules'>
                <h2> Rules </h2>
            </Link>                       
            <Link to='/discover'>
                <h2> Discover the Vault </h2>
            </Link>             
        </div>       
    )
}

export default Nav
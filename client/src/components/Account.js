import React from 'react'
import '../styles/App.css'
import { loggedInAtom } from './lib/atoms'
import { useRecoilValue, useRecoilState } from 'recoil'

function Account () {

    const loggedIn = useRecoilValue(loggedInAtom)

    if (!loggedIn) {
        return (
            <div className='content'>
                <h2>Access Denied</h2>
                <p>You must be logged in to view account details.</p>
            </div>
        )
    }
            
    return(
        <div className='content'>
            <h2>Coming Soon</h2>
            <p>Be patient</p>
        </div>       
    )
}

export default Account
import React from 'react'
import '../styles/App.css'
import { activeAccountAtom, loggedInAtom } from './lib/atoms'
import { useRecoilValue, useRecoilState } from 'recoil'

function Account () {

    const loggedIn = useRecoilValue(loggedInAtom)
    const activeAccount = useRecoilValue(activeAccountAtom)

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
            <h2>{activeAccount.username}</h2>
            <h2>More content coming soon!</h2>
        </div>       
    )
}

export default Account
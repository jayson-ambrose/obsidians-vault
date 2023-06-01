import React, { useState } from 'react'
import '../styles/App.css'
import { Menu } from 'semantic-ui-react'
import { loggedInAtom, activeAccountAtom } from './lib/atoms'
import { useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'

function AdminPanel () {

    const [menuSelection, setMenuSelection] = useState({})

    const loggedIn = useRecoilValue(loggedInAtom)
    const activeAccount = useRecoilValue(activeAccountAtom)

    const handleItemClick = (e, { name }) => setMenuSelection({ activeItem: name})

    const { activeItem } = menuSelection

    if (!loggedIn || !activeAccount?.admin) {
        return (
            <div className='content'>
                <h2>Access Denied</h2>
                <p>You must be logged in as an administrator to view the admin panel details.</p>
            </div>
        )
    }
            
    return(
        <div className='dividerTest'>
            <Menu inverted pointing vertical secondary>
                <Menu.Item
                    as={ Link }
                    to='/admin/createcards'
                    name='Create Cards'
                    active={activeItem === 'Create Cards'}
                    onClick={handleItemClick}/>
                <Menu.Item
                    as={ Link }
                    to='/admin/accounts'
                    name='Account Manager'
                    active={activeItem === 'Account Manager'}
                    onClick={handleItemClick}/>
            </Menu>
        </div>       
    )
}

export default AdminPanel
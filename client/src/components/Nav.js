import React, { useState } from 'react'
import '../styles/App.css'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { useRecoilValue } from 'recoil'
import { loggedInAtom, activeAccountAtom } from './lib/atoms'
import Login from './Login'

function Nav () {
    
    const [menuSelection, setMenuSelection] = useState({})

    const activeAccount = useRecoilValue(activeAccountAtom)
    const loggedIn = useRecoilValue(loggedInAtom)

    const handleItemClick = (e, { name }) => setMenuSelection({ activeItem: name})

    const { activeItem } = menuSelection
        
    return(
        <Menu attached='top' tabular className='nav' color='black' inverted>
            <Menu.Item
                as={ Link }
                to='/library'
                name='Card Library'
                active={activeItem === 'Card Library'}
                onClick={handleItemClick}/>
            <Menu.Item
                as={ Link }
                to='/browse'
                name='Browse Decks'
                active={activeItem === 'Browse Decks'}
                onClick={handleItemClick}/>
            <Menu.Item
                as={ Link }
                to='/rules'
                name='Game Rules'
                active={activeItem === 'Game Rules'}
                onClick={handleItemClick}/>
            <Menu.Item
                as={ Link }
                to='/discover'
                name='Discover the Vault'
                active={activeItem === 'Discover the Vault'}
                onClick={handleItemClick}/>

            <Menu.Menu position='right'>
                {loggedIn ?
                    <Menu.Item
                        as={ Link }
                        to='/collection'
                        name='Collection'
                        active={activeItem === 'Collection'}
                        onClick={handleItemClick}/>: null}
                {loggedIn ?
                    <Menu.Item
                        as={ Link }
                        to='/deckbuilder'
                        name='Deck Builder'
                        active={activeItem === 'Deck Builder'}
                        onClick={handleItemClick}/>: null}
                {loggedIn && activeAccount?.admin ?
                    <Menu.Item
                        as={ Link }
                        to='/admin'
                        name='Admin Panel'
                        active={activeItem === 'Admin Panel'}
                        onClick={handleItemClick}/>: null}
                {loggedIn ? 
                    <Menu.Item 
                        as={ Link }
                        to='/account'
                        name={`${activeAccount?.username}`}
                        active={activeItem === `${activeAccount?.username}`}
                        onClick={handleItemClick}/> :
                    <Menu.Item
                        as={ Link }
                        to='/signup'
                        name='Sign-up'
                        active={activeItem === 'Sign-up'}
                        onClick={handleItemClick}/>}
                <Menu.Item>
                    <Login />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default Nav

// return(
//     <div className = 'nav'>
//         <Link to='/library'>
//             <h2> Library </h2>
//         </Link>              
//         <Link to='/rules'>
//             <h2> Rules </h2>
//         </Link>                       
//         <Link to='/discover'>
//             <h2> Discover the Vault </h2>
//         </Link>             
//     </div>       
// )
import React, { useState } from 'react'
import '../styles/App.css'
import { Table, Button, Icon } from 'semantic-ui-react'
import { activeAccountAtom } from './lib/atoms'
import { useRecoilValue } from 'recoil'

function UserListEntry ({user}) {

    const activeAccount = useRecoilValue(activeAccountAtom)    

    const [userEntry, setUserEntry] = useState({...user})
    const {id, username, admin, created_at} = userEntry
    
    const toggleAdmin  = () => {

        fetch(`/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({admin: !admin})
        })
        .then(resp => resp.json())
        .then(data => setUserEntry({...data}))
    }
    
    return(
        <Table.Row>
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell>{username}</Table.Cell>
            <Table.Cell>
                {admin ? <Icon color='yellow' name='checkmark' /> : null}
            </Table.Cell>
            <Table.Cell>{created_at}</Table.Cell>

            {activeAccount.master_account ? 
                <Table.Cell>
                    {admin ? <Button 
                                inverted color='red'
                                onClick={toggleAdmin}>Demote
                             </Button> :
                             <Button 
                                inverted color='yellow'
                                onClick={toggleAdmin}>Admin
                             </Button>}
                </Table.Cell> : null}

            <Table.Cell>
                <Button inverted color='grey'>Delete</Button>
            </Table.Cell>
        </Table.Row>    
    )
}

export default UserListEntry    
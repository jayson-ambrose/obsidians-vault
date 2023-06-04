import React from 'react'
import '../styles/App.css'
import { Table, Button, Icon } from 'semantic-ui-react'

function UserListEntry ({user}) {
    
    return(
        <Table.Row>
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell>{user.username}</Table.Cell>
            <Table.Cell>
                {user.admin ? <Icon color='yellow' name='checkmark' /> : null}
            </Table.Cell>
            <Table.Cell>{user.created_at}</Table.Cell>
            <Table.Cell>
                <Button inverted color='yellow'>Admin</Button>
            </Table.Cell>
            <Table.Cell>
                <Button inverted color='yellow'>Delete</Button>
            </Table.Cell>
        </Table.Row>    
    )
}

export default UserListEntry
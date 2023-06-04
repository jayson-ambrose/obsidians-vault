import React, { useEffect, useState } from 'react'
import '../styles/App.css'
import { Table } from 'semantic-ui-react'
import UserListEntry from './UserListEntry'

function AccountManager () {

    const [userList, setUserList] = useState([])

    useEffect(() => {
        fetch('/users')
        .then(resp => resp.json())
        .then(data => setUserList(data))
    }, [])

    console.log(userList)

    const displayUsers = userList.map((user) => <UserListEntry key={user.id} user={user} />)
    

    return(
        <div className='adminPanelContent'>
            <h2>User Accounts</h2>
            <Table celled padded inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Admin Status</Table.HeaderCell>
                        <Table.HeaderCell>Member Since</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {displayUsers}
                </Table.Body>
            </Table>
        </div>       
    )
}

export default AccountManager
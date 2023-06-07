import React, { useEffect, useState } from 'react'
import '../styles/App.css'
import { Table, Input } from 'semantic-ui-react'
import UserListEntry from './UserListEntry'

function AccountManager () {

    const [userList, setUserList] = useState([])
    const [userFilter, setUserFilter] = useState('')

    useEffect(() => {
        fetch('/users')
        .then(resp => resp.json())
        .then(data => setUserList(data))
    }, [])

    console.log(userList)

    const displayUsers = userList.filter((user) => user.username.toLowerCase()
        .includes(userFilter.toLowerCase()))
        .filter((user) => user.master_account === false)
        .map((user) => <UserListEntry key={user.id} user={user} />)   

    return(
        <div className='adminPanelContent'>
            <h2>User Accounts</h2>
            <Input 
                placeholder='Username Filter'
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}/>
            <Table celled padded inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Admin Status</Table.HeaderCell>
                        <Table.HeaderCell>Member Since</Table.HeaderCell>
                        <Table.HeaderCell colSpan='3'>Options</Table.HeaderCell>
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
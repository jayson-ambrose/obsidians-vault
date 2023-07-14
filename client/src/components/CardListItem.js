import React from 'react'
import '../styles/App.css'
import { Table } from 'semantic-ui-react'

function Boiler ({ card }) {

    const { id, name, cost, text, img_url } = card
    
    return(
        <Table.Row>
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{cost}</Table.Cell>
            <Table.Cell>{text}</Table.Cell>
        </Table.Row> 
    )
}

export default Boiler
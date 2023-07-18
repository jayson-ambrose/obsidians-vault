import React from 'react'
import '../styles/App.css'
import CardListItem from './CardListItem'
import { Table, TableBody } from 'semantic-ui-react'

function CardList ({ cards }) {

    const displayCards = cards.map((card) => <CardListItem card={card} key={card?.id}/>)
    
    return(
        <div>
            <h2>Card List</h2>
            <Table celled padded inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Card ID</Table.HeaderCell>
                        <Table.HeaderCell>Card Name</Table.HeaderCell>
                        <Table.HeaderCell>Card Cost</Table.HeaderCell>
                        <Table.HeaderCell>Card Text</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <TableBody>
                    {displayCards}
                </TableBody>
            </Table>
        </div>       
    )
}

export default CardList
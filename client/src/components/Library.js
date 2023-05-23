import React, { useEffect, useState } from 'react'
import '../styles/App.css'
import FilterBar from './FilterBar'
import CardDisplay from './CardDisplay'

function Library () {

    const [cards, setCards] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        fetch('/cards')
        .then(resp => resp.json())
        .then(data => setCards(data))
    }, [])

    const displayCards = cards.filter((card) => card.name.toLowerCase().includes(filter.toLowerCase())).map((card) =>  <CardDisplay key={card.id} card={card} /> )

    
    
    const handleSetFilter = (value) => {
        setFilter(value)
    }
    
    return(
        <div className='content'>
            <FilterBar filterText={filter} filterFunc={handleSetFilter}/>
            <div className='thumbContainer'>
                {displayCards}
            </div>
        </div>       
    )
}

export default Library
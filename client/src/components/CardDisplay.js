import React from 'react'
import '../styles/App.css'

function CardDisplay ({ card }) {
    
    return(
        <img className='cardThumb' src={card.img_url}/>   
    )
}

export default CardDisplay
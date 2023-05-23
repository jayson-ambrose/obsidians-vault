import React from 'react'
import '../styles/App.css'

function FilterBar ({filterText, filterFunc}) {

    const handleFilterFunc = (e) => {
        filterFunc(e.target.value)
    }
    
    return(
        <div>
            <input 
            placeholder='Name Filter'
            onChange={(e) => handleFilterFunc(e)}
            value={filterText}
            />
        </div>       
    )
}

export default FilterBar
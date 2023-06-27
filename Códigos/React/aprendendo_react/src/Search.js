import React from 'react'

function Search(props) {

    function searchInput() {
        let currentValue = document.querySelector('input[name=searchInput]').value

        
    }

    return(
        <div className="search">
            <h2>Digite a cidade que você quer saber a previsão...</h2>
            <input type="text" name="searchInput" placeholder={props.placeholder} onKeyUp={searchInput}/>
        </div>
    )

}

export default Search

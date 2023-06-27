import React, { useState } from 'react'

function Search(props) {
    const [tempo, setTempo] = useState([])

    function searchInput() {
        let currentValue = document.querySelector('input[name=searchInput]').value

        const apiKey = *****************
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${currentValue}&limit=1&appid=${apiKey}`)
            .then(response => response.json())
            .then(result => {
                const lat = result[0]['lat']
                const lon = result[0].lon

                console.log({lat, lon})

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                    .then(response => response.json())
                    .then(result => {
                        const { main, name, sys, weather } = result
                        const { description, icon } = weather[0]

                        //console.log(result)

                        return ([main, name, sys, description, icon])
                    })
                    .then(retorno => {
                        setTempo(retorno)
                    })
    })

        
    }

    return(
        <div className="search">
            <h2>Digite a cidade que você quer saber a previsão...</h2>
            <input type="text" name="searchInput" placeholder={props.placeholder} onKeyUp={searchInput}/>
        </div>
    )

}

export default Search

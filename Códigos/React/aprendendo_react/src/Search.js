import React, { useState } from 'react'

function Search(props) {
    const [tempo, setTempo] = useState([])

    function searchInput(e) {
        e.preventDefault()
        let currentValue = document.querySelector('input[name=searchInput]').value

        const apiKey = '0000000'
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${currentValue}&limit=1&appid=${apiKey}`)
            .then(response => response.json())
            .then(result => {
                const { lat, lon } = result[0]

                console.log({lat, lon})

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                    .then(response => response.json())
                    .then(res => {
                        const { main, name, sys, weather } = res
                        const { description, icon } = weather[0]

                        const obj = {main, name, sys, description, icon}

                        setTempo(obj)
                        console.log(obj)
                    })
                    .catch(e => console.log('Valores não encontrados | ' + e.message))
            })
            .catch(e => console.log('A cidade não foi encontrada | ' + e.message))      
    }

    return(
        <div className="search">
            <h2>Digite a cidade que você quer saber a previsão...</h2>
            <form onSubmit={e => searchInput(e)}>
                <input type="text" name="searchInput" placeholder={props.placeholder} />
                <input type="submit" name="acao" value="Search" />
            </form>
        </div>
    )

}

export default Search

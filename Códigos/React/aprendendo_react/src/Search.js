import React, { useState } from 'react'

function Search(props) {
    const [cidade, setCidade] = useState('')

    function searchInput(e) {
        e.preventDefault()
        let currentValue = document.querySelector('input[name=searchInput]').value

        const apiKey = ''
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

                        const url = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`
                        setCidade(url) 
                    
                        const obj = {main, name, sys, description, icon, url}

                        
                        console.log(obj)
                    })
                    .catch(e => {
                        console.log('Valores não encontrados | ' + e.message)
                        setCidade('')
                    })
            })
            .catch(e => {
                console.log('A cidade não foi encontrada | ' + e.message)
                setCidade('')
            })      
    }

    return(
        <div className="searchWraper">
            <div className="search">
                <h2>Digite a cidade que você quer saber a previsão...</h2>
                <form onSubmit={e => searchInput(e)}>
                    <input type="text" name="searchInput" placeholder={props.placeholder} />
                    <input type="submit" name="acao" value="Search" />
                </form>
            </div>
            {
                (cidade !== '')?
                <img src={cidade} />:
                <div>Pesquise por algo acima</div>
            }
        </div>
    )

}

export default Search

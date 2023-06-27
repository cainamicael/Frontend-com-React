import React, { useState, useEffect } from 'react'

function Api() {
    const [cidade, setCidade] = useState('')
    const [tempo, setTempo] = useState([])

    function api() {
        const apiKey = 
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${apiKey}`)
            .then(response => response.json())
            .then(result => {
                const lat = result[0]['lat']
                const lon = result[0].lon

                console.log({lat, lon})

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                    .then(response => response.json())
                    .then(result => {
                        const main = result.weather[0]['main']
                        const description = result.weather[0].description
                        const icon = result.weather[0].icon
                        
                        return ([main, description, icon])
                    })
                    .then(retorno => {
                        setTempo(retorno) 
                        console.log(retorno)
                    })
            })
    }

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                api()
            }}>
                <input id="i" type="text" onChange={e => setCidade(e.target.value)}/>
                <input type="submit" value="enviar" />
            </form> 
        </div>
    )
} 

export default Api

import React, { useState } from 'react'

function Search(props) {
    const [cidade, setCidade] = useState('')

    function searchInput(e) {
        e.preventDefault()
        let currentValue = document.querySelector('input[name=searchInput]').value

        const apiKey = '2933f7fc7a02cbdf76cd4dba1521e6e2'
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${currentValue}&limit=1&appid=${apiKey}`)
            .then(response => response.json())
            .then(result => {
                const { lat, lon } = result[0]

                console.log({lat, lon})

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                    .then(response => response.json())
                    .then(res => {
                        const { main, name, sys, weather } = res
                        const { description, icon } = weather[0]

                        //src da imagem
                        const url = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`
                        
                        //Converter a temperatura de Kelvin para Celsius
                        const kelvin = main.temp
                        const celsius = kelvin - 273

                        //Mostrando as informações
                        setCidade(`
                            <div class="containerCidade">
                                <p>Tamperatura: ${celsius.toFixed(2)} C°</p>
                                <p>Pais: ${sys.country}</p>
                                <p>Cidade: ${name}</p>
                                <p>Descrição: ${description}</p>
                                <img src="${url}" />
                            </div>
                        `) 
                    
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
                    <input type="submit" name="acao" value="Pesquisar" />
                </form>
            </div>
            {
                (cidade !== '')?
                <div dangerouslySetInnerHTML={{__html: cidade}}/>:
                <div style={{padding: '8px'}}>Pesquise por algo acima...</div>
            }
        </div>
    )

}

export default Search

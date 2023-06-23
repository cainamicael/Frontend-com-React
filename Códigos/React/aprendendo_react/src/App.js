import './App.css';
import React, { useState, useEffect } from 'react'

function App() {
  const horaAtual = new Date()

  const [hora, setHora] = useState(horaAtual.getHours())
  const [minutos, setMinutos] = useState(horaAtual.getMinutes())
  const [segundos, setSegundos] = useState(horaAtual.getSeconds())

  useEffect(() => {
    const interval = setInterval(() => {
      setSegundos(segundos + 1)
      if (segundos == 59) {
        setSegundos(0)
        setMinutos(minutos + 1)
      }

      if(minutos == 59 && segundos == 59) {
        setMinutos(0)
        setHora(hora + 1)
      }
      
      if (hora == 23 && minutos == 59 && segundos == 59) {
        setHora(0)
        setMinutos(0)
        setSegundos(0)
      }
    }, 1000)

    return () => clearInterval(interval) //Para ele limpar e ser chamado de novo, para seguir seu fluxo
  })

  return(
    <div>
      <h2>{hora}:{minutos}:{segundos}</h2>
    </div>
  )
}

export default App;

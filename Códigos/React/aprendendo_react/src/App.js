import './App.css';
import React, { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `Número de clicks: ${count}`
  }) //Só roda quando renderizar pela primeira vez

  return(
    <div>
      <h1>Olhe para o título da página</h1>
      <button onClick={() => setCount(count + 1)}>Clique aqui</button>
    </div>
  )
}

export default App;

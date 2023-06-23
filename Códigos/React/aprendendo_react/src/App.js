import './App.css';
import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  var vez
  count == 1? vez = 'vez' : vez = 'vezes'

  return (
    <div>
      <p>Você clicou {count} {vez} </p>
      <button onClick={() => {
          setCount(count + 1)
        }}>-Clique em Mim-</button>
    </div>
  )
}

export default App;

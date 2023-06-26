import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [nomes, setNomes] = useState([])

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setNomes(res.data))
  }, [])

  return(
    <div>
      {nomes.map((res, index) => {
        return(
          <div>
            <h2 key={index}>{res.name} | {res.email}</h2>
          </div>
        )
      })}
    </div>
  )

}

export default App;

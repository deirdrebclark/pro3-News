import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Chart from './components/Chart'

import './index.css'

function App() {
  const [x, setX] = useState(true)
  return (
    <div>
      {x ? <div>X IS TRUE</div> : <div>X IS FALSE</div>}
      <button onClick={() => setX(!x)}></button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

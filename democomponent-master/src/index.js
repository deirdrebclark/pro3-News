import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import DropDown from './DropDown'
import { removeDupes } from './removeDupes'

import './index.css'

const WordCloud = () => {
  const [data, setData] = useState([])
  const [date, setDate] = useState(null)
  const [newspaper, setNewsPaper] = useState(null)

  const getId = e => {
    if (e.target.selectedOptions[0].id === 'date') {
      setDate(e.target.selectedOptions[0].textContent)
    } else {
      setNewsPaper(e.target.selectedOptions[0].textContent)
    }
  }

  useEffect(() => {
    fetch(
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_PROD_URL
        : process.env.REACT_APP_DEV_URL
    )
      .then(res => res.json())
      .then(data => {
        const values = Object.values(data)
        setData(values.map((val, i) => ({ ...val, id: i })))
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="App">
      <DropDown
        options={removeDupes(data, 'newspaper')}
        getId={getId}
        id="newspaper"
      />
      <DropDown options={removeDupes(data, 'date')} getId={getId} id="date" />
      {data
        .filter(d => d.date === date && d.newspaper === newspaper)
        .map((d, i) =>
          d['IMG URL'] !== 'none' ? (
            <img
              key={i}
              src={d['IMG URL']}
              alt={`Wordcloud for ${d.newspaper} on ${d.date}`}
            />
          ) : (
            <p key={i}>
              Sorry! A wordcloud couldn't be generated for {d.newspaper} on the
              selected date ({d.date}).
            </p>
          )
        )}
      <button onClick={handleOptionReset}>RESET</button>
    </div>
  )
}

ReactDOM.render(<WordCloud />, document.getElementById('root'))

import React from 'react'

const DropDown = props => {
  return (
    <>
      <select onChange={e => props.getId(e)} name="wordcloud" id="wordcloud">
        <option defaultValue={props.id}>{props.id}</option>
        {props.options.map((o, i) => (
          <option id={props.id} key={i}>
            {o}
          </option>
        ))}
      </select>
    </>
  )
}

export default DropDown

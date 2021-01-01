/* eslint-disable react/prop-types */
import React from 'react';

const Header = (props) => {
    return(
      <p className={props.className}>
        {props.text}
      </p>
    )
  }
  
const Otsikko = ({text}) => {
    const styling = `Header-button ${text}`
    
    return(
      <button className={styling}>{text}</button>
    )
}

export {Otsikko, Header}
/* eslint-disable react/prop-types */
import React from 'react';

export const Header = (props) => {
    return(
      <p className={props.className}>
        {props.text}
      </p>
    )
  }
  
export const Otsikko = ({text}) => {
    const styling = `Header-button ${text}`
    
    return(
      <button className={styling}>{text}</button>
    )
}

export const OtsikkoJob = ({text}) => {
  const styling = `OtsikkoJob Osio-light ${text}`
  
  return(
    <button className={styling}>{text}</button>
  )
}

export const Separator = () => {
  return(
    <div className="Separator"></div>
  )
}

export default {Otsikko, Header}
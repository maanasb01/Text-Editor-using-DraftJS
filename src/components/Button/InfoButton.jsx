import React from 'react'
import "./button.css"

export default function InfoButton({onClick}) {
  return (
    <button className="button info-btn" onClick={onClick}>i</button>
  )
}

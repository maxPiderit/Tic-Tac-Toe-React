import React from "react"
import "./Modal.css"

export default function Modal({ open, children }) {
  if (!open) return null
  return (
    <div className="modal">{children}</div>
  )
}




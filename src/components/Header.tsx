import React from "react"
import style from "./Header.module.css"


export function Header() {
  return (
    <div className={`${style.Header}`}>
      <div>
        <a href="#">Home</a>
      </div>
      <div>MY ToDoList</div>
      <div>
        <a href="#">UserName</a>
      </div>
    </div>
  )
}
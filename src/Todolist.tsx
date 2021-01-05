import React from "react"
import {taskType} from "./App"

export function TodoList(props: TodolistType) {
  let title = props.title

  return (
    <div className={`TodoList`}>
      <h3>{title}</h3>
      <div><input type={"text"}
                  placeholder={"enter ..."}/>
        <button>+</button>
      </div>
      <ul>
        <li><input type={"checkbox"}
                   checked={props.tasks[0].isDone}
        /><span>{props.tasks[0].title}</span></li>
        <li><input type={"checkbox"}
                   checked={props.tasks[1].isDone}
        /><span>{props.tasks[1].title}</span></li>
        <li><input type={"checkbox"}
                   checked={props.tasks[2].isDone}
        /><span>{props.tasks[2].title}</span></li>
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}

type TodolistType = {
  title: string
  tasks: Array<taskType>
}
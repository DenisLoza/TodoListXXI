import React from "react"
import {taskStateType} from "./store/state"
import style from "./Todolist.module.css"

export function TodoList(props: TodoListType) {
  // в переменную title присваиваем props.title
  let {title} = props
  // props.tasks MAP отдельно по каждой таске
  let task = props.tasks.map(t => {
    return (
    <li key={t.id}>
      <input type={"checkbox"}
             checked={t.isDone}
      />
      <span>{t.title}</span>
      <button onClick={() => {props.removeTask(t.id)}}> </button>
    </li>
    )
  } )

  return (
    <div className={`TodoList`}>
      <h3>{title}</h3>
      <div>
        <input type={"text"}
               placeholder={"enter ..."}/>
        <button>+</button>
      </div>
      <ul className={style.tasks}>
        {task}
      </ul>
      <div>
        <button onClick={() => {props.changeFilter("All")}}>All</button>
        <button onClick={() => {props.changeFilter("Active")}}>Active</button>
        <button onClick={() => {props.changeFilter("Completed")}}>Completed</button>
      </div>
    </div>
  )
}

type TodoListType = {
  id: string
  title: string
  tasks: Array<taskStateType>
  removeTask: (taskId: string) => void
  changeFilter: (value: "All" | "Active" | "Completed") => void
}
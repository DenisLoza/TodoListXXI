import React from "react"
import {taskStateType} from "./store/state"
import style from "./Todolist.module.css"
import {filteredTasksType} from "./App"

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
      <button onClick={() => {props.deleteTaskCallback(t.id)}}> </button>
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
        <button onClick={() => {props.setTaskFilter("All")}}>All</button>
        <button onClick={() => {props.setTaskFilter("Active")}}>Active</button>
        <button onClick={() => {props.setTaskFilter("Completed")}}>Completed</button>
      </div>
    </div>
  )
}

type TodoListType = {
  id: string
  title: string
  tasks: Array<taskStateType>
  deleteTaskCallback: (taskId: string) => void
  setTaskFilter: (value: filteredTasksType) => void
}
import React from "react"
import "./App.css"
import {TodoList} from "./Todolist"


function App() {

  let tasks1: Array<taskType> = [
    {id: "1", title: "HTML", isDone: true},
    {id: "2", title: "CSS", isDone: true},
    {id: "3", title: "JS", isDone: false},
  ]
  let tasks2: Array<taskType> = [
    {id: "4", title: "React", isDone: true},
    {id: "5", title: "Vue", isDone: false},
    {id: "6", title: "Angular", isDone: false},
  ]

  return (
    <div className={`App`}>
      <TodoList title={"What's to learn?"}
                tasks={tasks1}/>
      <TodoList title={"Movies"}
                tasks={tasks2}/>
    </div>
  )
}

export default App

export type taskType = {
  id: string
  title: string
  isDone: boolean
}
import React, {useState} from "react"
import "./App.css"
import {TodoList} from "./Todolist"
import {tasksState1, todoListsState} from "./store/state"


function App() {

  let [tasks1, setTasks1] = useState(tasksState1)
  let [taskFilter, setTaskFilter] = useState("All")

  function removeTask(taskId: string) {
    // создаем массив и отправляем туда те таски,
    // чей id НЕ совпадает с приходящим из колбека
    let filtredTasks = tasks1.filter(t => t.id !== taskId)
    setTasks1(filtredTasks)
  }

  function changeFilter(value: "All" | "Active" | "Completed") {
    setTaskFilter(value)
  }

  let filtredTasks = tasks1
  if (taskFilter === "Active") {
    filtredTasks = tasks1.filter(t => t.isDone)
  }
  if (taskFilter === "Completed") {
    filtredTasks = tasks1.filter(t => !t.isDone)
  }

  return (
    <div className={`App`}>
      <TodoList id={todoListsState[0].id}
                title={todoListsState[0].title}
                tasks={filtredTasks}
                changeFilter={changeFilter}
                removeTask={removeTask}
      />
    </div>
  )
}
export default App
import React, {useState} from "react"
import "./App.css"
import {TodoList} from "./Todolist"
import {tasksState1, taskStateType, todoListsState} from "./store/state"


function changeFilter(tasks1: Array<taskStateType>, value: filteredTasksType): Array<taskStateType> {
  if (value === "All")
    return tasks1
  if (value === "Active")
    return tasks1.filter(t => t.isDone)
  if (value === "Completed")
    return tasks1.filter(t => !t.isDone)
  else return tasks1
}

function deleteTask(tasks1: Array<taskStateType>, taskId: string): Array<taskStateType> {
  // создаем массив и отправляем туда те таски,
  // чей id НЕ совпадает с приходящим из колбека
  return tasks1.filter(t => t.id !== taskId)
}

export function App() {
  let [tasks1, setTasks1] = useState<Array<taskStateType>>(tasksState1)
  let [taskFilter, setTaskFilter] = useState<filteredTasksType>("All")

  const filteredTasks = changeFilter(tasks1, taskFilter)
  const deleteTaskCallback = (taskId: string) => setTasks1(deleteTask(tasks1, taskId));

  return (
    <div className={`App`}>
      <TodoList id={todoListsState[0].id}
                title={todoListsState[0].title}
                tasks={filteredTasks}
                setTaskFilter={setTaskFilter}
                deleteTaskCallback={deleteTaskCallback}
      />
    </div>
  )
}

export type filteredTasksType = "All" | "Active" | "Completed"

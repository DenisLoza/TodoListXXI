import React, {useState} from "react"
import "./App.css"
import {TodoList} from "./Todolist"
import {tasksState1, taskStateType, todoListsState} from "./store/state"
import {v1} from "uuid"


function changeFilter(tasks1: Array<taskStateType>, value: filteredTasksType): Array<taskStateType> {
  if (value === "All")
    return tasks1
  if (value === "Active")
    return tasks1.filter(t => t.isDone)
  if (value === "Completed")
    return tasks1.filter(t => !t.isDone)
  else return tasks1
}

function changeTaskStatus(tasks1: Array<taskStateType>, taskId: string, isDone: boolean): Array<taskStateType> {
  // фактичеки в task приходит только один объект из массива
  let task = tasks1.filter(t => t.id === taskId)
  if (task) {
    // поэтому в данном случае он будет всегда иметь индекс 0
    task[0].isDone = isDone
  }
  return [...tasks1]
}

function deleteTask(tasks1: Array<taskStateType>, taskId: string): Array<taskStateType> {
  // создаем массив и отправляем туда те таски,
  // чей id НЕ совпадает с приходящим из колбека
  return tasks1.filter(t => t.id !== taskId)
}

function addTask(tasks1: Array<taskStateType>, titleTask: string): Array<taskStateType> {
  let newTask = {id: v1(), title: titleTask, isDone: false}
  let newTasks = [newTask, ...tasks1]
  return newTasks
}

export function App() {

  // хук следит за изменениями (удаление, добавление новых) в массиве тасок
  let [tasks1, setTasks1] = useState<Array<taskStateType>>(tasksState1)
  // хук следит за фильтрацией тасок в массиве по признаку "All", "Active", "Completed"
  let [taskFilter, setTaskFilter] = useState<filteredTasksType>("All")

  const filteredTasks = changeFilter(tasks1, taskFilter)
  const deleteTaskCallback = (taskId: string) => setTasks1(deleteTask(tasks1, taskId));
  const addTaskCallback = (titleTask: string) => setTasks1(addTask(tasks1, titleTask))
  const changeTaskStatusCallback = (taskId: string, isDone: boolean) => setTasks1(changeTaskStatus(tasks1, taskId, isDone))

  return (
    <div className={`App`}>
      <TodoList id={todoListsState[0].id}
                title={todoListsState[0].title}
                tasks={filteredTasks}
                taskFilter={taskFilter}
                setTaskFilter={setTaskFilter}
                deleteTaskCallback={deleteTaskCallback}
                addTaskCallback={addTaskCallback}
                changeTaskStatusCallback={changeTaskStatusCallback}
      />
    </div>
  )
}

export type filteredTasksType = "All" | "Active" | "Completed"

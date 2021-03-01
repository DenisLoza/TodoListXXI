import React, {useState} from "react"
import "./App.css"
import {TodoList} from "./Todolist"
import {v1} from "uuid"
import {
  todoListsState,
  todoListsStateAll,
  todoListStateType,
  todoListsStateAllType,
  filteredTasksType
} from "../store/state"
import {Header} from "./Header"


function deleteTask(idTask: string, idTL: string, allTodolists: todoListsStateAllType): todoListsStateAllType {
  // достаем из объекта allTodolists массив тасок по ключу idTL
  let tasks = allTodolists[idTL]
  // в массив получаем все таски кроме той, id которой пришел из пропсов (idTask)
  let filteredTasks = tasks.filter(task => task.id !== idTask)
  // создаем новый объект Todolist (ключ = idTL(из props), значение = отфильтрованные таски)
  let newTodolist = {[idTL]: filteredTasks}
  // возвращаем новый объект, одно из значений которого по ключу (idTL) замещается новым объектом
  return {...allTodolists, ...newTodolist}
}

function addTask(titleTask: string, idTL: string, allTodolists: todoListsStateAllType): todoListsStateAllType {
  let tasks = allTodolists[idTL]
  let newTask = {id: v1(), title: titleTask, isDone: false}
  let newTasks = [newTask, ...tasks]
  let newTodolist = {[idTL]: newTasks}
  return {...allTodolists, ...newTodolist}
}

function changeTaskStatus(idTask: string, isDone: boolean, idTL: string, allTodolists: todoListsStateAllType): todoListsStateAllType {
  let tasks = allTodolists[idTL]
  // создаем новый массив тасок через .map Таска у которой id совпадает с приходящей в пропсах
  // меняем у нее св-ва isDone на приходящее из пропсов, если id не совпадает возвращаем таску в массив
  let newTasks = tasks.map(
    task => task.id === idTask ? {...task, isDone: isDone} : task)
  let newTodolist = {[idTL]: newTasks}
  return {...allTodolists, ...newTodolist}
}

// колбек устанавливает значение фильтра для каждого Тудулиста
function setTaskFilter(idTL: string, value: filteredTasksType, todolists: Array<todoListStateType>): Array<todoListStateType> {
  let newTLs = todolists.map(
    tl => tl.id === idTL ? {...tl, filterTL: value} : tl)
  return newTLs
}

// 1. Удаление Todolist по его idTL
function deleteTodolist(idTL: string, todolists: Array<todoListStateType>): Array<todoListStateType> {
  let filteredTodolists = todolists.filter(tl => tl.id !== idTL)
  return filteredTodolists
}
// 2. Удаление в общем объекте данных ключа (т.е. всех тасок) по id Тудулиста
function clearObjectDataKey(idTL: string, allTodolists: todoListsStateAllType): todoListsStateAllType {
  let copyData = {...allTodolists}
  // удаляем ключ объекта по приходящему idTL
  delete copyData[idTL]
  return copyData
}


export function App() {

  // хук следит за изменениями (удаление, добавление новых) тудулистов
  // фактически для изменения titleTL и filterTl в TodoList или добавления (удаления) нового Todolist
  let [todolists, setTodolists] = useState<Array<todoListStateType>>(todoListsState)
  // хук следит за изменениями всего массива Тудулистов с массивами Тасок
  // фактически для изменения тасок в отдельных Тудулистах
  let [allTodolists, setAllTodolists] = useState<todoListsStateAllType>(todoListsStateAll)


  // ф-ции обертки, забирают значения из колбэков и хуков и передают их в ф-ции за пределы компоненты
  // они, в свою очередь возвращают значения для сета в хуки
  const deleteTaskCallback = (idTask: string, idTL: string) =>
    setAllTodolists(deleteTask(idTask, idTL, allTodolists))

  const addTaskCallback = (titleTask: string, idTL: string) =>
    setAllTodolists(addTask(titleTask, idTL, allTodolists))

  const changeTaskStatusCallback = (idTask: string, isDone: boolean, idTL: string) =>
    setAllTodolists(changeTaskStatus(idTask, isDone, idTL, allTodolists))

  const setTaskFilterCallback = (idTL: string, value: filteredTasksType) =>
    setTodolists(setTaskFilter(idTL, value, todolists))

  const deleteTodolistCallback = (idTL: string) => {
    setTodolists(deleteTodolist(idTL, todolists))
    setAllTodolists(clearObjectDataKey(idTL, allTodolists))
  }


  return (
    <div className={`App`}>
      <Header/>
      <div className={`TodoLists`}>
        {todolists.map(tl => {
          // фильтруем каждый тудулист по значению фильтра ("All", "Active", "Done")
          let tasksForTodoList = allTodolists[tl.id]
          if (tl.filterTL === "Active") tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
          if (tl.filterTL === "Completed") tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)

          return (

            <TodoList key={tl.id}
                      idTL={tl.id}
                      titleTL={tl.title}
                      taskFilterTL={tl.filterTL}
                      tasks={tasksForTodoList}
                      deleteTaskCallback={deleteTaskCallback}
                      addTaskCallback={addTaskCallback}
                      changeTaskStatusCallback={changeTaskStatusCallback}
                      setTaskFilterCallback={setTaskFilterCallback}
                      deleteTodolistCallback={deleteTodolistCallback}
            />
          )
        })
        }
      </div>
    </div>
  )
}



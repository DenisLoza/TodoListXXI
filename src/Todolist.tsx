import React, {useState} from "react"
import {taskStateType} from "./store/state"
import style from "./Todolist.module.css"
import {filteredTasksType} from "./App"


export function TodoList(props: TodoListType) {

  // хук следит за именем новой таски событие onChange на <input>
  let [titleTask, setTitleTask] = useState("")

  // в переменную title присваиваем props.title
  let {title} = props

  // props.tasks MAP отдельно по каждой таске
  let task = props.tasks.map(t => {

    const deleteTask = () => {
      props.deleteTaskCallback(t.id)
    }

    return (
      <li key={t.id}>
        <input type={"checkbox"}
               checked={t.isDone}
        />
        <span>{t.title}</span>
        <button onClick={deleteTask}> </button>
      </li>
    )
  })

  // ф-ция вызывает колбек добавления новой таски и устанавливает в значение <input> пустую строку
  const setNewTaskName = () => {
    props.addTaskCallback(titleTask)
    setTitleTask("")
  }

  // если нажать Enter, когда <input> в фокусе добавит новую таску
  const onKeyPressHandler = (e: { charCode: number }) => {
    if (e.charCode === 13) {
      setNewTaskName()
    }
  }

  // следит за изменениями в <input> и сетит значение в хук useState
  const onChangeInputHandler = (e: { currentTarget: { value: React.SetStateAction<string> } }) => {
    setTitleTask(e.currentTarget.value)
  }

  // фильтрация тасок по "All"
  const onClickFilterAll = () => {
    props.setTaskFilter("All")
  }
  // фильтрация тасок по "Active"
  const onClickFilterActive = () => {
    props.setTaskFilter("Active")
  }
  // фильтрация тасок по "Completed"
  const onClickFilterCompleted = () => {
    props.setTaskFilter("Completed")
  }


  return (
    <div className={`TodoList`}>
      <h3>{title}</h3>
      <div>
        <input onChange={onChangeInputHandler}
               onKeyPress={onKeyPressHandler}
               type={"text"}
               placeholder={"enter ..."}
               value={titleTask}/>
        <button onClick={setNewTaskName}> +</button>
      </div>
      <ul className={style.tasks}>
        {task}
      </ul>
      <div>
        <button onClick={onClickFilterAll}> All</button>
        <button onClick={onClickFilterActive}> Active</button>
        <button onClick={onClickFilterCompleted}> Completed</button>
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
  addTaskCallback: (titleTask: string) => void
}
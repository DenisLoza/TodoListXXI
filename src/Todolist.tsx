import React, {ChangeEvent, useState} from "react"
import {taskStateType} from "./store/state"
import style from "./Todolist.module.css"
import {filteredTasksType} from "./App"


export function TodoList(props: TodoListType) {

  // хук следит за именем новой таски событие onChange на <input>
  let [titleTask, setTitleTask] = useState("")
  // хук обработки ошибок при вводе данных в <input>
  let [error, setError] = useState<string | null>(null)

  // ф-ция вызывает колбек добавления новой таски и устанавливает в значение <input> пустую строку
  const setNewTaskName = () => {
    // проверка на попытку ввести пустую строку перед отправлением названия в колбэк
    if (titleTask.trim() !== "") {
      setError(null)
      props.addTaskCallback(titleTask)
      setTitleTask("")
    } else {
      setError("Title is required!")
    }
  }

  // если нажать Enter, когда <input> в фокусе добавит новую таску
  const onKeyPressHandler = (e: { charCode: number }) => {
    // при попытке нажать любую клавишу на клавиатуре ошибка будет сбрасываться!
    setError(null)
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


  // в переменную title присваиваем props.title
  let {title} = props

  // ОТДЕЛЬНАЯ ТАСКА (props.tasks MAP отдельно по каждой таске)
  let task = props.tasks.map(t => {
    const deleteTask = () => {
      props.deleteTaskCallback(t.id)
    }
    const onChangeCheckboxTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      props.changeTaskStatusCallback(t.id, newIsDoneValue)
    }
    return (
      <li key={t.id}>
        <input type={"checkbox"}
               checked={t.isDone}
               onChange={onChangeCheckboxTaskHandler}
        />
        <span>{t.title}</span>
        <button onClick={deleteTask}></button>
      </li>
    )
  })

  // Туду лист целиком
  return (
    <div className={style.TodoList}>
      <h3>{title}</h3>
      <div>
        <input onChange={onChangeInputHandler}
               onKeyPress={onKeyPressHandler}
               type={"text"}
               placeholder={"enter ..."}
               value={titleTask}/>
        <button onClick={setNewTaskName}> +</button>
      </div>
      <div className={style.error}> {error} </div>

      <ul className={style.tasks}>

        {task}

      </ul>
      <div>
        <button className={props.taskFilter === "All" ? style.activeFilter : ""}
                onClick={onClickFilterAll}> All
        </button>
        <button className={props.taskFilter === "Active" ? style.activeFilter : ""}
                onClick={onClickFilterActive}> Active
        </button>
        <button className={props.taskFilter === "Completed" ? style.activeFilter : ""}
                onClick={onClickFilterCompleted}> Completed
        </button>
      </div>
    </div>
  )
}

type TodoListType = {
  id: string
  title: string
  tasks: Array<taskStateType>
  taskFilter: filteredTasksType
  deleteTaskCallback: (taskId: string) => void
  setTaskFilter: (value: filteredTasksType) => void
  addTaskCallback: (titleTask: string) => void
  changeTaskStatusCallback: (taskId: string, isDone: boolean) => void
}
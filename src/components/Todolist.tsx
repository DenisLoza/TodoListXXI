import React, {ChangeEvent, useState} from "react"
import {filteredTasksType, taskStateType} from "../store/state"
import style from "./Todolist.module.css"


export type TodoListType = {
  idTL: string
  titleTL: string
  tasks: Array<taskStateType>
  taskFilterTL: filteredTasksType
  deleteTaskCallback: (idTask: string, idTL: string) => void
  setTaskFilter: (idTL: string, value: filteredTasksType) => void
  addTaskCallback: (titleTask: string, idTL: string) => void
  changeTaskStatusCallback: (idTask: string, isDone: boolean, idTL: string) => void
}


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
      props.addTaskCallback(titleTask, props.idTL)
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
    props.setTaskFilter(props.idTL, "All")
  }
  // фильтрация тасок по "Active"
  const onClickFilterActive = () => {
    props.setTaskFilter(props.idTL, "Active")
  }
  // фильтрация тасок по "Completed"
  const onClickFilterCompleted = () => {
    props.setTaskFilter(props.idTL, "Completed")
  }


  // ОТДЕЛЬНАЯ ТАСКА (props.tasks MAP отдельно по каждой таске)
  let task = props.tasks.map(task => {

    const deleteTask = () => {
      props.deleteTaskCallback(task.id, props.idTL)
    }

    const onChangeCheckboxTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      props.changeTaskStatusCallback(task.id, newIsDoneValue, props.idTL)
    }

    return (
      <div className={style.task}
           key={task.id}>
        <input type={"checkbox"}
               checked={task.isDone}
               onChange={onChangeCheckboxTaskHandler}
        />
        <span>{task.title}</span>
        <button onClick={deleteTask}></button>
      </div>
    )
  })

  // ТУДУ ЛИСТ ЦЕЛИКОМ
  return (
    <div className={style.TodoListWrapper}>
      <div className={style.TodoList}>
        <div className={style.titleTask}>
          {props.titleTL}
        </div>
        <div className={style.inputTaskName}>
          <input onChange={onChangeInputHandler}
                 onKeyPress={onKeyPressHandler}
                 type={"text"}
                 placeholder={"+ Add new task..."}
                 value={titleTask}/>
          <button onClick={setNewTaskName}> +</button>
        </div>
        <div className={style.error}> {error} </div>

        <div className={style.tasks}>

          {task}

        </div>
        <div className={style.buttons}>
          <button className={props.taskFilterTL === "All" ? style.activeFilter : ""}
                  onClick={onClickFilterAll}> All
          </button>
          <button className={props.taskFilterTL === "Active" ? style.activeFilter : ""}
                  onClick={onClickFilterActive}> Active
          </button>
          <button className={props.taskFilterTL === "Completed" ? style.activeFilter : ""}
                  onClick={onClickFilterCompleted}> Completed
          </button>
        </div>
      </div>
    </div>
  )
}


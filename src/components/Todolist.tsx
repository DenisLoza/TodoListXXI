import React, {ChangeEvent, useState} from "react"
import {filteredTasksType, taskStateType} from "../store/state"
import style from "./Todolist.module.css"


export type TodoListType = {
  idTL: string
  titleTL: string
  taskFilterTL: filteredTasksType
  tasks: Array<taskStateType>
  deleteTaskCallback: (idTask: string, idTL: string) => void
  addTaskCallback: (titleTask: string, idTL: string) => void
  changeTaskStatusCallback: (idTask: string, isDone: boolean, idTL: string) => void
  setTaskFilterCallback: (idTL: string, value: filteredTasksType) => void
  deleteTodolistCallback: (idTL: string) => void
}


export function TodoList(props: TodoListType) {

  // хук следит за именем новой таски событие onChange на <input>
  let [titleTask, setTitleTask] = useState("")
  // хук обработки ошибок при вводе данных в <input>
  let [error, setError] = useState<string | null>(null)


  // следит за изменениями в <input> и сетит значение в хук useState
  const onChangeInputHandler = (e: { currentTarget: { value: React.SetStateAction<string> } }) => {
    setTitleTask(e.currentTarget.value)
  }
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


  // фильтрация тасок по "All"
  const onClickFilterAll = () => {
    props.setTaskFilterCallback(props.idTL, "All")
  }
  // фильтрация тасок по "Active"
  const onClickFilterActive = () => {
    props.setTaskFilterCallback(props.idTL, "Active")
  }
  // фильтрация тасок по "Completed"
  const onClickFilterCompleted = () => {
    props.setTaskFilterCallback(props.idTL, "Completed")
  }


  // ф-ция вызывает колбэк для удаления Тудулиста целиком по его id
  const onDeleteTodolist = () => {
    props.deleteTodolistCallback(props.idTL)
  }


  // ОТДЕЛЬНАЯ ТАСКА (props.tasks MAP отдельно по каждой таске)
  let task = props.tasks.map(task => {

    const onDeleteTask = () => {
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
        <button onClick={onDeleteTask}></button>
      </div>
    )
  })

  // ТУДУ ЛИСТ ЦЕЛИКОМ
  return (
    <div className={style.TodoListWrapper}>
      <div className={style.TodoList}>
        <div className={style.titleTask}>
          {props.titleTL}
          <button onClick={onDeleteTodolist}></button>
        </div>
        <div className={style.inputTaskName}>
          <input type={"text"}
                 placeholder={"+ Add new task..."}
                 value={titleTask}
                 onChange={onChangeInputHandler}
                 onKeyPress={onKeyPressHandler}
          />
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


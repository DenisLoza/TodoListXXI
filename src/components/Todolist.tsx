import React, {ChangeEvent} from "react"
import {filteredTasksType, taskStateType} from "../store/state"
import style from "./Todolist.module.css"
import {AddItemForm} from "../modules/AddItemForm"
import {EditableSpan} from "../modules/EditableSpan"


export type TodoListType = {
  idTL: string
  titleTL: string
  tasksFilterTL: filteredTasksType
  tasks: Array<taskStateType>
  deleteTaskCallback: (idTask: string, idTL: string) => void
  addTaskCallback: (titleTask: string, idTL: string) => void
  changeStatusTaskCallback: (isDone: boolean, idTask: string, idTL: string) => void
  changeTitleTaskCallback: (titleTask: string, idTask: string, idTL: string) => void
  setFilterTodolistCallback: (newFilterTL: filteredTasksType, idTL: string) => void
  deleteTodolistCallback: (idTL: string) => void
  changeTitleTodolistCallback: (titleTL: string, idTL: string) => void
}


export function TodoList(props: TodoListType) {

  // фильтрация тасок по "All"
  const onClickFilterAll = () => {
    props.setFilterTodolistCallback("All", props.idTL)
  }
  // фильтрация тасок по "Active"
  const onClickFilterActive = () => {
    props.setFilterTodolistCallback("Active", props.idTL)
  }
  // фильтрация тасок по "Completed"
  const onClickFilterCompleted = () => {
    props.setFilterTodolistCallback("Completed", props.idTL)
  }


  // ф-ция вызывает колбэк для удаления Тудулиста целиком по его id
  const onDeleteTodolist = () => {
    props.deleteTodolistCallback(props.idTL)
  }
  // ф-ция вызывает колбэк добавления новой Таски в Тудулист по его idTL
  const addNewTaskCallback = (titleItem: string) => {
    props.addTaskCallback(titleItem, props.idTL)
  }
  // ф-ция вызывает колбэк для изменения имени Тудулиста по idTL и newTitle
  const onChangeTitleTodolist = (titleTL: string) => {
    props.changeTitleTodolistCallback(titleTL, props.idTL)
  }

  // ОТДЕЛЬНАЯ ТАСКА (props.tasks MAP отдельно по каждой таске)
  let task = props.tasks.map(task => {

    const onDeleteTask = () => {
      props.deleteTaskCallback(task.id, props.idTL)
    }

    const onChangeCheckboxTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      props.changeStatusTaskCallback(newIsDoneValue, task.id, props.idTL)
    }

    const onChangeTitleTask = (titleTask: string) => {
      props.changeTitleTaskCallback(titleTask, task.id, props.idTL)
    }

    return (
      <div className={style.task}
           key={task.id}>
        <input type={"checkbox"}
               checked={task.isDone}
               onChange={onChangeCheckboxTaskHandler}
        />
        <EditableSpan title={task.title}
                      onChangeTitle={onChangeTitleTask}/>
        <button onClick={onDeleteTask}></button>
      </div>
    )
  })

  // ТУДУ ЛИСТ ЦЕЛИКОМ
  return <>
    <div className={style.TodoListWrapper}>
      <div className={style.TodoList}>
        <div className={style.titleTL}>
          <EditableSpan title={props.titleTL}
                        onChangeTitle={onChangeTitleTodolist}/>
          <button onClick={onDeleteTodolist}></button>
        </div>
        <div className={style.inputTaskName}>
          <AddItemForm placeholderName="+ Add new task..."
                       addItemCallback={addNewTaskCallback}/>
        </div>
        <div className={style.tasks}>

          {task}

        </div>
        <div className={style.buttonsFilter}>
          <button className={props.tasksFilterTL === "All" ? style.buttonsActiveFilter : ""}
                  onClick={onClickFilterAll}> All
          </button>
          <button className={props.tasksFilterTL === "Active" ? style.buttonsActiveFilter : ""}
                  onClick={onClickFilterActive}> Active
          </button>
          <button className={props.tasksFilterTL === "Completed" ? style.buttonsActiveFilter : ""}
                  onClick={onClickFilterCompleted}> Completed
          </button>
        </div>
      </div>
    </div>
  </>
}


import React, {ChangeEvent} from "react"
import {filteredTasksType, taskStateType} from "../store/state"
import style from "./Todolist.module.css"
import {AddItemForm} from "../modules/AddItemForm"


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
  // ф-ция вызывает колбэк добавления новой Таски в Тудулист по его idTL
  const addNewTaskCallback = (titleItem: string) => {
    props.addTaskCallback(titleItem, props.idTL)
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
        <EditableSpan title={task.title}
                      editMode={true}/>
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
                        editMode={true}/>
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
          <button className={props.taskFilterTL === "All" ? style.buttonsActiveFilter : ""}
                  onClick={onClickFilterAll}> All
          </button>
          <button className={props.taskFilterTL === "Active" ? style.buttonsActiveFilter : ""}
                  onClick={onClickFilterActive}> Active
          </button>
          <button className={props.taskFilterTL === "Completed" ? style.buttonsActiveFilter : ""}
                  onClick={onClickFilterCompleted}> Completed
          </button>
        </div>
      </div>
    </div>
  </>
}

type EditableSpanType = {
  title: string
  editMode: boolean
}
export function EditableSpan(props: EditableSpanType) {
  let newTitle = props.title
  return (
    props.editMode
    ? <span>{newTitle}</span>
    : <input/>
  )
}


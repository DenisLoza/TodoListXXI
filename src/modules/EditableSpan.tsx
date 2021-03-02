import React, {ChangeEvent, useState} from "react"
import style from "./EditableSpan.module.css"


type EditableSpanType = {
  title: string
  onChangeTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanType) {

  let [editMode, setEditMode] = useState<boolean>(false)
  let [newTitle, setNewTitle] = useState<string>("")

  const activateEditMode = () => {
    setEditMode(true)
    setNewTitle(props.title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChangeTitle(newTitle)
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  return (
    editMode
      ? <input value={newTitle}
               onChange={onChangeInput}
        // при появлении <input> автофокус всегда будет сразу внутри
               autoFocus={true}
               onBlur={activateViewMode}
               className={style.EditableInput}/>
      : <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}
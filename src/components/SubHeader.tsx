import React from "react"
import style from "./SubHeader.module.css"
import {AddItemForm} from "../modules/AddItemForm"


type SubHeaderType = {
  addTodolistCallback: (titleTL: string) => void
}

export function SubHeader(props: SubHeaderType) {

  return <>
    <div className={`${style.SubHeader}`}>
      <div>
        <AddItemForm placeholderName="+ Add another list..."
                     addItemCallback={props.addTodolistCallback}
        />
      </div>
      <div>
        Settings
      </div>
    </div>
  </>
}
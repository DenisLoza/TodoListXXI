import React, {useState} from "react"
import style from "./AddItemForm.module.css"


type InputType = {
  placeholderName: string
  addItemCallback: (titleItem: string) => void
}


export function AddItemForm(props: InputType) {

  // хук следит за именем сущности, событие onChange на <input>
  let [titleItem, setTitleItem] = useState("")
  // хук обработки ошибок при вводе данных в <input>
  let [error, setError] = useState<string | null>(null)


  // следит за изменениями в <input> и сетит значение в хук useState
  const onChangeInputHandler = (e: { currentTarget: { value: React.SetStateAction<string> } }) => {
    setTitleItem(e.currentTarget.value)
  }
// ф-ция вызывает колбек добавления новой сущности и устанавливает в значение <input> пустую строку
  const setNewItemName = () => {
    // проверка на попытку ввести пустую строку перед отправлением названия в колбэк
    if (titleItem.trim() !== "") {
      setError(null)
      props.addItemCallback(titleItem)
      setTitleItem("")
    } else {
      setError(" ")
    }
  }
// если нажать Enter, когда <input> в фокусе добавит новую сущность
  const onKeyPressHandler = (e: { charCode: number }) => {
    // при попытке нажать любую клавишу на клавиатуре ошибка будет сбрасываться!
    setError(null)
    if (e.charCode === 13) {
      setNewItemName()
    }
  }


  return <>
      <div className={style.AddItemForm}>
        <input type={"text"}
               placeholder={props.placeholderName}
               value={error || titleItem}
               onChange={onChangeInputHandler}
               onKeyPress={onKeyPressHandler}
        />
        <button onClick={setNewItemName}> +</button>
      </div>
      <div className={style.error}> </div>
    </>
}
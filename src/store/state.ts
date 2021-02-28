import {v1} from "uuid"

export let tasksState1: Array<taskStateType> = [
  {id: v1(), title: "HTML", isDone: true},
  {id: v1(), title: "CSS", isDone: true},
  {id: v1(), title: "JS", isDone: true},
  {id: v1(), title: "RestAPI", isDone: false},
  {id: v1(), title: "GraphQL", isDone: false},
]

export let tasksState2: Array<taskStateType> = [
  {id: v1(), title: "React", isDone: true},
  {id: v1(), title: "Vue", isDone: false},
  {id: v1(), title: "Angular", isDone: false},
  {id: v1(), title: "Express", isDone: false},
  {id: v1(), title: "Laravel", isDone: false},
]

// Новый stateAll для объединения двух стейтов (todoListsState и tasksState) по ID туду листов, как ассоциативный массив
// чтобы ID тудулистов совадали для двух стейтов, мы выносим их в отдельную переменную.
let todolistId1 = v1()
let todolistId2 = v1()

export let todoListsState: Array<todoListStateType> = [
  {id: todolistId1, title: "What's to learn?", filterTL: "All"},
  {id: todolistId2, title: "Frameworks", filterTL: "All"}
]
export type todoListsStateAllType = {
  [todolistId: string]: Array<taskStateType>
}
export let todoListsStateAll: todoListsStateAllType = {
  [todolistId1]: tasksState1,
  [todolistId2]: tasksState2
}

export type todoListStateType = {
  id: string
  title: string
  filterTL: filteredTasksType
}
export type taskStateType = {
  id: string
  title: string
  isDone: boolean
}
export type filteredTasksType = "All" | "Active" | "Completed"
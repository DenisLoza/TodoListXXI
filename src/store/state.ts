import {v1} from "uuid"

export let tasksState1: Array<taskStateType> = [
    {id: v1(), title: "HTML", isDone: true},
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "JS", isDone: false},
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

export let todoListsState: Array<todoListStateType> = [
    {id: v1(), title: "What's to learn?"},
    {id: v1(), title: "Frameworks"}
]

export type todoListStateType = {
    id: string
    title: string
}
export type taskStateType = {
    id: string
    title: string
    isDone: boolean
}
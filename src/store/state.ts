
export let tasksState1: Array<taskStateType> = [
    {id: "t11", title: "HTML", isDone: true},
    {id: "t12", title: "CSS", isDone: true},
    {id: "t13", title: "JS", isDone: false},
    {id: "t14", title: "RestAPI", isDone: false},
    {id: "t15", title: "GraphQL", isDone: false},
]

export let tasksState2: Array<taskStateType> = [
    {id: "t21", title: "React", isDone: true},
    {id: "t22", title: "Vue", isDone: false},
    {id: "t23", title: "Angular", isDone: false},
    {id: "t24", title: "Express", isDone: false},
    {id: "t25", title: "Laravel", isDone: false},
]

export let todoListsState: Array<todoListStateType> = [
    {id: "tl11", title: "What's to learn?"},
    {id: "tl12", title: "Frameworks"}
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
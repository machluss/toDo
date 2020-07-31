import React from 'react'
import Task from './Task'

const Tasks = (props) => {
    const { tasks, deleteClick, doneClick } = props

    let activeTasks = tasks.filter(task => task.active)
    activeTasks.sort((a, b) => {
        a = a.text.toLowerCase()
        b = b.text.toLowerCase()

        if (a > b) return 1
        if (a < b) return -1
        return 0
    })
    activeTasks.sort((a, b) => {
        if (a.priority < b.priority) return 1
        if (a.priority > b.priority) return -1
        return 0
    })
    activeTasks = activeTasks.map(task => <Task
        key={task.id}
        task={task}
        doneClick={doneClick}
        deleteClick={deleteClick}
    />)

    let doneTasks = tasks.filter(task => !task.active)
    doneTasks.sort((a, b) => {
        a = a.endDate
        b = b.endDate

        if (a < b) return 1
        if (a > b) return -1
        return 0
    })
    doneTasks = doneTasks.map(task => <Task
        key={task.id}
        task={task}
        doneClick={doneClick}
        deleteClick={deleteClick}
    />)

    return (
        <>
            <h3>Zadania do zrobienia <em>({activeTasks.length}):</em></h3>
            {activeTasks.length > 0 ? activeTasks : <p>To wszystko na dzisiaj!!! <em
                style={{
                    color: 'green'
                }}
            >:-D</em></p>}
            <hr />
            <h3>Zadania wykonane <em>({doneTasks.length}):</em></h3>
            {tasks.length === 0 ? <p>Nie masz w bazie żadnych zadań.</p> : doneTasks.length > 0 ? doneTasks : <p> Weź sie do roboty <em
                style={{
                    color: 'red'
                }}
            >!!!!!!!!!</em></p>}
        </>
    )
}

export default Tasks



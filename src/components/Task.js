import React from 'react'
import './Task.css'

const Task = props => {
    const { text, id, active, priority, date } = props.task
    let endDate = new Date(props.task.endDate).toLocaleDateString()
    const activeTask = (
        <div className='task'>
            <span
                style={priority ? {
                    color: '#ad0000',
                    fontWeight: 'bold'
                } : {}}
            >{text}</span> <em
                style={{
                    fontSize: '12px'
                }}
            >Termin: {date}</em> <button className='taskBtn' onClick={() => props.doneClick(id)}>Done!</button><button className='taskBtn' onClick={() => props.deleteClick(id)}>X</button>
        </div>
    )

    const doneTask = (
        <div className='task'>
            <span>{text}</span> <button className='taskBtn' onClick={() => props.deleteClick(id)}>X</button><br />
            <em
                style={{
                    fontSize: '12px'
                }}
            >Data wykonania: {endDate}</em>
        </div>
    )

    if (active) return activeTask
    else return doneTask
}

export default Task
import React from 'react';
import './App.css';
import Panel from './Panel';
import Tasks from './Tasks';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  addTask = (text, date, priority) => {

    const tasks = [...this.state.tasks]
    const newTask = {
      id: tasks.length + 1,
      text,
      date: new Date(date).toLocaleDateString(),
      priority,
      active: true,
      endDate: ''
    }
    tasks.push(newTask)
    this.setState({ tasks })
  }

  handleDeleteClick = (id) => {
    let tasks = [...this.state.tasks]
    tasks = tasks.filter(task => task.id !== id)
    this.setState(() => ({ tasks }))
  }

  handleDoneClick = (id) => {
    let tasks = [...this.state.tasks]
    tasks = tasks.map(task => {
      if (task.id === id) {
        task.active = false;
        task.endDate = new Date().getTime()
      }
      return task
    })
    this.setState(() => ({ tasks }))
  }

  render = () => {
    return (
      <div className="App">
        <h1>To|DO App</h1>
        <Panel
          addTask={this.addTask}
        />
        <hr />
        <Tasks
          tasks={this.state.tasks}
          doneClick={this.handleDoneClick}
          deleteClick={this.handleDeleteClick}
        />
      </div>
    );
  }
}

export default App;

/*

{
  id: 1,
  text: "Zadanie 1",
  date: "2019-05-03",
  priority: false,
  active: false,
  endDate: '06.06.2020'
},
{
  id: 2,
  text: "Zadanie 2",
  date: "2019-05-13",
  priority: true,
  active: true,
  endDate: ''
},

*/
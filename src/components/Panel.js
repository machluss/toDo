import React from 'react'
import './Panel.css'

class Panel extends React.Component {
    state = {
        textInput: '',
        dateInput: '',
        minDate: '',
        isPriority: false,
        errors: {
            textInput: false,
            dateInput: false,
        }
    }

    validation = () => {
        const errors = {
            textInput: false,
            dateInput: false,
        }
        let isFailed = false
        if (this.state.textInput.length < 3) errors.textInput = true
        if (this.state.dateInput === '') errors.dateInput = true
        if (errors.textInput || errors.dateInput) isFailed = true
        return ({ isFailed, errors })
    }

    handleChange = e => {
        const type = e.target.type
        if (type === 'checkbox') this.setState({
            [e.target.name]: e.target.checked
        })
        else this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const validResult = this.validation()
        if (validResult.isFailed) {
            this.setState({
                errors: validResult.errors
            })
            return
        }
        const { textInput, dateInput, isPriority } = this.state
        this.props.addTask(textInput, dateInput, isPriority)
        this.setState({
            textInput: '',
            dateInput: '',
            isPriority: false,
            errors: validResult.errors
        })
    }

    componentDidMount = () => {
        const minDate = new Date().toISOString().slice(0, 10)
        this.setState({
            minDate
        })
    }


    render = () => (
        <form
            onSubmit={this.handleSubmit}
        >
            <div>
                <input
                    type='text'
                    placeholder='Wpisz nowe zadanie'
                    name='textInput'
                    value={this.state.textInput}
                    onChange={this.handleChange}
                /> <input
                    id='priority'
                    type='checkbox'
                    name='isPriority'
                    checked={this.state.isPriority}
                    onChange={this.handleChange}
                />
                <label htmlFor='priority'>Priorytet</label>
                {this.state.errors.textInput ? <p style={{
                    fontSize: '12px',
                    color: 'red',
                    fontStyle: 'italic'
                }}>Pole musi zawierać co najmniej 3 znaki</p> : null}
            </div>
            <div>
                <label
                    htmlFor='dateInput'
                >Data wykonania zadania: </label>
                <input
                    id='dateInput'
                    type='date'
                    name='dateInput'
                    value={this.state.dateInput}
                    onChange={this.handleChange}
                    min={this.state.minDate}
                    step='any'
                    style={{
                        textAlign: 'center'
                    }}
                />
                {this.state.errors.dateInput ? <p style={{
                    fontSize: '12px',
                    color: 'red',
                    fontStyle: 'italic'
                }}>Pole musi zostać uzupełnione</p> : null}
            </div>
            <button className='panel'>Dodaj zadanie</button>
        </form>
    )
}

export default Panel
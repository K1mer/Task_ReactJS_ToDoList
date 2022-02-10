import React from 'react';
import './css/TodoListItem.css';

/*
Пропсы:
    NoteID - ID этой заметки
    Name - заголовок этой заметки
    Status - статус выполнения этой заметки
    selected - отображает, выбрана ли эта заметка или нет
Методы:
    handleClick() - вызывается при нажатии на заметку
*/

class TodoListItem extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.makeSelected(this.props.NoteID)
    }

    render() {
        return (
            <div 
            className={'TodoListItem' + (this.props.selected ? ' Selected' : '')} 
            onClick={this.handleClick}>
                <div 
                    className='ItemStateIndicator' 
                    status={this.props.Status}/>
                <p 
                    className='ItemName'>
                    {this.props.Name} 
                </p>
            </div>
        )
    }
}

export default TodoListItem

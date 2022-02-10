import React from 'react';
import './css/EditPanel.css'

import Note from './Note';

/*
Пропсы:
  CurrentEditNote - заметка, запрашиваемая для редактирования
Состояния:
  Name - заголовок текущей заметки
  Description - содержание текущей заметки
  Status - статус выполнения текущей заметки
Методы:
  shouldComponentUpdate() - помимо предназначенной функции, 
    устанавлиает состояния Name, Description и Status на те,
    что переданны в CurrentEditNote
  handleClickDelete() - вызывает удаление выбранной заметки
  handleClickConfirm() - создаёт новый экземпляр класса Note,
    записывает в него записанные данные и вызывает его сохранение,
    устанавливает изначальное состояние
*/
class EditPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Name: "",
      Description: "",
      Status: 'Pending'
    }

    this.handleClickConfirm = this.handleClickConfirm.bind(this)
    this.handleClickDelete = this.handleClickDelete.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    let nextNote = nextProps.CurrentEditNote

    if ((nextNote !== this.props.CurrentEditNote) 
      && (nextNote !== null)) {
      this.setState({
        Name: nextNote.Name,
        Description: nextNote.Description,
        Status: nextNote.Status
      })
    }

    return true
  }

  handleClickDelete() {
    if (this.props.CurrentEditNote === null 
      || this.props.CurrentEditNote === undefined) return

    this.props.onDeletion(this.props.CurrentEditNote.NoteID)
  }

  handleClickConfirm() {
    if (this.props.CurrentEditNote === null 
      || this.props.CurrentEditNote === undefined) return

    let params = {
      n: this.state.Name,
      d: this.state.Description,
      s: this.state.Status,
      id: this.props.CurrentEditNote.NoteID
    }

    let NewNote = new Note(params)
    this.props.onEditConfirm(NewNote)

    this.setState({
      Name: "",
      Description: "",
      Status: "Pending"
    })
  }

  render() {
    return (
    <div className='EditPanel'>
      <input 
        id='EditNoteName' 
        placeholder='Заголовок заметки' 
        value={this.state.Name}
        onChange={e => {
          this.setState({
            Name: e.target.value
          })
        }}
      />
      <textarea 
        id='EditNoteDescription' 
        placeholder='Содержание заметки' 
        value={this.state.Description}
        onChange={e => {
          this.setState({
            Description: e.target.value
          })
        }}
      />

      <div className='BottomContainer'>
        
        <button 
          className='DeleteNote' 
          onClick={this.handleClickDelete}>
            Удалить заметку
        </button>

        <select
          id='EditNoteStatus' 
          value={this.state.Status}
          onChange={e => {
            this.setState({
              Status: e.target.value
            })
          }}>
            <option value="Pending">Ожидает</option>
            <option value="InProgress">В процессе</option>
            <option value="Done">Выполнено</option>
        </select>

        <button 
          className='EditConfirm' 
          onClick={this.handleClickConfirm}>
            Сохранить изменения
        </button> 

      </div>
    </div>)
  }
}

export default EditPanel;

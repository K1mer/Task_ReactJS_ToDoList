import React from 'react';
import './css/App.css';

import Note from './Note'

import SidePanel from './SidePanel'
import EditPanel from './EditPanel'

/* 
Состояния:
  NoteList - массив, содержит список заметок (экземпляры класса Note)
  SelectedNoteID - содержит ID редактируемой заметки
  NoteOnEditing - содержит заметку, которая находится на редактировании (экземпляр класса Note)

Методы:
  setEditPanel(ID) - заметка с выбранным ID становится "текущей".
    Она устанавливается в EditPanel. 
  doCreateNote() - создает новую заметку, заносит её в NoteList.
    Вызывается из класса SidePanel.
    SelectedNoteID получает ID новой заметки, NoteOnEditing изменяется на неё же.
  editNote(newNote) - получает измёненную заметку и перезаписывает её в NoteList.
    Вызывается из класса EditPanel.
    Изменяет состояния SelectedNoteID и NoteOnEditing в null
  doDeletion(ID) - удаляет выбранную заметку из NoteList. 
    Вызывается из класса EditPanel с параметром, представляющую ID заметки, которую необходимо удалить.
    Изменяет состояния SelectedNoteID и NoteOnEditing в null
*/

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      NoteList: [],
      SelectedNoteID: null,
      NoteOnEditing: null
    }

    this.setEditPanel = this.setEditPanel.bind(this)
    this.editNote = this.editNote.bind(this)
    this.doDeletion = this.doDeletion.bind(this)
    this.doCreateNote = this.doCreateNote.bind(this)
  }

  setEditPanel(ID) {
    this.setState({
      SelectedNoteID: ID,
      NoteOnEditing: this.state.NoteList.find(n => n.NoteID === ID)
    })
  }

  editNote(newNote) {
    let nL = this.state.NoteList

    let index = nL.findIndex(n => n.NoteID === newNote.NoteID)
    nL[index] = newNote

    this.setState({
      SelectedNoteID: null,
      NoteList: nL,
      NoteOnEditing: null
    })
  }

  doDeletion(ID) {
    let nL = this.state.NoteList.filter(n => n.NoteID !== ID)

    this.setState({
      SelectedNoteID: null,
      NoteList: nL,
      NoteOnEditing: null
    })
  }

  doCreateNote() {
    let newNote = new Note()
    let nL = this.state.NoteList
    nL.push(newNote)

    this.setState({
      NoteList: nL,
      SelectedNoteID: newNote.NoteID,
      NoteOnEditing: newNote
    })
  }

  render() {
    return (
      <div className="App">
        <div className='MainContainer'>
          <SidePanel
            NoteList={this.state.NoteList}
            Selected={this.state.SelectedNoteID}
            onCallEditPanel={this.setEditPanel}
            onClickCreateNote={this.doCreateNote}
          />
          <EditPanel 
            CurrentEditNote={this.state.NoteOnEditing}
            onEditConfirm={this.editNote}
            onDeletion={this.doDeletion}
          />
        </div>
      </div>
    )
  }
}

export default App;

import React from 'react';
import './css/SidePanel.css';

import TodoListItem from './TodoListItem'

/*
Пропсы:
    NoteList - список заметок
    Selected - ID выбранной заметки
Состояния:
    strToSearch - строка, которую пользователь ввёл в Поиск
Методы:
    doSearch(e) - изменяется состояние strToSearch на значение, указанное в SearchBar.
    createNote() - вызывается по нажатию на кнопку добавления заметки.
    handleEditCall(ID) - вызывается по нажатию на заметку в списке.
        Передаёт ID выбранной заметки.
*/

class SidePanel extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        strToSearch: ''
      }
  
      this.doSearch = this.doSearch.bind(this)
      this.createNote = this.createNote.bind(this)
  
      this.handleEditCall = this.handleEditCall.bind(this)
    }
  
    doSearch(e) {
      this.setState( { strToSearch: e.target.value } )
    }
  
    createNote() {
      this.props.onClickCreateNote()
    }
  
    handleEditCall(ID) {
      this.props.onCallEditPanel(ID)
    }
  
    render() {
      const selectedID = this.props.Selected

      // Искомая в поиске строка
      const searchString = this.state.strToSearch.trim().toLowerCase()

      // Весь список заметок
      let SearchResults = this.props.NoteList

      let f = this.handleEditCall
  
      // Отбрасывание заметок, заголовок которых не совпадает с искомым
      if(searchString.length > 0) {
        SearchResults = SearchResults.filter(function(val){
          return val.Name.toLowerCase().match( searchString )
        })
      }
  
      return (
        <div className='SidePanel'>
          <input 
            className='SearchBar' 
            type="text" 
            value={this.state.strToSearch} 
            onChange={this.doSearch} 
            placeholder='Поиск'
          />
  
          <div id='TodoList'>
            {
              SearchResults.map(function(val) {
                return ( 
                  <TodoListItem
                    key={val.NoteID}
                    NoteID={val.NoteID}
                    Name={val.Name}
                    Status={val.Status}
                    makeSelected={f}
                    selected={val.NoteID === selectedID}
                  />
                )
              })        
            }
          </div>
  
          <button className='AddItemButton' onClick={this.createNote}>
            Добавить новую заметку
          </button>
        </div>
      )
    }
  }

export default SidePanel
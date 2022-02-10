
/*
Каждая заметка содержит уникальный идентификатор (NoteID), заголовок (Name),
  содержание (Description), статус выполнения (Status)

Метод GetID() выдает идентификатор.

Конструктор без параметров создает совершенно новую заметку и приписывает ей новый ID.
Если параметры имеются, то заметка перенимает все переданные переменные.
*/

class Note {
    static _id = 0
  
    static GetID() {
      return this._id++
    }
  
    constructor(params) {
      if (params === undefined) {
        this.NoteID = Note.GetID()
    
        this.Name = 'Новая заметка'
        this.Description = ''
        this.Status = "Pending"
      }
      else { 
        this.NoteID = params.id
        this.Name = params.n
        this.Description = params.d
        this.Status = params.s
      }
    }
}

export default Note

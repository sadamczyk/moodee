'use strict'
import ReactDOM from 'react-dom'
import React from 'react'
import Entry from './entry'

class Entries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: null,
      isButtonDisabled: false
    }

    this.loadEntries()
  }

  loadEntries() {
    fetch('http://localhost:4000/entries/')
      .then(res => res.json())
      .then(res => this.setState({entries: res}))
      .then(res => this.setState({isButtonDisabled: false}))
  }

  addEntry() {
    const entries = this.state.entries
    entries.push({
      id: 0,
      datetime: new Date(),
      mood: 3,
      note: ''
    })
    this.setState({entries: entries})
    this.setState({isButtonDisabled: true}) // TODO En-/Disable all button/entry controls (except the new one) together
  }

  removeEntry(id) {
    return () => {
      fetch('http://localhost:4000/entries/' + id, { method: 'DELETE' })
        .then(res => {
          if (res.status === 200) {
            this.setState({entries: this.state.entries.filter((entry) => {
              return entry.id !== id
            })})
          } else {
            console.log(res)
          }
        })
    }
  }

  render() {
    return (
      <>
      <button id="add-entry" disabled={this.state.isButtonDisabled} onClick={this.addEntry.bind(this)}>Add new entry</button>
      <div id="entries">
        {!this.state.entries ? 'Loading...' : this.state.entries.map((entry) => {
          return <Entry
            key={entry.id}
            id={entry.id}
            datetime={entry.datetime}
            mood={entry.mood}
            note={entry.note}
            loadEntries={this.loadEntries.bind(this)}
            removeEntry={this.removeEntry(entry.id)}
          />
        })}
      </div>
      </>
    )
  }
}

ReactDOM.render(
    <Entries />,
    document.getElementById('entries-root')
)

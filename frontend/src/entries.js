'use strict'
import ReactDOM from 'react-dom'
import React from 'react'
import Entry from './entry'

class Entries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: null
    }

    this.loadEntries()
  }

  loadEntries() {
    fetch('http://localhost:4000/entries/')
      .then(res => res.json())
      .then(res => this.setState({entries: res}))
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
      <div id="entries">
        {!this.state.entries ? 'Loading...' : this.state.entries.map((entry) => {
          return <Entry 
            key={entry.id} 
            id={entry.id}
            datetime={entry.datetime}
            mood={entry.mood}
            note={entry.note}
            removeEntry={this.removeEntry(entry.id)} 
          />
        })}
      </div>
    )
  }
}

ReactDOM.render(
    <Entries />,
    document.getElementById('entries-root')
)

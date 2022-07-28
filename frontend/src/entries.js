'use strict'
import ReactDOM from 'react-dom'
import React from 'react'
import Entry from './entry'

class Entries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [1, 3, 5]
    }
  }

  removeEntry(id) {
    return () => {
      this.setState({entries: this.state.entries.filter((value) => {
        return value !== id
      })})
    }
  }

  render() {
    return (
      <div id="entries">
        {this.state.entries.map((id) => {
          return <Entry key={id} id={id} removeEntry={this.removeEntry(id)} />
        })}
      </div>
    )
  }
}

ReactDOM.render(
    <Entries />,
    document.getElementById('entries-root')
)

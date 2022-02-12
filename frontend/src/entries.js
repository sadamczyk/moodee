'use strict'
import ReactDOM from 'react-dom'
import React from 'react'
import Entry from './entry'

class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}; // TODO Remove if not needed
  }

  render() {
    return (
      <div id="entries">
        <Entry></Entry>
      </div>
    )
  }
}

ReactDOM.render(
    <Entries />,
    document.getElementById('entries-root')
)

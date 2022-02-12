'use strict'
import ReactDOM from 'react-dom'
import React from 'react'

class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}; // TODO Remove if not needed
  }

  render() {
    return (
      <div id="entries">
        <div class="entry">Entry #1</div>
        <div class="entry">Entry #2</div>
        <div class="entry">Entry #3</div>
      </div>
    )
  }
}

ReactDOM.render(
    <Entries />,
    document.getElementById('entries-root')
)

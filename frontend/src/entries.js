'use strict'
import ReactDOM from 'react-dom'
import React from 'react'
import Entry from './entry'

class Entries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: null,
      activeControlEntryId: null
    }

    this.loadEntries()
  }

  loadEntries = () => {
    fetch('http://localhost:4000/entries/')
      .then(res => res.json())
      .then(res => this.setState({entries: res}))
      .then(res => this.setState({activeControlEntryId: null}))
  }

  addEntry = () => {
    const entries = this.state.entries
    entries.push({
      _id: 0,
      datetime: new Date(),
      mood: 3,
      note: ''
    })
    this.setState({entries: entries})
    this.setState({activeControlEntryId: 0})
  }

  removeEntry(id) {
    const removeEntryFromState = () => {
      this.setState({
        entries: this.state.entries.filter((entry) => {
          return entry._id !== id
        })
      })
    }

    if (!id) {
      return removeEntryFromState
    } else {
      return () => {
        fetch('http://localhost:4000/entries/' + id, { method: 'DELETE' })
          .then(res => {
            if (res.status === 200) {
              removeEntryFromState()
            } else {
              console.log(res)
            }
          })
      }
    }
  }

  /**
   * Disables all controls except for given entry id.
   *
   * @param {int} activeControlEntryId
   */
  disableControls = (activeControlEntryId) => {
    this.setState({ activeControlEntryId: activeControlEntryId })
  }

  render() {
    return (
      <>
      <button id="add-entry" disabled={this.state.activeControlEntryId !== null} onClick={this.addEntry}>Add new entry</button>
      <div id="entries">
        {!this.state.entries ? 'Loading...' : this.state.entries.map((entry) => {
          return <Entry
            key={entry._id}
            id={entry._id}
            datetime={entry.datetime}
            mood={entry.mood}
            note={entry.note}
            loadEntries={this.loadEntries}
            removeEntry={this.removeEntry(entry._id)}
            areControlsDisabled={this.state.activeControlEntryId !== null && this.state.activeControlEntryId !== entry._id}
            disableControls={this.disableControls}
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

'use strict'
import React from 'react'

export default class Entry extends React.Component {
  state = {
    id: this.props.id,
    datetime: this.convertServerDateToLocalDate(this.props.datetime),
    mood: this.props.mood,
    note: this.props.note,
  }

  /**
   * Dates on server are always UTC, but have to be converted
   * to the correct local timezone for the client.
   *
   * Also convert it to the right format that the <input> datetime-local
   * field expects, @see https://stackoverflow.com/a/66558369.
   */
  convertServerDateToLocalDate(datetime) {
    const fakeUtcTime = new Date(datetime)
    const d = new Date(fakeUtcTime.getTime() - fakeUtcTime.getTimezoneOffset() * 60000)
    return d.toISOString().slice(0, -8)
  }

  convertLocalDateToServerDate(datetime) {
    return new Date(datetime).toISOString()
  }

  toggleHideChildren(el) {
    for (let sibling of el.children) {
      if (sibling.classList.contains('hide')) {
        sibling.classList.remove('hide')
      } else {
        sibling.classList.add('hide')
      }
    }
  }

  toggleControls(el) {
    this.toggleHideChildren(el.target.parentElement.parentElement)
  }

  handleChange(attr) {
    return (e) => {
      this.setState({ [attr]: e.target.value })
    }
  }

  saveEntry(el) {
      const entry = structuredClone(this.state)
      entry.datetime = this.convertLocalDateToServerDate(entry.datetime)
      let url = 'http://localhost:4000/entries/'
      let method = 'POST'

      if (entry.id) { // Update existing entry
        url = 'http://localhost:4000/entries/' + entry.id
        method = 'PUT'
      }

      fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
      })
        .then(async res => {
          switch (res.status) {
            case 201:
              const body = await res.json()
              this.setState({
                id: body.id
              })

            case 200:
              this.toggleControls(el)
              break

            default:
              console.log(res)
          }

          this.props.loadEntries()
        })
  }

  componentDidMount() {
    // Immediately toggle controls for new entry
    if (!this.state.id) {
      const entryDOM = document.getElementById('entry-' + this.state.id)
      this.toggleHideChildren(entryDOM)
    }
  }

  onEdit(el) {
    this.toggleControls(el)
    this.props.disableControls(this.state.id)
  }

  onDelete(el) {
    this.props.removeEntry()
  }

  onSave(el) {
    this.saveEntry(el)
    this.props.disableControls(null)
  }

  onCancel(el) {
    if (!this.state.id) {
      this.props.removeEntry()
    } else {
      this.toggleControls(el)
    }

    this.props.disableControls(null)
  }

  render() {
    return (
      <div id={'entry-' + this.state.id} className="entry toggle-hide-children">
        <div className="entry-view">
            <div className="entry-id">ID: {this.state.id ?? 'NULL'}</div>
            <div className="entry-datetime">Datetime: {this.state.datetime}</div>
            <div className="entry-mood">Mood: {this.state.mood}</div>
            <div className="entry-note">note: {this.state.note}</div>
        </div>
        <div className="entry-view entry-form hide">
          <input type="datetime-local" onChange={this.handleChange('datetime')} value={this.state.datetime}></input>
          <select defaultValue={this.state.mood} onChange={this.handleChange('mood')}>
            <option value="" disabled>Pick a mood level</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input type="textarea" onChange={this.handleChange('note')} value={this.state.note}></input>
        </div>
        <div className="entry-controls">
            <button disabled={this.props.areControlsDisabled} className="entry-edit" onClick={this.onEdit.bind(this)}>✏️</button>
            <button disabled={this.props.areControlsDisabled} className="entry-delete" onClick={this.onDelete.bind(this)}>🗑️</button>
        </div>
        <div className="entry-controls hide">
            <button disabled={this.props.areControlsDisabled} className="entry-save" onClick={this.onSave.bind(this)}>💾</button>
            <button disabled={this.props.areControlsDisabled} className="entry-cancel" onClick={this.onCancel.bind(this)}>❌</button>
        </div>
      </div>
    )
  }
}

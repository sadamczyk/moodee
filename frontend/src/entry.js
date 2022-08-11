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
    let siblings = el.target.parentElement.parentElement.children
    for (let sibling of siblings) {
      if (sibling.classList.contains('hide')) {
        sibling.classList.remove('hide')
      } else {
        sibling.classList.add('hide')
      }
    }
  }

  handleChange(attr) {
    return (e) => {
      this.setState({ [attr]: e.target.value })
    }
  }

  saveEntry(el) {
      const entry = this.state
      entry.datetime = this.convertLocalDateToServerDate(entry.datetime)

      fetch('http://localhost:4000/entries/' + entry.id, { 
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
      })
        .then(res => {
          if (res.status === 200) {
            this.toggleHideChildren(el)
          } else {
            console.log(res)
          }
        })
  }

  render() {
    return (
      <div className="entry toggle-hide-children">
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
            <span className="entry-edit" onClick={this.toggleHideChildren}>✏️</span>
            <span className="entry-delete" onClick={this.props.removeEntry}>🗑️</span>
        </div>
        <div className="entry-controls hide">
            <span className="entry-save" onClick={this.saveEntry.bind(this)}>💾</span>
            <span className="entry-cancel" onClick={this.toggleHideChildren}>❌</span>
        </div>
      </div>
    )
  }
}

'use strict'
import React from 'react'

export default class Entry extends React.Component {
  constructor(props) {
    super(props)
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

  render() {
    return (
      <div className="entry toggle-hide-children">
        <div className="entry-view">
            <div className="entry-id">ID: {this.props.id}</div>
            <div className="entry-datetime">Datetime: {this.props.datetime}</div>
            <div className="entry-mood">Mood: {this.props.mood}</div>
            <div className="entry-note">note: {this.props.note}</div>
        </div>
        <div className="entry-view entry-form hide">
          <input type="datetime-local"></input>
          <select defaultValue={''}>
            <option value="" disabled>Pick a mood level</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input type="textarea"></input>
        </div>
        <div className="entry-controls">
            <span className="entry-edit" onClick={this.toggleHideChildren}>✏️</span>
            <span className="entry-delete" onClick={this.props.removeEntry}>🗑️</span>
        </div>
        <div className="entry-controls hide">
            <span className="entry-save">💾</span>
            <span className="entry-cancel" onClick={this.toggleHideChildren}>❌</span>
        </div>
      </div>
    )
  }
}

'use strict'
import React from 'react'

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}; // TODO Remove if not needed
  }

  render() {
    return (
      <div className="entry">
        <div className="entry-data">
            <div className="entry-datetime">2022-02-12 09:38</div>
            <div className="entry-mood">3: OK</div>
            <div className="entry-notes">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و </div>
        </div>
        <div className="entry-controls">
            <span className="entry-edit">✏️</span>
            <span className="entry-delete">🗑️</span>
        </div>
      </div>
    )
  }
}

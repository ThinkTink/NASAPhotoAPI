import React from 'react';

export default class Input extends React.Component {
  render(props) {
    return (
      <div>
        <h3 id="tooltip">Select a date:
          <span id="tooltiptext">Select any date between June 16, 1995 and today.</span>
        </h3>

        <input
          type="date"
          min="1995-06-16"
          max={this.props.limitDate}
          onChange={(event) => {this.props.getPhoto(event.target.value)}}
        />
      </div>
    );
  }
}

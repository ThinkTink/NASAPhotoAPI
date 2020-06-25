import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Output extends React.Component {
  render(props) {
    return (
      <div>
        {this.props.error
          ? <p> There was an error loading this date's data. Please choose another date.</p>
          : <div>
              {this.props.loading 
                ? <FontAwesomeIcon icon={faSpinner} size="6x" spin id="spinner"/>
                : <div>
                    {this.props.isVideo
                      ? <iframe
                          title={this.props.altText}
                          src={this.props.imgSource}
                        ></iframe>
                      : <img
                          alt={this.props.altText}
                          src={this.props.imgSource}
                        />
                    }
                    <p id="explanation">{this.props.explanation}</p>
                  </div>
              }
            </div>
        }

      </div>
    );
  }
}

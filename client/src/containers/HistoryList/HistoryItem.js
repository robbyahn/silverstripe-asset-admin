import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HistoryItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  getFileIDFromURL(url) {
    const parts = url.split('/');
    const showIndex = parts.indexOf('show');
    
    if (showIndex !== -1 && parts.length > showIndex + 1) {
      return parts[showIndex + 1];
    }
    
    return null;
  }

  handleClick(e) {
    e.preventDefault();

    if (typeof this.props.onClick === 'function') {
      this.props.onClick(this.props.versionid);
    }
  }

  handleRedirect() {
    const { fileid, versionid } = this.props;
    const returnUrl = encodeURIComponent(window.location.href);

    // Redirect to the dev task URL and append the return URL as a query parameter
    window.location.href = `./dev/tasks/RestoreFileVersionTask?FileID=${fileid}&Version=${versionid}&ReturnURL=${returnUrl}`;
  }

  render() {
    let publishedLine = null;

    if (this.props.status === 'Published') {
      publishedLine = (<p><span className="history-item__status-flag">
        {this.props.status}</span> at {this.props.date_formatted}
      </p>);
    }

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <li
        className="list-group-item history-item"
        onClick={this.handleClick}
      >
        <p>
          <span className="history-item__version">v.{this.props.versionid}</span>
          <span className="history-item__date">{this.props.date_ago} {this.props.author}</span>
          {this.props.summary}          
        </p>
        <p>
          {/* <a href={`./dev/tasks/RestoreFileVersionTask?FileID=${this.props.fileid}&Version=${this.props.versionid}`}>
            Revert to this version
          </a> */}
          <button type="button" onClick={this.handleRedirect}>
            Revert to this version
          </button>
        </p>
        {publishedLine}
      </li>
    );
  }
}

HistoryItem.propTypes = {
  versionid: PropTypes.number.isRequired,
  summary: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  status: PropTypes.string,
  author: PropTypes.string,
  date_formatted: PropTypes.string,
  date_ago: PropTypes.string,
  onClick: PropTypes.func,
};

export default HistoryItem;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import backend from 'lib/Backend';
import Config from 'lib/Config';
import HistoryItem from 'containers/HistoryList/HistoryItem';
import FormBuilderLoader from 'containers/FormBuilderLoader/FormBuilderLoader';
import PropTypes from 'prop-types';

const sectionConfigKey = 'SilverStripe\\AssetAdmin\\Controller\\AssetAdmin';

/**
 * Create a new endpoint
 *
 * @param {Object} endpointConfig
 * @param {Boolean} includeToken
 * @returns {Function}
 */
const createEndpoint = (endpointConfig, includeToken = true) => (
  backend.createEndpointFetcher(Object.assign(
    {},
    endpointConfig,
    includeToken ? { defaultData: { SecurityID: Config.get('SecurityID') } } : {}
  ))
);

class HistoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      loadedDetails: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleBack = this.handleBack.bind(this);

    this.timer = null;

    this.api = createEndpoint(props.sectionConfig.historyEndpoint);
  }

  componentDidMount() {
    this.refreshHistoryIfNeeded();
  }

  componentDidUpdate(prevProps) {
    // Avoids race conditions from happening
    this.refreshHistoryIfNeeded(prevProps);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  /**
   * Determine if the history list requires a refresh
   *
   * @param {object} prevProps
   */
  refreshHistoryIfNeeded(prevProps) {
    if (
      (!prevProps && !this.state.loadedDetails)
      || (this.props.data.fileId !== prevProps.data.fileId)
      || (this.props.data.latestVersionId !== prevProps.data.latestVersionId)
    ) {
      this.setState({ loadedDetails: false });
      const fileId = (this.props) ? this.props.data.fileId : prevProps.data.fileId;
      clearTimeout(this.timer);

      /*
       * This needs a delay/throttle, so this api request tries to be made last in the stack.
       * We also use this to stop an API call happening if the component is going to
       * unmount soon.
       */
      this.timer = setTimeout(() => {
        this.api({
          fileId,
        }).then((history) => {
          // check that timer wasn't nulled out by unmounting
          if (this.timer) {
            this.setState({ history, loadedDetails: true });
          }
        });
      }, 250);
    }
  }

  /**
   * Click into the history fades out the list and loads in the detail form.
   *
   * @param {number} versionId
   */
  handleClick(versionId) {
    this.setState({
      viewDetails: versionId,
    });
  }

  /**
   * @param {Event} event Event object.
   */
  handleBack(event) {
    event.preventDefault();

    this.setState({
      viewDetails: null,
    });
  }

  render() {
    if (!this.state.loadedDetails) {
      return (
        <div className="history-list history-list--loading">
          Loading...
        </div>
      );
    }

    if (this.state.viewDetails) {
      const schemaUrl = [
        this.props.historySchemaUrl,
        this.props.data.fileId,
        this.state.viewDetails,
      ].join('/');

      const backButtonClasses = [
        'btn',
        'btn-secondary',
        'btn--icon-xl',
        'btn--no-text',
        'font-icon-left-open-big',
        'history-list__back',
      ].join(' ');

      return (
        <div className="history-list">
          <a href="#" className={backButtonClasses} onClick={this.handleBack} />
          <FormBuilderLoader
            identifier="AssetAdmin.HistoryList"
            schemaUrl={schemaUrl}
            formTag="div"
          />
        </div>
      );
    }

    const historyList = this.state.history || [];
    return (
      <div className="history-list">
        <ul className="list-group list-group-flush history-list__list">
          {historyList.map((history) => (
            <HistoryItem
              key={history.versionid}
              fileid={this.props.data.fileId}
              {...history}
              onClick={this.handleClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}

HistoryList.propTypes = {
  sectionConfig: PropTypes.shape({
    form: PropTypes.object,
    historyEndpoint: PropTypes.shape({
      url: PropTypes.string,
      method: PropTypes.string,
      responseFormat: PropTypes.string,
    }),
  }),
  historySchemaUrl: PropTypes.string,
  data: PropTypes.object,
};

HistoryList.defaultProps = {
  data: {
    fieldId: 0,
  },
};

function mapStateToProps(state) {
  const sectionConfig = state.config.sections.find((section) => section.name === sectionConfigKey);
  return {
    sectionConfig,
    historySchemaUrl: sectionConfig.form.fileHistoryForm.schemaUrl,
  };
}

export { HistoryList as Component };

export default connect(mapStateToProps)(HistoryList);
